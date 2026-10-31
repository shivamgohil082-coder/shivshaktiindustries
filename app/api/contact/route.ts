import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createEnquiry } from '@/lib/db';
import {
  escapeHtml,
  isValidEmail,
  isValidPhone,
  getClientIp,
  checkRateLimit,
} from '@/lib/security';

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);

    // Rate Limiting: 5 submissions per 10 minutes per IP
    const rateLimit = checkRateLimit(`contact_${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON request payload.' },
        { status: 400 }
      );
    }

    const {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      subject = '',
      message = '',
      honeypot = '',
      website = '', // Hidden bot trap
    } = body;

    // Silent rejection of automated bot submissions
    if (honeypot || website) {
      return NextResponse.json({
        success: true,
        message: 'Your inquiry has been received.',
      });
    }

    // Input Validation
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'First name is required.' },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (phone && !isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 5 characters.' },
        { status: 400 }
      );
    }

    // Sanitize user inputs against HTML/XSS injection in email clients
    const safeFirst = escapeHtml(firstName.trim().slice(0, 80));
    const safeLast = escapeHtml(lastName.trim().slice(0, 80));
    const safeEmail = escapeHtml(email.trim().slice(0, 120));
    const safePhone = escapeHtml(phone.trim().slice(0, 30));
    const safeSubject = escapeHtml((subject || 'General Inquiry').trim().slice(0, 150));
    const safeMessage = escapeHtml(message.trim().slice(0, 5000)).replace(/\n/g, '<br/>');

    // Department-based intelligent routing:
    // - RFQ / Request a quote -> rfq@shivshaktiindustries.org
    // - General inquiries, job/career applications, supplier & vendor proposals -> info@shivshaktiindustries.org
    const lowerSubject = safeSubject.toLowerCase();
    const isRfq = lowerSubject.includes('rfq') || lowerSubject.includes('quotation') || lowerSubject.includes('quote');
    const recipientEmail = isRfq
      ? (process.env.SMTP_RFQ_EMAIL || 'rfq@shivshaktiindustries.org')
      : (process.env.SMTP_INFO_EMAIL || process.env.SMTP_TO_EMAIL || 'info@shivshaktiindustries.org');

    const senderDisplay = isRfq
      ? '"Shiv Shakti Industries RFQ Desk" <rfq@shivshaktiindustries.org>'
      : '"Shiv Shakti Industries" <info@shivshaktiindustries.org>';

    const departmentLabel = isRfq
      ? 'RFQ & Quotations Desk'
      : (lowerSubject.includes('job') || lowerSubject.includes('career')
          ? 'Careers & HR Desk'
          : lowerSubject.includes('supplier') || lowerSubject.includes('vendor')
            ? 'Supply Chain & Vendor Desk'
            : 'General Inquiry Desk');

    // 1. Record enquiry in Database (Persistent record guarantees zero lead loss)
    const enquiryType: 'RFQ' | 'General' | 'Career' | 'Vendor' = isRfq
      ? 'RFQ'
      : lowerSubject.includes('job') || lowerSubject.includes('career')
      ? 'Career'
      : lowerSubject.includes('supplier') || lowerSubject.includes('vendor')
      ? 'Vendor'
      : 'General';

    const recordedEnquiry = await createEnquiry({
      type: enquiryType,
      full_name: `${safeFirst} ${safeLast}`.trim(),
      email: safeEmail,
      phone: safePhone || undefined,
      subject: safeSubject,
      message: message.trim(),
      ip_address: clientIp,
    });

    // 2. Dispatch Email Notification if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      // SMTP not configured yet, but enquiry is safely recorded in database
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been received. Our team will contact you shortly.',
        reference: recordedEnquiry.reference_no,
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || senderDisplay,
      to: recipientEmail,
      replyTo: email.trim(),
      subject: `[Web Inquiry - ${departmentLabel}] ${safeSubject} from ${safeFirst} ${safeLast}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #aa0000; color: #ffffff; padding: 18px 24px;">
            <h2 style="margin: 0; font-size: 20px;">New Website Inquiry (${departmentLabel})</h2>
            <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Shiv Shakti Industries — Target: ${recipientEmail}</p>
          </div>
          <div style="padding: 24px;">
            <p><strong>Department:</strong> ${departmentLabel}</p>
            <p><strong>Routed To:</strong> ${recipientEmail}</p>
            <p><strong>Sender Name:</strong> ${safeFirst} ${safeLast}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p><strong>Phone:</strong> ${safePhone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <h4 style="margin: 0 0 8px; color: #555;">Message:</h4>
            <div style="background-color: #f9f9f9; padding: 14px; border-radius: 6px; border-left: 3px solid #aa0000;">
              ${safeMessage}
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 12px 24px; font-size: 11px; color: #777; text-align: center;">
            Sender IP: ${clientIp} | Timestamp: ${new Date().toISOString()}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    });
  } catch (error) {
    // Log sanitized error internally without exposing details to visitor
    console.error('Contact API Internal Error:', error instanceof Error ? error.message : 'Unknown');
    return NextResponse.json(
      { success: false, error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    );
  }
}

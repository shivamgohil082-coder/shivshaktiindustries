import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createEnquiry } from '@/lib/db';
import {
  escapeHtml,
  isValidEmail,
  getClientIp,
  checkRateLimit,
  isAllowedFileExtension,
  sanitizeFileName,
  MAX_UPLOAD_SIZE_BYTES,
} from '@/lib/security';

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);

    // Rate Limiting: 5 RFQ submissions per 10 minutes per IP
    const rateLimit = checkRateLimit(`rfq_${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many quote requests. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.`,
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

    const formData = await req.formData().catch(() => null);
    if (!formData) {
      return NextResponse.json(
        { success: false, error: 'Invalid form submission.' },
        { status: 400 }
      );
    }

    const name = (formData.get('name') as string) || '';
    const company = (formData.get('company') as string) || '';
    const email = (formData.get('email') as string) || '';
    const requirements = (formData.get('requirements') as string) || '';
    const honeypot = (formData.get('website') as string) || '';
    const file = formData.get('file') as File | null;

    // Bot honeypot trap
    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: 'Your RFQ has been submitted successfully.',
      });
    }

    // Input Validations
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please provide your full name.' },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid business email address.' },
        { status: 400 }
      );
    }

    if (!requirements || typeof requirements !== 'string' || requirements.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: 'Please provide detailed project requirements.' },
        { status: 400 }
      );
    }

    let attachment = null;
    if (file && file.size > 0) {
      // 1. File Size Verification (15MB limit)
      if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            error: `File size exceeds the 15 MB limit. Please compress CAD models or share via cloud link.`,
          },
          { status: 400 }
        );
      }

      // 2. File Extension Verification
      if (!isAllowedFileExtension(file.name)) {
        return NextResponse.json(
          {
            success: false,
            error: `Unsupported file type. Allowed formats: STEP, STP, IGES, IGS, DWG, DXF, SLDPRT, PDF, ZIP.`,
          },
          { status: 400 }
        );
      }

      const safeAttachmentName = sanitizeFileName(file.name);
      const buffer = Buffer.from(await file.arrayBuffer());

      attachment = {
        filename: safeAttachmentName,
        content: buffer,
      };
    }

    // Sanitize user inputs for email HTML rendering
    const safeName = escapeHtml(name.trim().slice(0, 100));
    const safeCompany = escapeHtml((company || 'Not Specified').trim().slice(0, 120));
    const safeEmail = escapeHtml(email.trim().slice(0, 120));
    const safeReqs = escapeHtml(requirements.trim().slice(0, 8000)).replace(/\n/g, '<br/>');

    // 1. Record RFQ in Database
    const recordedRfq = await createEnquiry({
      type: 'RFQ',
      full_name: safeName,
      email: safeEmail,
      company: safeCompany,
      subject: `RFQ: Custom Precision Components (${safeCompany})`,
      message: requirements.trim(),
      attachment_path: attachment?.filename || undefined,
      attachment_name: file?.name || undefined,
      ip_address: clientIp,
    });

    // 2. Dispatch Email Notification if SMTP is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json({
        success: true,
        message: 'Your RFQ has been submitted successfully. Our engineering team will review it and reply within 24 hours.',
        reference: recordedRfq.reference_no,
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

    const rfqRecipient =
      process.env.SMTP_RFQ_EMAIL ||
      process.env.SMTP_TO_EMAIL ||
      'rfq@shivshaktiindustries.org';

    const mailOptions = {
      from:
        process.env.SMTP_FROM_EMAIL ||
        '"Shiv Shakti Industries RFQ" <rfq@shivshaktiindustries.org>',
      to: rfqRecipient,
      replyTo: email.trim(),
      subject: `[New RFQ Request] From ${safeCompany} (${safeName})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 640px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #aa0000; color: #ffffff; padding: 20px 24px;">
            <h2 style="margin: 0; font-size: 22px;">New Request For Quotation (RFQ)</h2>
            <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Shiv Shakti Industries — Target: ${rfqRecipient}</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 6px 0; color: #666; width: 140px;"><strong>Client Name:</strong></td>
                <td style="padding: 6px 0;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666;"><strong>Company:</strong></td>
                <td style="padding: 6px 0;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666;"><strong>Email Address:</strong></td>
                <td style="padding: 6px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #666;"><strong>File Attached:</strong></td>
                <td style="padding: 6px 0;">${attachment ? `Yes (${attachment.filename})` : 'None'}</td>
              </tr>
            </table>
            
            <h4 style="margin: 0 0 8px; color: #333;">Project Requirements & Specs:</h4>
            <div style="background-color: #f8f9fa; padding: 16px; border-radius: 6px; border-left: 4px solid #aa0000;">
              ${safeReqs}
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 12px 24px; font-size: 11px; color: #777; text-align: center;">
            Sender IP: ${clientIp} | Timestamp: ${new Date().toISOString()}
          </div>
        </div>
      `,
      attachments: attachment ? [attachment] : [],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'RFQ submitted successfully! Our engineering team will review your specifications.',
    });
  } catch (error) {
    console.error('RFQ API Internal Error:', error instanceof Error ? error.message : 'Unknown');
    return NextResponse.json(
      { success: false, error: 'Failed to process RFQ submission. Please try again.' },
      { status: 500 }
    );
  }
}

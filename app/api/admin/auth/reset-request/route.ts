import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { setPasswordResetToken, getAdminUserByUsername } from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // Rate limit: 3 reset attempts per hour per IP
    const rateLimit = checkRateLimit(`pwd_reset_${clientIp}`, 3, 60 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many password reset requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const email = body?.email?.trim();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email address is required.' }, { status: 400 });
    }

    const user = await getAdminUserByUsername(email);

    // Always respond with success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'If the provided email belongs to an administrator, a password reset link has been dispatched.',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await setPasswordResetToken(user.email, resetToken, expiry);

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shivshaktiindustries.org';
    const ownerPath = process.env.OWNER_ACCESS_PATH || '/owner-access-7x9k';
    const resetUrl = `${baseUrl}${ownerPath}/reset-password?token=${resetToken}`;

    // If SMTP is available, attempt delivery
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.SMTP_FROM_EMAIL || '"Shiv Shakti Admin Security" <info@shivshaktiindustries.org>',
          to: user.email,
          subject: '[Shiv Shakti Industries] Admin Password Reset Request',
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 500px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px;">
              <h2 style="color: #aa0000; margin-top: 0;">Password Reset Request</h2>
              <p>Hello <strong>${user.username}</strong>,</p>
              <p>A password reset was requested for your Shiv Shakti Industries administration account. Click the button below to choose a new password:</p>
              <p style="text-align: center; margin: 24px 0;">
                <a href="${resetUrl}" style="background-color: #aa0000; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
              </p>
              <p style="font-size: 12px; color: #666;">This link is valid for 60 minutes. If you did not request this reset, you can safely ignore this email.</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error('Failed dispatching reset email:', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'If the provided email belongs to an administrator, a password reset link has been dispatched.',
      // Provide token in development response for easy testing
      ...(process.env.NODE_ENV !== 'production' ? { debugToken: resetToken, debugUrl: resetUrl } : {}),
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

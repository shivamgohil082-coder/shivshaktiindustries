import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserByResetToken, updateAdminPassword } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const token = body?.token?.trim();
    const newPassword = body?.newPassword;

    if (!token || !newPassword) {
      return NextResponse.json({ success: false, error: 'Token and new password are required.' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    const user = await getAdminUserByResetToken(token);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Password reset link is invalid or has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    const success = await updateAdminPassword(user.id, newPassword);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Failed to reset password.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Password has been successfully updated. You may now log in.',
    });
  } catch (error) {
    console.error('Password reset execution error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

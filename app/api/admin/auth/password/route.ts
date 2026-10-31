import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { getAdminUserByUsername, updateAdminPassword, verifyPassword } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ success: false, error: 'Invalid payload.' }, { status: 400 });
    }

    const { currentPassword = '', newPassword = '' } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, error: 'Current and new password are required.' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, error: 'New password must be at least 8 characters long.' }, { status: 400 });
    }

    const user = await getAdminUserByUsername(session.username);
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    const isCurrentValid = verifyPassword(currentPassword, user.password_hash);
    if (!isCurrentValid) {
      return NextResponse.json({ success: false, error: 'Current password does not match.' }, { status: 400 });
    }

    const success = await updateAdminPassword(user.id, newPassword);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Failed to update password.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

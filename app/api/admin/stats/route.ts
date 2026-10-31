import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { getDashboardStats } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  try {
    const stats = await getDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch (err) {
    console.error('Failed to load dashboard stats:', err);
    return NextResponse.json({ success: false, error: 'Failed to retrieve metrics.' }, { status: 500 });
  }
}

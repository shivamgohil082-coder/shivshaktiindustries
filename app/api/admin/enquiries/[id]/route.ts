import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { getEnquiryById, updateEnquiryStatus, deleteEnquiry } from '@/lib/db';
import { escapeHtml } from '@/lib/security';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const { id } = await params;
  const numId = Number(id);
  if (isNaN(numId)) {
    return NextResponse.json({ success: false, error: 'Invalid ID.' }, { status: 400 });
  }

  const enquiry = await getEnquiryById(numId);
  if (!enquiry) {
    return NextResponse.json({ success: false, error: 'Enquiry not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, enquiry });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const { id } = await params;
  const numId = Number(id);
  if (isNaN(numId)) {
    return NextResponse.json({ success: false, error: 'Invalid ID.' }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ success: false, error: 'Invalid payload.' }, { status: 400 });
  }

  const { status, admin_notes } = body;
  const allowedStatuses = ['New', 'Pending', 'Contacted', 'Completed'];

  if (status && !allowedStatuses.includes(status)) {
    return NextResponse.json({ success: false, error: 'Invalid status.' }, { status: 400 });
  }

  const updated = await updateEnquiryStatus(
    numId,
    status as 'New' | 'Pending' | 'Contacted' | 'Completed',
    admin_notes !== undefined ? escapeHtml(admin_notes.trim()) : undefined
  );

  if (!updated) {
    return NextResponse.json({ success: false, error: 'Enquiry not found or update failed.' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: 'Enquiry updated successfully.',
    enquiry: updated,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const { id } = await params;
  const numId = Number(id);
  if (isNaN(numId)) {
    return NextResponse.json({ success: false, error: 'Invalid ID.' }, { status: 400 });
  }

  const success = await deleteEnquiry(numId);
  if (!success) {
    return NextResponse.json({ success: false, error: 'Failed to delete enquiry.' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: 'Enquiry record deleted successfully.',
  });
}

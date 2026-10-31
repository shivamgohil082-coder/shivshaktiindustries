import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { getAllEnquiries } from '@/lib/db';

export async function GET(req: NextRequest) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';
    const search = searchParams.get('search')?.toLowerCase() || '';
    const isExport = searchParams.get('export') === 'csv';

    let enquiries = await getAllEnquiries(status || undefined);

    if (type && type !== 'All') {
      enquiries = enquiries.filter((e) => e.type === type);
    }

    if (search) {
      enquiries = enquiries.filter(
        (e) =>
          e.full_name.toLowerCase().includes(search) ||
          e.email.toLowerCase().includes(search) ||
          (e.phone && e.phone.toLowerCase().includes(search)) ||
          (e.company && e.company.toLowerCase().includes(search)) ||
          e.reference_no.toLowerCase().includes(search) ||
          e.subject.toLowerCase().includes(search)
      );
    }

    // CSV Export Handling
    if (isExport) {
      const headers = ['Reference No', 'Type', 'Status', 'Date', 'Full Name', 'Company', 'Email', 'Phone', 'Subject', 'Message', 'Attachment', 'Admin Notes'];
      const rows = enquiries.map((e) => [
        `"${e.reference_no}"`,
        `"${e.type}"`,
        `"${e.status}"`,
        `"${new Date(e.created_at).toLocaleString()}"`,
        `"${(e.full_name || '').replace(/"/g, '""')}"`,
        `"${(e.company || '').replace(/"/g, '""')}"`,
        `"${(e.email || '').replace(/"/g, '""')}"`,
        `"${(e.phone || '').replace(/"/g, '""')}"`,
        `"${(e.subject || '').replace(/"/g, '""')}"`,
        `"${(e.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
        `"${(e.attachment_name || e.attachment_path || '').replace(/"/g, '""')}"`,
        `"${(e.admin_notes || '').replace(/"/g, '""')}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
      const timestamp = new Date().toISOString().slice(0, 10);

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="ssi-enquiries-${timestamp}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      enquiries,
      total: enquiries.length,
    });
  } catch (error) {
    console.error('Failed fetching enquiries:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

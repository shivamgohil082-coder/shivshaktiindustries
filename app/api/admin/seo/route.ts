import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { getSeoMetaList, saveSeoMeta } from '@/lib/db';
import { escapeHtml } from '@/lib/security';

export async function GET(req: NextRequest) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  try {
    const list = await getSeoMetaList();
    return NextResponse.json({ success: true, seoList: list });
  } catch (error) {
    console.error('Failed fetching SEO meta list:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.page_path || !body.meta_title || !body.meta_description) {
      return NextResponse.json(
        { success: false, error: 'Page path, meta title, and meta description are required.' },
        { status: 400 }
      );
    }

    const saved = await saveSeoMeta({
      page_path: body.page_path.trim(),
      meta_title: escapeHtml(body.meta_title.trim()),
      meta_description: escapeHtml(body.meta_description.trim()),
      keywords: body.keywords ? escapeHtml(body.keywords.trim()) : '',
      canonical_url: body.canonical_url ? body.canonical_url.trim() : '',
    });

    return NextResponse.json({
      success: true,
      message: 'SEO metadata updated successfully.',
      seo: saved,
    });
  } catch (error) {
    console.error('Failed saving SEO meta:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

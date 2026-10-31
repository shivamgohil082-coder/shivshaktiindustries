import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { getContentBlocks, saveContentBlock } from '@/lib/db';
import { escapeHtml } from '@/lib/security';

export async function GET(req: NextRequest) {
  const session = requireAdminSession(req);
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  try {
    const blocks = await getContentBlocks();
    return NextResponse.json({ success: true, blocks });
  } catch (error) {
    console.error('Failed fetching content blocks:', error);
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
    if (!body || !body.section_key) {
      return NextResponse.json({ success: false, error: 'Section key is required.' }, { status: 400 });
    }

    const saved = await saveContentBlock({
      section_key: body.section_key.trim(),
      title: body.title ? escapeHtml(body.title.trim()) : '',
      subtitle: body.subtitle ? escapeHtml(body.subtitle.trim()) : '',
      content: body.content ? escapeHtml(body.content.trim()) : '',
    });

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully.',
      block: saved,
    });
  } catch (error) {
    console.error('Failed saving content block:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

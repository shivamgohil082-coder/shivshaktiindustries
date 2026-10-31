import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { createSale, getSalesSummary } from '@/lib/db';
import { isRecord } from '@/lib/customer-validation';
import { validateSaleInput } from '@/lib/sales-validation';

function isDuplicateReferenceError(error: unknown): boolean {
  let current = error;
  while (current instanceof Error) {
    if (current.message.includes('already exists')) return true;
    if ('code' in current && current.code === 'ER_DUP_ENTRY') return true;
    current = current.cause;
  }
  return false;
}

export async function GET(req: NextRequest) {
  if (!requireAdminSession(req)) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  try {
    const summary = await getSalesSummary();
    return NextResponse.json({ success: true, summary });
  } catch (error) {
    console.error('Failed fetching sales:', error);
    return NextResponse.json({ success: false, error: 'Failed to load sales.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!requireAdminSession(req)) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const body: unknown = await req.json().catch(() => null);
  if (!isRecord(body)) {
    return NextResponse.json({ success: false, error: 'Invalid sale payload.' }, { status: 400 });
  }
  const input = validateSaleInput(body);
  if ('error' in input) {
    return NextResponse.json({ success: false, error: input.error }, { status: 400 });
  }

  try {
    const sale = await createSale(input.value);
    return NextResponse.json({ success: true, sale }, { status: 201 });
  } catch (error) {
    if (isDuplicateReferenceError(error)) {
      return NextResponse.json(
        { success: false, error: 'A sale with this reference number already exists.' },
        { status: 409 }
      );
    }
    console.error('Failed creating sale:', error);
    return NextResponse.json({ success: false, error: 'Failed to create sale.' }, { status: 500 });
  }
}

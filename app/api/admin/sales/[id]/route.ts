import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { deleteSale, updateSaleStatus } from '@/lib/db';
import { isRecord } from '@/lib/customer-validation';
import { isSaleStatus } from '@/lib/sales-validation';

type RouteContext = { params: Promise<{ id: string }> };

async function getValidId(params: RouteContext['params']): Promise<number | null> {
  const { id } = await params;
  const numericId = Number(id);
  return Number.isSafeInteger(numericId) && numericId > 0 ? numericId : null;
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  if (!requireAdminSession(req)) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const id = await getValidId(params);
  if (id === null) {
    return NextResponse.json({ success: false, error: 'Invalid sale ID.' }, { status: 400 });
  }
  const body: unknown = await req.json().catch(() => null);
  if (!isRecord(body) || !isSaleStatus(body.status)) {
    return NextResponse.json({ success: false, error: 'Choose a valid sale status.' }, { status: 400 });
  }

  try {
    const sale = await updateSaleStatus(id, body.status);
    if (!sale) {
      return NextResponse.json({ success: false, error: 'Sale not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, sale });
  } catch (error) {
    console.error('Failed updating sale:', error);
    return NextResponse.json({ success: false, error: 'Failed to update sale.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  if (!requireAdminSession(req)) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const id = await getValidId(params);
  if (id === null) {
    return NextResponse.json({ success: false, error: 'Invalid sale ID.' }, { status: 400 });
  }

  try {
    if (!(await deleteSale(id))) {
      return NextResponse.json({ success: false, error: 'Sale not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed deleting sale:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete sale.' }, { status: 500 });
  }
}

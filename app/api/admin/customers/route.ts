import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { createCustomer, getAllCustomers } from '@/lib/db';
import { isRecord, validateCustomerInput } from '@/lib/customer-validation';

function isDuplicateEmailError(error: unknown): boolean {
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
    const search = new URL(req.url).searchParams.get('search')?.slice(0, 200) || '';
    const customers = await getAllCustomers(search);
    return NextResponse.json({ success: true, customers, total: customers.length });
  } catch (error) {
    console.error('Failed fetching customers:', error);
    return NextResponse.json({ success: false, error: 'Failed to load customers.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!requireAdminSession(req)) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const body: unknown = await req.json().catch(() => null);
  if (!isRecord(body)) {
    return NextResponse.json({ success: false, error: 'Invalid customer payload.' }, { status: 400 });
  }

  const input = validateCustomerInput(body);
  if ('error' in input) {
    return NextResponse.json({ success: false, error: input.error }, { status: 400 });
  }

  try {
    const customer = await createCustomer(input.value);
    return NextResponse.json({ success: true, customer }, { status: 201 });
  } catch (error) {
    if (isDuplicateEmailError(error)) {
      return NextResponse.json(
        { success: false, error: 'A customer with this email address already exists.' },
        { status: 409 }
      );
    }
    console.error('Failed creating customer:', error);
    return NextResponse.json({ success: false, error: 'Failed to create customer.' }, { status: 500 });
  }
}

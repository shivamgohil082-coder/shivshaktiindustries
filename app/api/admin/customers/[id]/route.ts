import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import {
  deleteCustomer,
  getCustomerById,
  getCustomerEnquiryHistory,
  updateCustomer,
} from '@/lib/db';
import { isRecord, validateCustomerInput } from '@/lib/customer-validation';

type RouteContext = { params: Promise<{ id: string }> };

async function getValidId(params: RouteContext['params']): Promise<number | null> {
  const { id } = await params;
  const numericId = Number(id);
  return Number.isSafeInteger(numericId) && numericId > 0 ? numericId : null;
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  if (!requireAdminSession(req)) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const id = await getValidId(params);
  if (id === null) {
    return NextResponse.json({ success: false, error: 'Invalid customer ID.' }, { status: 400 });
  }

  try {
    const customer = await getCustomerById(id);
    if (!customer) {
      return NextResponse.json({ success: false, error: 'Customer not found.' }, { status: 404 });
    }
    const enquiries = await getCustomerEnquiryHistory(customer.email);
    return NextResponse.json({ success: true, customer, enquiries });
  } catch (error) {
    console.error('Failed fetching customer:', error);
    return NextResponse.json({ success: false, error: 'Failed to load customer.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  if (!requireAdminSession(req)) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const id = await getValidId(params);
  if (id === null) {
    return NextResponse.json({ success: false, error: 'Invalid customer ID.' }, { status: 400 });
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
    const customer = await updateCustomer(id, input.value);
    if (!customer) {
      return NextResponse.json({ success: false, error: 'Customer not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, customer });
  } catch (error) {
    let current = error;
    let duplicate = false;
    while (current instanceof Error) {
      if (current.message.includes('already exists') || ('code' in current && current.code === 'ER_DUP_ENTRY')) {
        duplicate = true;
        break;
      }
      current = current.cause;
    }
    if (duplicate) {
      return NextResponse.json({ success: false, error: 'A customer with this email address already exists.' }, { status: 409 });
    }
    console.error('Failed updating customer:', error);
    return NextResponse.json({ success: false, error: 'Failed to update customer.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  if (!requireAdminSession(req)) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  }

  const id = await getValidId(params);
  if (id === null) {
    return NextResponse.json({ success: false, error: 'Invalid customer ID.' }, { status: 400 });
  }

  try {
    const deleted = await deleteCustomer(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Customer not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed deleting customer:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete customer.' }, { status: 500 });
  }
}

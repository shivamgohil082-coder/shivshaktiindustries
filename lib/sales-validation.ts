import type { SaleInput, SaleStatus } from '@/lib/db';

const SALE_STATUSES: SaleStatus[] = ['Paid', 'Pending', 'Overdue', 'Cancelled'];
const SALE_STATUS_SET: ReadonlySet<string> = new Set(SALE_STATUSES);

export function isSaleStatus(value: unknown): value is SaleStatus {
  return typeof value === 'string' && SALE_STATUS_SET.has(value);
}

export function validateSaleInput(body: Record<string, unknown>):
  | { value: SaleInput }
  | { error: string } {
  const referenceNo = typeof body.reference_no === 'string' ? body.reference_no.trim() : '';
  const customerName = typeof body.customer_name === 'string' ? body.customer_name.trim() : '';
  const amount = typeof body.amount === 'number' ? body.amount : Number(body.amount);
  const status = body.status;
  const soldAt = typeof body.sold_at === 'string' ? body.sold_at : '';
  const notes = typeof body.notes === 'string' ? body.notes.trim() : '';

  if (!referenceNo || referenceNo.length > 64) {
    return { error: 'Reference number is required and must be 64 characters or fewer.' };
  }
  if (!customerName || customerName.length > 200) {
    return { error: 'Customer name is required and must be 200 characters or fewer.' };
  }
  if (!Number.isFinite(amount) || amount <= 0 || amount > 999999999.99) {
    return { error: 'Enter a valid sale amount greater than zero.' };
  }
  if (Math.abs(Math.round(amount * 100) - amount * 100) > 1e-8) {
    return { error: 'Sale amount can have at most two decimal places.' };
  }
  if (!isSaleStatus(status)) {
    return { error: 'Choose a valid sale status.' };
  }
  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(soldAt)
    ? new Date(`${soldAt}T00:00:00.000Z`)
    : null;
  if (!parsedDate || !Number.isFinite(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== soldAt) {
    return { error: 'Enter a valid sale date.' };
  }
  if (notes.length > 2000) {
    return { error: 'Notes must be 2,000 characters or fewer.' };
  }

  return {
    value: {
      reference_no: referenceNo,
      customer_name: customerName,
      amount: Math.round(amount * 100) / 100,
      status,
      sold_at: soldAt,
      notes,
    },
  };
}

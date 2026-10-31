import type { CustomerInput } from '@/lib/db';
import { isValidEmail } from '@/lib/security';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validateCustomerInput(
  body: Record<string, unknown>
): { value: CustomerInput } | { error: string } {
  const companyName = typeof body.company_name === 'string' ? body.company_name.trim() : '';
  const contactName = typeof body.contact_name === 'string' ? body.contact_name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const billingAddress = typeof body.billing_address === 'string' ? body.billing_address.trim() : '';
  const shippingAddress = typeof body.shipping_address === 'string' ? body.shipping_address.trim() : '';
  const gstNumber = typeof body.gst_number === 'string' ? body.gst_number.trim().toUpperCase() : '';

  if (!companyName || companyName.length > 200) {
    return { error: 'Company name is required and must be 200 characters or fewer.' };
  }
  if (!contactName || contactName.length > 160) {
    return { error: 'Contact person is required and must be 160 characters or fewer.' };
  }
  if (!isValidEmail(email)) {
    return { error: 'Enter a valid email address.' };
  }
  if (phone.length > 40 || billingAddress.length > 2000 || shippingAddress.length > 2000) {
    return { error: 'Phone and address fields exceed the allowed length.' };
  }
  if (gstNumber && !/^[A-Z0-9]{15}$/.test(gstNumber)) {
    return { error: 'GST number must contain 15 letters or numbers.' };
  }

  return {
    value: {
      company_name: companyName,
      contact_name: contactName,
      email,
      phone,
      billing_address: billingAddress,
      shipping_address: shippingAddress,
      gst_number: gstNumber,
    },
  };
}

/**
 * Core business & formatting logic for BAS SALON
 */

export interface EnquiryData {
  name: string;
  phone: string;
  service: string;
  date: string;
  timeSlot: string;
  notes?: string;
}

export function sanitizePhoneNumber(phone: string): string {
  // Strip non-digit characters
  return phone.replace(/[^0-9]/g, '');
}

export function validateEnquiryForm(data: Partial<EnquiryData>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please provide your full name (minimum 2 characters)';
  }

  const cleanPhone = sanitizePhoneNumber(data.phone || '');
  if (!cleanPhone || cleanPhone.length < 7 || cleanPhone.length > 15) {
    errors.phone = 'Please provide a valid contact number (7-15 digits)';
  }

  if (!data.service || data.service.trim().length === 0) {
    errors.service = 'Please select a salon service';
  }

  if (!data.date || data.date.trim().length === 0) {
    errors.date = 'Please select a preferred appointment date';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function buildWhatsAppEnquiryUrl(config: { whatsappNumber: string; name: string }, enquiry: EnquiryData): string {
  const cleanNumber = sanitizePhoneNumber(config.whatsappNumber);
  const lines = [
    `*Appointment Enquiry — ${config.name}*`,
    ``,
    `• *Client Name:* ${enquiry.name.trim()}`,
    `• *Contact Number:* ${enquiry.phone.trim()}`,
    `• *Requested Service:* ${enquiry.service.trim()}`,
    `• *Preferred Date:* ${enquiry.date.trim()}`,
    `• *Preferred Time:* ${enquiry.timeSlot.trim() || 'Flexible / Any available slot'}`,
  ];

  if (enquiry.notes && enquiry.notes.trim().length > 0) {
    lines.push(`• *Notes / Requests:* ${enquiry.notes.trim()}`);
  }

  lines.push(``);
  lines.push(`Hello BAS SALON team, please check availability for this request. Thank you!`);

  const encodedMessage = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

export function buildServiceEnquiryUrl(whatsappNumber: string, serviceName: string): string {
  const cleanNumber = sanitizePhoneNumber(whatsappNumber);
  const message = `Hello BAS SALON, I would like to enquire about details and availability for: *${serviceName}*. Could you please provide consultation details?`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export function filterItemsByCategory<T extends { category: string }>(items: T[], activeCategory: string): T[] {
  if (!activeCategory || activeCategory === 'all') {
    return items;
  }
  return items.filter(item => item.category === activeCategory);
}

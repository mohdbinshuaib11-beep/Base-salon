import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizePhoneNumber,
  validateEnquiryForm,
  buildWhatsAppEnquiryUrl,
  buildServiceEnquiryUrl,
  filterItemsByCategory,
} from './salonLogic.ts';

test('sanitizePhoneNumber removes non-digits', () => {
  assert.equal(sanitizePhoneNumber('+91 98950 14575'), '919895014575');
  assert.equal(sanitizePhoneNumber('(123) 456-7890'), '1234567890');
  assert.equal(sanitizePhoneNumber('9895014575'), '9895014575');
});

test('validateEnquiryForm rejects empty and invalid inputs', () => {
  const result = validateEnquiryForm({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.service);
  assert.ok(result.errors.date);
});

test('validateEnquiryForm accepts valid enquiry', () => {
  const result = validateEnquiryForm({
    name: 'Farhan Ahmed',
    phone: '9895014575',
    service: 'Signature Haircut & Styling',
    date: '2026-10-25',
    timeSlot: 'Afternoon (2:00 PM - 5:00 PM)',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('buildWhatsAppEnquiryUrl constructs proper URL with encoded parameters', () => {
  const url = buildWhatsAppEnquiryUrl(
    { whatsappNumber: '+91 98950 14575', name: 'BAS SALON' },
    {
      name: 'Priya Sharma',
      phone: '9876543210',
      service: 'Custom Balayage & Gloss',
      date: '2026-11-02',
      timeSlot: 'Morning (10:00 AM - 1:00 PM)',
      notes: 'Shoulder length hair',
    }
  );

  assert.ok(url.startsWith('https://wa.me/919895014575?text='));
  assert.ok(url.includes('Priya%20Sharma'));
  assert.ok(url.includes('Custom%20Balayage%20%26%20Gloss'));
  assert.ok(url.includes('Shoulder%20length%20hair'));
});

test('buildServiceEnquiryUrl formats clean service query', () => {
  const url = buildServiceEnquiryUrl('919895014575', 'Keratin Smoothing Treatment');
  assert.ok(url.startsWith('https://wa.me/919895014575?text='));
  assert.ok(url.includes('Keratin%20Smoothing%20Treatment'));
});

test('filterItemsByCategory filters accurately', () => {
  const items = [
    { title: 'Item 1', category: 'cuts' },
    { title: 'Item 2', category: 'color' },
    { title: 'Item 3', category: 'cuts' },
  ];
  assert.equal(filterItemsByCategory(items, 'all').length, 3);
  assert.equal(filterItemsByCategory(items, 'cuts').length, 2);
  assert.equal(filterItemsByCategory(items, 'color').length, 1);
});

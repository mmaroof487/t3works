import { Resend } from 'resend';

let cachedClient: Resend | null = null;

export function getResendClient() {
  if (cachedClient) return cachedClient;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable.');
  }

  cachedClient = new Resend(apiKey);
  return cachedClient;
}

export function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL ?? 'T3 AI Works <onboarding@resend.dev>';
}

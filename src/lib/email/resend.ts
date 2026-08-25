import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const emailConfig = {
  from: process.env.EMAIL_FROM || 'Jawharat Al Danat <onboarding@resend.dev>',
  contactTo: process.env.CONTACT_EMAIL_TO || 'info@jawaharat-aldana.com',
};

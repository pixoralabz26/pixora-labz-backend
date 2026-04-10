import nodemailer from 'nodemailer';
import config from '../config/index.js';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  if (!config.smtp.user || !config.smtp.pass) {
    console.log('Email skipped (SMTP not configured):', options.subject);
    return;
  }

  await transporter.sendMail({
    from: `"Pixora Labz" <${config.smtp.user}>`,
    ...options,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function baseLayout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid rgba(139,92,246,0.2);">
          <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Pixora Labz</h1>
          <p style="margin:4px 0 0;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:rgba(139,92,246,0.7);">Digital Studio</p>
        </td></tr>
        <!-- Title -->
        <tr><td style="padding:32px 40px 16px;">
          <h2 style="margin:0;font-size:20px;font-weight:600;color:#ffffff;">${title}</h2>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:0 40px 32px;color:rgba(255,255,255,0.6);font-size:15px;line-height:1.7;">
          ${body}
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.3);">Pixora Labz &mdash; We Build Startups That Feel Like Unicorns</p>
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.2);">This is an automated email. Please do not reply directly.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function contactNotificationEmail(name: string, email: string, subject: string, message: string): EmailOptions {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || 'No subject');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const body = `
    <p style="margin:0 0 24px;color:rgba(255,255,255,0.5);font-size:14px;">You have a new contact form submission on your website.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden;">
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:rgba(139,92,246,0.6);margin-bottom:4px;">From</span>
          <span style="font-size:15px;color:#ffffff;font-weight:500;">${safeName}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:rgba(139,92,246,0.6);margin-bottom:4px;">Email</span>
          <a href="mailto:${safeEmail}" style="font-size:15px;color:#8B5CF6;text-decoration:none;">${safeEmail}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:rgba(139,92,246,0.6);margin-bottom:4px;">Subject</span>
          <span style="font-size:15px;color:rgba(255,255,255,0.8);">${safeSubject}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px;">
          <span style="display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;color:rgba(139,92,246,0.6);margin-bottom:8px;">Message</span>
          <div style="font-size:15px;color:rgba(255,255,255,0.7);line-height:1.7;">${safeMessage}</div>
        </td>
      </tr>
    </table>
    <div style="margin-top:24px;text-align:center;">
      <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(subject || 'Your inquiry')}" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#8B5CF6,#6D28D9);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">Reply to ${safeName}</a>
    </div>`;

  return {
    to: config.contactEmail,
    subject: `New Contact: ${subject || 'No subject'} — from ${name}`,
    html: baseLayout('New Contact Message', body),
  };
}

export function contactConfirmationEmail(name: string, email: string, subject: string): EmailOptions {
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject || 'your inquiry');

  const body = `
    <p style="margin:0 0 16px;color:rgba(255,255,255,0.7);">Hi <strong style="color:#ffffff;">${safeName}</strong>,</p>
    <p style="margin:0 0 16px;color:rgba(255,255,255,0.6);">Thank you for reaching out to us! We have received your message regarding <strong style="color:rgba(255,255,255,0.8);">"${safeSubject}"</strong> and our team will review it shortly.</p>
    <p style="margin:0 0 24px;color:rgba(255,255,255,0.6);">We typically respond within <strong style="color:#ffffff;">24 hours</strong> on business days. In the meantime, feel free to explore our work.</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="https://main.pixoralabz.tech/portfolio" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#8B5CF6,#6D28D9);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:8px;">View Our Portfolio</a>
    </div>
    <div style="margin-top:24px;padding:20px;background:rgba(139,92,246,0.06);border:1px solid rgba(139,92,246,0.12);border-radius:10px;">
      <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:1px;">Need urgent help?</p>
      <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.6);">Email us directly at <a href="mailto:${escapeHtml(config.contactEmail)}" style="color:#8B5CF6;text-decoration:none;">${escapeHtml(config.contactEmail)}</a></p>
    </div>`;

  return {
    to: email,
    subject: `We received your message — Pixora Labz`,
    html: baseLayout(`Thanks for reaching out, ${safeName}!`, body),
  };
}

import { Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';
import ContactMessage from '../models/ContactMessage.js';
import { sendEmail, contactNotificationEmail, contactConfirmationEmail } from '../services/emailService.js';

export async function send(req: Request, res: Response): Promise<void> {
  const { name, email, subject, message } = req.body;

  // Sanitize inputs
  const cleanMessage = sanitizeHtml(message, { allowedTags: [], allowedAttributes: {} });
  const cleanName = sanitizeHtml(name, { allowedTags: [], allowedAttributes: {} });
  const cleanSubject = sanitizeHtml(subject || '', { allowedTags: [], allowedAttributes: {} });

  const contact = await ContactMessage.create({
    name: cleanName,
    email,
    subject: cleanSubject,
    message: cleanMessage,
  });

  // Send notification to admin + confirmation to client (non-blocking)
  Promise.all([
    sendEmail(contactNotificationEmail(cleanName, email, cleanSubject, cleanMessage)),
    sendEmail(contactConfirmationEmail(cleanName, email, cleanSubject)),
  ]).catch(console.error);

  res.status(201).json({ success: true, data: contact });
}

export async function getAll(_req: Request, res: Response): Promise<void> {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json({ success: true, data: messages });
}

export async function markRead(req: Request, res: Response): Promise<void> {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!message) {
    res.status(404).json({ success: false, message: 'Message not found.' });
    return;
  }
  res.json({ success: true, data: message });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) {
    res.status(404).json({ success: false, message: 'Message not found.' });
    return;
  }
  res.json({ success: true, message: 'Message deleted.' });
}

import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial.js';

export async function getAll(_req: Request, res: Response): Promise<void> {
  const testimonials = await Testimonial.find({ published: true }).sort({ order: 1 });
  res.json({ success: true, data: testimonials });
}

export async function create(req: Request, res: Response): Promise<void> {
  const testimonial = await Testimonial.create({ ...req.body });
  res.status(201).json({ success: true, data: testimonial });
}

export async function update(req: Request, res: Response): Promise<void> {
  const updateData: Record<string, unknown> = { ...req.body };
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  if (!testimonial) {
    res.status(404).json({ success: false, message: 'Testimonial not found.' });
    return;
  }
  res.json({ success: true, data: testimonial });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    res.status(404).json({ success: false, message: 'Testimonial not found.' });
    return;
  }
  res.json({ success: true, message: 'Testimonial deleted.' });
}

export async function adminGetAll(_req: Request, res: Response): Promise<void> {
  const testimonials = await Testimonial.find().sort({ order: 1 });
  res.json({ success: true, data: testimonials });
}

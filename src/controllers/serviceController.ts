import { Request, Response } from 'express';
import Service from '../models/Service.js';

export async function getAll(_req: Request, res: Response): Promise<void> {
  const services = await Service.find({ published: true }).sort({ order: 1 });
  res.json({ success: true, data: services });
}

export async function getOne(req: Request, res: Response): Promise<void> {
  const service = await Service.findById(req.params.id);
  if (!service) {
    res.status(404).json({ success: false, message: 'Service not found.' });
    return;
  }
  res.json({ success: true, data: service });
}

export async function create(req: Request, res: Response): Promise<void> {
  const service = await Service.create({ ...req.body });
  res.status(201).json({ success: true, data: service });
}

export async function update(req: Request, res: Response): Promise<void> {
  let updateData = { ...req.body };
  const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  if (!service) {
    res.status(404).json({ success: false, message: 'Service not found.' });
    return;
  }
  res.json({ success: true, data: service });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    res.status(404).json({ success: false, message: 'Service not found.' });
    return;
  }
  res.json({ success: true, message: 'Service deleted.' });
}

// Admin: get all including unpublished
export async function adminGetAll(_req: Request, res: Response): Promise<void> {
  const services = await Service.find().sort({ order: 1 });
  res.json({ success: true, data: services });
}

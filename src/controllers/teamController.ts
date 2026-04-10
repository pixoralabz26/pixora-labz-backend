import { Request, Response } from 'express';
import Team from '../models/Team.js';

export async function getAll(_req: Request, res: Response): Promise<void> {
  const members = await Team.find({ published: true }).sort({ order: 1 });
  res.json({ success: true, data: members });
}

export async function create(req: Request, res: Response): Promise<void> {
  const image = req.body.image || '';
  const social = req.body.social ? (typeof req.body.social === 'string' ? JSON.parse(req.body.social) : req.body.social) : {};
  const member = await Team.create({ ...req.body, image, social });
  res.status(201).json({ success: true, data: member });
}

export async function update(req: Request, res: Response): Promise<void> {
  const updateData: Record<string, unknown> = { ...req.body };
  if (updateData.social && typeof updateData.social === 'string') {
    updateData.social = JSON.parse(updateData.social as string);
  }
  const member = await Team.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  if (!member) {
    res.status(404).json({ success: false, message: 'Team member not found.' });
    return;
  }
  res.json({ success: true, data: member });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const member = await Team.findByIdAndDelete(req.params.id);
  if (!member) {
    res.status(404).json({ success: false, message: 'Team member not found.' });
    return;
  }
  res.json({ success: true, message: 'Team member deleted.' });
}

export async function adminGetAll(_req: Request, res: Response): Promise<void> {
  const members = await Team.find().sort({ order: 1 });
  res.json({ success: true, data: members });
}

import { Request, Response } from 'express';
import Portfolio from '../models/Portfolio.js';
import { createSlug } from '../utils/slug.js';

export async function getAll(req: Request, res: Response): Promise<void> {
  const { category } = req.query;
  const filter: Record<string, unknown> = { published: true };
  if (category && category !== 'All') filter.category = category;

  const projects = await Portfolio.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: projects });
}

export async function getBySlug(req: Request, res: Response): Promise<void> {
  const project = await Portfolio.findOne({ slug: req.params.slug, published: true });
  if (!project) {
    res.status(404).json({ success: false, message: 'Project not found.' });
    return;
  }
  res.json({ success: true, data: project });
}

export async function create(req: Request, res: Response): Promise<void> {
  const slug = createSlug(req.body.title);
  const image = req.body.image || '';
  const technologies = req.body.technologies
    ? (typeof req.body.technologies === 'string' ? JSON.parse(req.body.technologies) : req.body.technologies)
    : [];
  const project = await Portfolio.create({ ...req.body, slug, image, technologies });
  res.status(201).json({ success: true, data: project });
}

export async function update(req: Request, res: Response): Promise<void> {
  const updateData: Record<string, unknown> = { ...req.body };
  if (req.body.title) updateData.slug = createSlug(req.body.title as string);
  if (updateData.technologies && typeof updateData.technologies === 'string') {
    updateData.technologies = JSON.parse(updateData.technologies as string);
  }
  const project = await Portfolio.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  if (!project) {
    res.status(404).json({ success: false, message: 'Project not found.' });
    return;
  }
  res.json({ success: true, data: project });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const project = await Portfolio.findByIdAndDelete(req.params.id);
  if (!project) {
    res.status(404).json({ success: false, message: 'Project not found.' });
    return;
  }
  res.json({ success: true, message: 'Project deleted.' });
}

export async function adminGetAll(_req: Request, res: Response): Promise<void> {
  const projects = await Portfolio.find().sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: projects });
}

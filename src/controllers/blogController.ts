import { Request, Response } from 'express';
import Blog from '../models/Blog.js';
import { createSlug } from '../utils/slug.js';

export async function getAll(req: Request, res: Response): Promise<void> {
  const { category, search } = req.query;
  const filter: Record<string, unknown> = { published: true };
  if (category && category !== 'All') filter.category = category;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];
  }
  const posts = await Blog.find(filter).sort({ featured: -1, createdAt: -1 });
  res.json({ success: true, data: posts });
}

export async function getBySlug(req: Request, res: Response): Promise<void> {
  const post = await Blog.findOne({ slug: req.params.slug, published: true });
  if (!post) {
    res.status(404).json({ success: false, message: 'Article not found.' });
    return;
  }
  res.json({ success: true, data: post });
}

export async function create(req: Request, res: Response): Promise<void> {
  const slug = createSlug(req.body.title);
  const image = req.body.image || '';
  const tags = req.body.tags
    ? (typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags)
    : [];
  const post = await Blog.create({ ...req.body, slug, image, tags });
  res.status(201).json({ success: true, data: post });
}

export async function update(req: Request, res: Response): Promise<void> {
  const updateData: Record<string, unknown> = { ...req.body };
  if (req.body.title) updateData.slug = createSlug(req.body.title as string);
  if (updateData.tags && typeof updateData.tags === 'string') {
    updateData.tags = JSON.parse(updateData.tags as string);
  }
  const post = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  if (!post) {
    res.status(404).json({ success: false, message: 'Article not found.' });
    return;
  }
  res.json({ success: true, data: post });
}

export async function remove(req: Request, res: Response): Promise<void> {
  const post = await Blog.findByIdAndDelete(req.params.id);
  if (!post) {
    res.status(404).json({ success: false, message: 'Article not found.' });
    return;
  }
  res.json({ success: true, message: 'Article deleted.' });
}

export async function adminGetAll(_req: Request, res: Response): Promise<void> {
  const posts = await Blog.find().sort({ createdAt: -1 });
  res.json({ success: true, data: posts });
}

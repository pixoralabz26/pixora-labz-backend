import { Request, Response } from 'express';
import Seo from '../models/Seo.js';

export async function getAll(_req: Request, res: Response): Promise<void> {
  const seoEntries = await Seo.find();
  res.json({ success: true, data: seoEntries });
}

export async function getByPage(req: Request, res: Response): Promise<void> {
  const seo = await Seo.findOne({ page: req.params.page });
  if (!seo) {
    res.json({ success: true, data: null });
    return;
  }
  res.json({ success: true, data: seo });
}

export async function upsert(req: Request, res: Response): Promise<void> {
  const { page, ...data } = req.body;
  const seo = await Seo.findOneAndUpdate(
    { page },
    { ...data, page },
    { new: true, upsert: true, runValidators: true }
  );
  res.json({ success: true, data: seo });
}

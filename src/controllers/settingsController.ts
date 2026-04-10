import { Request, Response } from 'express';
import Settings from '../models/Settings.js';

export async function get(_req: Request, res: Response): Promise<void> {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  res.json({ success: true, data: settings });
}

export async function update(req: Request, res: Response): Promise<void> {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(req.body);
  } else {
    Object.assign(settings, req.body);
    await settings.save();
  }
  res.json({ success: true, data: settings });
}

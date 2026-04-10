import { Request, Response } from 'express';
import About from '../models/About.js';

export async function get(_req: Request, res: Response): Promise<void> {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({});
  }
  res.json({ success: true, data: about });
}

export async function update(req: Request, res: Response): Promise<void> {
  let about = await About.findOne();
  if (!about) {
    about = await About.create(req.body);
  } else {
    Object.assign(about, req.body);
    await about.save();
  }
  res.json({ success: true, data: about });
}

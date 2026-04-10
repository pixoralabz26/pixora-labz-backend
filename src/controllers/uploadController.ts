import { Request, Response } from 'express';
import { uploadToCloudinary } from '../services/cloudinaryService.js';

export async function uploadImage(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded.' });
    return;
  }
  const url = await uploadToCloudinary(req.file.buffer, 'pixoralabz/uploads');
  res.json({ success: true, data: { url } });
}

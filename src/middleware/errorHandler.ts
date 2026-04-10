import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', err.message);
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({ success: false, message: err.message });
    return;
  }

  if (err.name === 'CastError') {
    res.status(400).json({ success: false, message: 'Invalid ID format.' });
    return;
  }

  if ((err as NodeJS.ErrnoException).code === 'LIMIT_FILE_SIZE') {
    res.status(400).json({ success: false, message: 'File too large. Maximum size is 5MB.' });
    return;
  }

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message,
  });
}

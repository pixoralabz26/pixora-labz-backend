import { z, ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map((e) => e.message).join(', ');
        res.status(400).json({ success: false, message: messages });
        return;
      }
      next(error);
    }
  };
}

// ─── Validation Schemas ─────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email('Valid email is required.'),
  password: z.string().min(1, 'Password is required.'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required.'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters.'),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required.').max(100),
  email: z.string().email('Valid email is required.'),
  subject: z.string().max(200).optional(),
  message: z.string().min(1, 'Message is required.').max(5000),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  icon: z.string().optional(),
  order: z.number().optional(),
  published: z.boolean().optional(),
});

export const portfolioSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  content: z.string().optional(),
  category: z.string().min(1),
  technologies: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order: z.number().optional(),
});

export const blogSchema = z.object({
  title: z.string().min(1).max(300),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  readTime: z.number().optional(),
});

export const teamSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  bio: z.string().max(1000).optional(),
  social: z
    .object({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      github: z.string().optional(),
    })
    .optional(),
  order: z.number().optional(),
  published: z.boolean().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  content: z.string().min(1).max(2000),
  rating: z.number().min(1).max(5).optional(),
  published: z.boolean().optional(),
  order: z.number().optional(),
});

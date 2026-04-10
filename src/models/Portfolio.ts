import mongoose, { Schema, Document } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  image: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new Schema<IPortfolio>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    content: { type: String, default: '' },
    category: { type: String, required: true },
    image: { type: String, default: '' },
    images: [{ type: String }],
    technologies: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

portfolioSchema.index({ category: 1, published: 1 });

export default mongoose.model<IPortfolio>('Portfolio', portfolioSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  published: boolean;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, default: 'Pixora Labz' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    readTime: { type: Number, default: 5 },
  },
  { timestamps: true }
);

blogSchema.index({ category: 1, published: 1 });
blogSchema.index({ featured: -1, createdAt: -1 });

export default mongoose.model<IBlog>('Blog', blogSchema);

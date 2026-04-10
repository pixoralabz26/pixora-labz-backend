import mongoose, { Schema, Document } from 'mongoose';

export interface ISeo extends Document {
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  updatedAt: Date;
}

const seoSchema = new Schema<ISeo>(
  {
    page: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String }],
    ogImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ISeo>('Seo', seoSchema);

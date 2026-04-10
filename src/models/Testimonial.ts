import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  companyLogo?: string;
  rating: number;
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    companyLogo: { type: String },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

testimonialSchema.index({ order: 1, published: 1 });

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);

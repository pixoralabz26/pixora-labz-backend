import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  image?: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Globe' },
    image: { type: String },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

serviceSchema.index({ order: 1 });

export default mongoose.model<IService>('Service', serviceSchema);

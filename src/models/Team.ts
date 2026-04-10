import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    bio: { type: String, default: '' },
    image: { type: String, default: '' },
    social: {
      linkedin: { type: String },
      twitter: { type: String },
      github: { type: String },
    },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

teamSchema.index({ order: 1 });

export default mongoose.model<ITeam>('Team', teamSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    youtube?: string;
  };
  navItems: { label: string; href: string }[];
  footerText: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettings>(
  {
    companyName: { type: String, default: 'Pixora Labz' },
    tagline: { type: String, default: 'We Build Startups That Feel Like Unicorns' },
    email: { type: String, default: 'hello@pixoralabz.com' },
    phone: { type: String, default: '' },
    address: { type: String, default: 'India' },
    social: {
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
      instagram: { type: String },
      youtube: { type: String },
    },
    navItems: [
      {
        label: { type: String },
        href: { type: String },
      },
    ],
    footerText: { type: String, default: '© Pixora Labz. All rights reserved.' },
    heroTitle: { type: String, default: 'We Build Startups That Feel Like Unicorns' },
    heroSubtitle: {
      type: String,
      default: 'We design and engineer premium digital products for ambitious founders who refuse to settle for ordinary.',
    },
    heroImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ISettings>('Settings', settingsSchema);

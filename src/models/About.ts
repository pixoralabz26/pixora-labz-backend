import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutValue {
  title: string;
  description: string;
}

export interface IAbout extends Document {
  heroLabel: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyImage: string;
  storyBadge: string;
  storyBadgeSub: string;
  valuesTitle: string;
  values: IAboutValue[];
  updatedAt: Date;
}

const aboutSchema = new Schema<IAbout>(
  {
    heroLabel: { type: String, default: 'About Us' },
    heroTitle: { type: String, default: "We're a small team with" },
    heroHighlight: { type: String, default: 'big ambitions' },
    heroDescription: {
      type: String,
      default:
        'Pixora Labz is a premium digital product studio. We partner with ambitious founders to design, build, and launch products that feel extraordinary — the kind of products people can\'t stop talking about.',
    },
    storyTitle: { type: String, default: 'Our Story' },
    storyParagraphs: {
      type: [String],
      default: [
        'We started with a simple belief: startups deserve world-class digital products from day one. Not templates. Not compromises. Real, premium, thoughtfully crafted solutions.',
        'Every project we take on is treated like our own product. We obsess over the details — from the smoothness of animations to the architecture of the backend. Because we know that in a world of noise, quality is the only thing that cuts through.',
      ],
    },
    storyImage: { type: String, default: '' },
    storyBadge: { type: String, default: 'PL' },
    storyBadgeSub: { type: String, default: 'Est. 2024' },
    valuesTitle: { type: String, default: 'Our Values' },
    values: {
      type: [{ title: String, description: String }],
      default: [
        { title: 'Quality Over Speed', description: 'We never rush. Every pixel, every line of code is intentional.' },
        { title: 'Transparency', description: 'No hidden fees, no surprises. You always know where your project stands.' },
        { title: 'Long-term Thinking', description: 'We build products meant to scale, not just launch.' },
        { title: 'Partnership', description: "We don't just build for you — we build with you." },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAbout>('About', aboutSchema);

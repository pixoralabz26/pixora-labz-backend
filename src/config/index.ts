import dotenv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');

// Auto-generate JWT_SECRET if not set or using placeholder
function getOrGenerateJwtSecret(): string {
  const existing = process.env.JWT_SECRET;
  if (existing && existing !== 'change-this-secret-in-production' && existing !== 'your-super-secret-jwt-key-change-in-production-min-32-chars') {
    return existing;
  }
  const secret = crypto.randomBytes(64).toString('hex');
  // Persist to .env so it survives restarts
  try {
    let envContent = fs.readFileSync(envPath, 'utf-8');
    if (envContent.includes('JWT_SECRET=')) {
      envContent = envContent.replace(/JWT_SECRET=.*/g, `JWT_SECRET=${secret}`);
    } else {
      envContent += `\nJWT_SECRET=${secret}\n`;
    }
    fs.writeFileSync(envPath, envContent);
  } catch {
    // If we can't write .env, just use the generated secret for this session
  }
  process.env.JWT_SECRET = secret;
  return secret;
}

const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/pixoralabz',
  jwtSecret: getOrGenerateJwtSecret(),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  contactEmail: process.env.CONTACT_EMAIL || 'hello@pixoralabz.com',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@pixoralabz.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!',
} as const;

export default config;

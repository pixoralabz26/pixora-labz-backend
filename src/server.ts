import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import config from './config/index.js';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

// Routes
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import portfolioRoutes from './routes/portfolio.js';
import blogRoutes from './routes/blog.js';
import teamRoutes from './routes/team.js';
import testimonialRoutes from './routes/testimonials.js';
import settingsRoutes from './routes/settings.js';
import seoRoutes from './routes/seo.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/upload.js';
import aboutRoutes from './routes/about.js';
import sitemapRoutes from './routes/sitemap.js';

const app = express();

// ─── Security ────────────────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: config.nodeEnv === 'production' ? undefined : false,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));

app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Stricter rate limit for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts, please try again later.' },
});
app.use('/api/auth/login', authLimiter);

// ─── Body parsing ────────────────────────────────────────────────────────────
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/about', aboutRoutes);
app.use('/', sitemapRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Error handling ──────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start ───────────────────────────────────────────────────────────────────
async function start() {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`✓ Server running on port ${config.port}`);
    console.log(`  Environment: ${config.nodeEnv}`);
  });
}

start().catch(console.error);

export default app;

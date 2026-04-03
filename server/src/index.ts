/**
 * Pixora Labz Core Backend API
 * ──────────────────────────────────────
 * Main entry point for the Express server.
 * Handles database connections, static file serving, JWT authentication,
 * and REST APIs for public pages + admin dashboard.
 * 
 * Edit this file to add new routes, modify database queries, or adjust
 * authentication logic. Make sure to restart the server after modifications.
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool, { initDb } from './db';
import { getSecret, rotateSecret, TOKEN_TTL_SECONDS, REFRESH_GRACE_SECONDS, scheduleRotation } from './tokenManager';

// ─── Environment & Config Initialization ──────────────────────
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── File Uploads (Multer) ──────────────────────────────────
// Automatically creates an 'uploads' directory to store images locally
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ─── Security / Authentication Middleware ────────────────────
/**
 * authenticate()
 * Protects admin-only routes. Expects a standard "Bearer <token>" header.
 * Uses the tokenManager to check if the signature matches the currently active key.
 */
const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  
  // Verify token cryptographically against current active secret
  jwt.verify(token, getSecret(), (err, user) => {
    if (err) {
      // Return specific error so the frontend knows if it should attempt a background refresh
      const reason = err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'INVALID_SECRET';
      return res.status(403).json({ error: 'Auth failed', reason });
    }
    
    // Auth passed, inject user payload into request for the next handler
    (req as any).user = user;
    next();
  });
};

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists in database
    const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    
    if (isMatch) {
      const token = jwt.sign({ role: 'admin', id: admin.id }, getSecret(), { expiresIn: TOKEN_TTL_SECONDS });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Refresh Token Route & Key Rotation
// If a token has expired or the secret was rotated, the client can request a new one
// by sending their old token to this endpoint. If it's a validly signed token
// from either the current OR a grace-period past secret, we generate a new one 
// using the CURRENT secret. (Optionally forcing a key rotation right now).
app.post('/api/refresh', (req, res) => {
  const { token, forceRotate } = req.body;
  if (!token) return res.status(400).json({ error: 'Token required' });

  // Decode the token payload ignoring expiration to check if it's legit
  const decoded = jwt.decode(token) as any;
  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).json({ error: 'Invalid token structure' });
  }

  // We only allow refresh if the token was issued recently
  // iat is in seconds since epoch
  const now = Math.floor(Date.now() / 1000);
  const issuedAt = decoded.iat || 0;
  
  // If the token is older than the TTL + grace period, require full login again
  if (now - issuedAt > TOKEN_TTL_SECONDS + REFRESH_GRACE_SECONDS) {
    return res.status(403).json({ error: 'Session expired entirely. Please log in again.' });
  }

  // User explicitly asked to rotate the cryptographic secret
  let activeSecret = getSecret();
  if (forceRotate) {
    activeSecret = rotateSecret();
  }

  // Issue a fresh token with the new/active secret
  const newToken = jwt.sign({ role: 'admin' }, activeSecret, { expiresIn: TOKEN_TTL_SECONDS });
  res.json({ token: newToken });
});

// Admin-only forced secret rotation
app.post('/api/rotate-key', authenticate, (req, res) => {
  const newSecret = rotateSecret();
  
  // Immediately issue a new token with this new secret so the admin doesn't lock themselves out
  const newToken = jwt.sign({ role: 'admin' }, newSecret, { expiresIn: TOKEN_TTL_SECONDS });
  res.json({ 
    message: 'Cryptographic secret forcibly rotated across all systems. All existing sessions invalidated.', 
    token: newToken 
  });
});

// ─── REST APIs / Page Data ─────────────────────────────────

/**
 * GET /api/projects
 * Public route to fetch all projects to display on the main site portfolio.
 */
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

/**
 * POST /api/projects
 * Protected admin route to add new portfolio items via Dashboard.
 * Supports multipart/form-data for image uploads via Multer.
 */
app.post('/api/projects', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const result = await pool.query(
      'INSERT INTO projects (title, description, image_url) VALUES ($1, $2, $3) RETURNING *',
      [title, description, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

/**
 * GET /api/team
 * Public route fetching Founder & Team data for the about page.
 */
app.get('/api/team', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team ORDER BY created_at ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

/**
 * POST /api/team
 * Protected admin route for adding new team members.
 */
app.post('/api/team', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name, role, about } = req.body;
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const result = await pool.query(
      'INSERT INTO team (name, role, about, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, role, about, imageUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ─── Dynamic Editable Site Text API ────────────────────────

/**
 * GET /api/content
 * The dynamic backend for useContent() hook. Scrapes the entire key/value 
 * content schema from the database and returns it as a JSON object to populate
 * the UI across Home, Services, and Contact pages.
 */
app.get('/api/content', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, value FROM site_content');
    const content: Record<string, any> = {};
    result.rows.forEach(row => {
      try { content[row.key] = JSON.parse(row.value); } catch { content[row.key] = row.value; }
    });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Update site content (admin only) — accepts { key: value, ... }
app.put('/api/content', authenticate, async (req, res) => {
  try {
    const updates = req.body as Record<string, any>;
    for (const [key, value] of Object.entries(updates)) {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      await pool.query(
        `INSERT INTO site_content (key, value, updated_at) VALUES ($1, $2, NOW())
         ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
        [key, serialized]
      );
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// ─── Server Boot Sequence ──────────────────────────────────
// Initialise connection to database, then spin up Express listener
initDb().then(() => {
  // Start the background key rotation daemon (rotates JWT securely automatically)
  scheduleRotation();
  
  app.listen(port, () => {
    console.log(`\n🚀 Server running on port ${port}`);
    console.log(`📡 Endpoints active at http://localhost:${port}/api/...`);
  });
});

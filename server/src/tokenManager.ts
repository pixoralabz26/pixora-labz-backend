/**
 * tokenManager.ts
 * ─────────────────────────────────────────────────────────
 * Manages the in-memory JWT secret.
 * The secret is loaded from .env on startup.
 * rotateSecret() generates a new cryptographically-random secret
 * and replaces the active one — all existing tokens issued
 * with the old secret are immediately invalidated.
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Generate a secure random 64-byte hex string
const generateSecret = (): string => crypto.randomBytes(64).toString('hex');

// Active secret — initialised from .env, falls back to a generated one
let activeSecret: string = process.env.JWT_SECRET || generateSecret();

// How long each token lives (seconds)
export const TOKEN_TTL_SECONDS = 60 * 60 * 24; // 24 hours

// Grace period: allow tokens up to this many seconds past expiry to refresh
export const REFRESH_GRACE_SECONDS = 60 * 60; // 1 hour grace

/**
 * Returns the currently active JWT secret.
 */
export const getSecret = (): string => activeSecret;

/**
 * Generates a brand-new JWT secret, replaces the active one,
 * and persists it to .env so it survives server restarts.
 *
 * Called automatically when a token is issued with an expired secret,
 * or can be triggered manually for scheduled rotation.
 */
export const rotateSecret = (): string => {
  const newSecret = generateSecret();
  activeSecret = newSecret;

  // Persist to .env
  try {
    const envPath = path.join(process.cwd(), '.env');
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

    if (envContent.includes('JWT_SECRET=')) {
      envContent = envContent.replace(/^JWT_SECRET=.*/m, `JWT_SECRET=${newSecret}`);
    } else {
      envContent += `\nJWT_SECRET=${newSecret}`;
    }

    fs.writeFileSync(envPath, envContent.trim() + '\n');
    console.log('[TokenManager] JWT secret rotated and saved to .env');
  } catch (err) {
    console.warn('[TokenManager] Could not persist rotated secret to .env:', err);
  }

  return newSecret;
};

/**
 * Schedule automatic secret rotation every N milliseconds.
 * Default: every 7 days.
 */
export const scheduleRotation = (intervalMs: number = 7 * 24 * 60 * 60 * 1000): void => {
  setInterval(() => {
    rotateSecret();
    console.log(`[TokenManager] Scheduled rotation complete. Next rotation in ${intervalMs / 3600000}h`);
  }, intervalMs);
  console.log(`[TokenManager] Auto-rotation scheduled every ${intervalMs / 3600000}h`);
};

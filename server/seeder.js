/**
 * Pixora Labz — Database Seeder
 * ─────────────────────────────
 * Seeds the database with:
 *   1. Table schema (projects, team, site_content)
 *   2. Default site content for all editable pages
 *   3. Writes / verifies admin credentials in .env
 *
 * Usage:  node seeder.js
 */

require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// ── Config ────────────────────────────────────────────────
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin1@pixoralabz.tech';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'DivyeshC@1510';
const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('\n❌  DATABASE_URL is not set in .env — cannot connect to Neon.\n');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ── Default site content ──────────────────────────────────
const defaultContent = {
  home_badge: 'Digital Excellence Studio',
  home_hero_title: 'We build software\nthat stands out.',
  home_hero_subtitle: 'Pixora Labz is a boutique development studio crafting high-performance websites, mobile applications, and growth strategies for ambitious brands.',
  home_stat1_num: '50+',
  home_stat1_label: 'Projects delivered',
  home_stat2_num: '3yr',
  home_stat2_label: 'In the industry',
  home_stat3_num: '98%',
  home_stat3_label: 'Client satisfaction',
  home_stat4_num: '24/7',
  home_stat4_label: 'Support coverage',
  home_cta_title: 'Ready to build something\ngreat?',
  home_cta_subtitle: "Let's talk about your project. No commitments — just a conversation.",

  services_hero_title: 'Every service you need\nto grow online.',
  services_hero_subtitle: 'From concept to production to growth — Pixora Labz is the partner you call once and keep forever.',

  contact_hero_title: "Let's build something\nremarkable.",
  contact_hero_subtitle: "Drop us a message and we'll get back to you within one business day. First conversations are always free.",
  contact_email: 'hello@pixoralabz.com',
  contact_response_time: 'Within 1 business day',
  contact_location: 'Remote-first, worldwide',
};

// ── Helpers ───────────────────────────────────────────────
const log = (msg) => console.log(`  ✅  ${msg}`);
const warn = (msg) => console.log(`  ⚠️   ${msg}`);
const title = (msg) => console.log(`\n  ${msg}\n  ${'─'.repeat(msg.length)}`);

// ── Main seeder ───────────────────────────────────────────
async function seed() {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║       Pixora Labz — Database Seeder      ║');
  console.log('╚══════════════════════════════════════════╝\n');

  const client = await pool.connect();

  try {
    // 1. Create tables
    title('Step 1 — Verifying / creating database tables');
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id          SERIAL PRIMARY KEY,
        title       VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image_url   TEXT,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS team (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(255) NOT NULL,
        role        VARCHAR(255) NOT NULL,
        about       TEXT NOT NULL,
        image_url   TEXT,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS site_content (
        key        VARCHAR(100) PRIMARY KEY,
        value      TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    log('Tables exist: projects, team, site_content, admins');

    // 2. Seed site_content (skip keys that already have custom values)
    title('Step 2 — Seeding default site content');
    let seeded = 0;
    let skipped = 0;
    for (const [key, value] of Object.entries(defaultContent)) {
      const existing = await client.query('SELECT 1 FROM site_content WHERE key = $1', [key]);
      if (existing.rowCount === 0) {
        await client.query(
          `INSERT INTO site_content (key, value) VALUES ($1, $2)`,
          [key, value]
        );
        seeded++;
      } else {
        skipped++;
      }
    }
    log(`Inserted ${seeded} default content entries`);
    if (skipped > 0) warn(`${skipped} keys already existed — left untouched`);

    // 3. Ensure .env has admin credentials (optional fallback, but we will put it in DB next)
    title('Step 3 — Verifying admin credentials in .env');
    const envPath = path.join(__dirname, '.env');
    let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

    let envChanged = false;

    const ensure = (key, value) => {
      if (!envContent.includes(`${key}=`)) {
        envContent += `\n${key}=${value}`;
        envChanged = true;
        log(`Added ${key} to .env`);
      } else {
        log(`${key} already set in .env`);
      }
    };

    ensure('JWT_SECRET', JWT_SECRET);
    ensure('ADMIN_EMAIL', ADMIN_EMAIL);
    ensure('ADMIN_PASSWORD', ADMIN_PASSWORD);

    if (envChanged) {
      fs.writeFileSync(envPath, envContent.trim() + '\n');
      log('.env updated successfully');
    }

    // 4. Seed Admin into Database
    title('Step 4 — Seeding Admin into Database');
    const adminCheck = await client.query('SELECT 1 FROM admins WHERE email = $1', [ADMIN_EMAIL]);
    if (adminCheck.rowCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(ADMIN_PASSWORD, salt);
      await client.query(
        'INSERT INTO admins (email, password_hash) VALUES ($1, $2)',
        [ADMIN_EMAIL, hash]
      );
      log(`Inserted admin ${ADMIN_EMAIL} into database`);
    } else {
      warn(`Admin ${ADMIN_EMAIL} already exists in database`);
    }

    // 5. Summary
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║             Seed Complete! 🚀             ║');
    console.log('╚══════════════════════════════════════════╝');
    console.log('\n  Admin Credentials');
    console.log('  ─────────────────');
    console.log(`  Email    : ${ADMIN_EMAIL}`);
    console.log(`  Password : ${ADMIN_PASSWORD}`);
    console.log(`  Dashboard: http://localhost:5173/admin\n`);
    console.log('  ⚠️  Change these credentials before going to production!\n');

  } catch (err) {
    console.error('\n❌  Seeder failed:\n', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();

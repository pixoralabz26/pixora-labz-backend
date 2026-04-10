# Pixora Labz — Production-Ready Company Website

> Premium full-stack website for **Pixora Labz** built with React, Node.js, MongoDB, and a headless CMS dashboard.

**Live:** [https://main.pixoralabz.tech](https://main.pixoralabz.tech)

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3 | UI library |
| TypeScript | 5.6 | Type safety |
| Vite | 8.0 | Build tool (Rolldown bundler) |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 11.11 | Page transitions & scroll animations |
| Lenis | 1.1 | Smooth scrolling (60fps) |
| React Router | 6 | SPA routing with lazy loading |
| Axios | 1.7 | API client with JWT interceptors |
| React Helmet Async | 2.0 | Dynamic SEO & meta tags |
| React Quill | 2.0 | Rich text editing in CMS |
| Lucide React | 0.453 | Icon library |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Express | 4.21 | HTTP server |
| TypeScript | 5.6 | Type safety |
| MongoDB + Mongoose | 8.8 | Database & ODM |
| JWT + bcryptjs | — | Authentication (12-round hashing) |
| Zod | 3.23 | Request validation (8 schemas) |
| Cloudinary | 2.5 | Image uploads & optimization |
| Nodemailer | 6.9 | Contact form emails |
| Helmet | 8.0 | Security headers (HSTS, CSP) |
| express-rate-limit | 7.4 | Rate limiting |
| sanitize-html | 2.13 | XSS protection |

---

## Project Structure

```
├── frontend/
│   ├── public/
│   │   ├── _redirects             # Netlify SPA redirects
│   │   ├── manifest.json          # PWA manifest
│   │   ├── robots.txt             # Search engine directives
│   │   └── sitemap.xml            # Static sitemap
│   ├── src/
│   │   ├── animations/            # Framer Motion variants
│   │   ├── assets/images/         # Logo files
│   │   ├── cms/
│   │   │   ├── components/        # DataTable, Modal, ImageUploader, RichTextEditor, ToggleSwitch
│   │   │   ├── layouts/           # CMSLayout (sidebar + topbar, noindex)
│   │   │   └── pages/             # Dashboard, Services, Portfolio, Blog, Team, Testimonials, Settings, SEO, Contacts, About
│   │   ├── components/
│   │   │   ├── common/            # Navbar (aria-label), Footer (role=contentinfo), SEOHead (JSON-LD)
│   │   │   ├── sections/          # HeroSection, HowWeBuildSection, ServicesSection, PortfolioSection, TeamSection, BlogSection, TestimonialsSection, CTASection
│   │   │   └── ui/               # SectionHeading, SectionContainer, ParticleField
│   │   ├── data/                  # Default data (services, team, nav links)
│   │   ├── hooks/                 # useLenis, useInView, useApi, useTheme
│   │   ├── layouts/               # MainLayout (skip-to-content link)
│   │   ├── lib/                   # types.ts, utils.ts
│   │   ├── pages/                 # Home, About, Services, Portfolio, Blog, Contact, Privacy, Terms, AdminLogin + detail pages
│   │   ├── services/              # Axios API service layer
│   │   └── styles/                # globals.css (design system)
│   ├── index.html                 # SEO: JSON-LD schemas, OG tags, verification placeholders
│   ├── vite.config.ts             # Vite 8 + manualChunks (vendor/animations)
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/                # env config, database, cloudinary
│   │   ├── controllers/           # 11 REST controllers
│   │   ├── middleware/             # auth, errorHandler, validate (Zod), upload (multer, 5MB, MIME check)
│   │   ├── models/                # 10 Mongoose models (User, Service, Portfolio, Blog, Team, Testimonial, ContactMessage, Settings, Seo, About)
│   │   ├── routes/                # 12 Express route files (incl. sitemap)
│   │   ├── services/              # cloudinaryService, emailService
│   │   ├── utils/                 # slug helper
│   │   ├── server.ts              # Express app entry
│   │   └── seed.ts                # Database seeder
│   ├── .env.example
│   └── package.json
├── logo/
│   ├── logo-black.png
│   └── logo-white.png
└── vercel.json                    # Vercel deployment config
```

---

## Quick Start

### Prerequisites
- **Node.js 18+**
- **MongoDB** (local or Atlas)
- **Cloudinary** account (for image uploads)

### 1. Clone & Install

```bash
# Frontend
cd frontend
cp .env.example .env
npm install

# Backend
cd ../backend
cp .env.example .env
npm install
```

### 2. Configure Environment

**backend/.env**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pixoralabz
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=hello@pixoralabz.com

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# Site URL (sitemap generation)
SITE_URL=https://main.pixoralabz.tech

# Admin Seed
ADMIN_EMAIL=admin@pixoralabz.com
ADMIN_PASSWORD=ChangeThisPassword123!
```

**frontend/.env**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_NAME=Pixora Labz
VITE_SITE_URL=https://main.pixoralabz.tech
```

### 3. Seed Database

```bash
cd backend
npx ts-node src/seed.ts
```

Creates:
- **Admin user:** `admin@pixoralabz.com` / `ChangeThisPassword123!`
- **Default site settings**

### 4. Run Development

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| CMS Admin | http://localhost:5173/admin/login |

---

## Deployment

### Option A: Render (Backend) + Vercel (Frontend)

**Backend on Render:**
1. Create a Web Service → connect GitHub repo
2. Build command: `cd backend && npm install && npm run build`
3. Start command: `cd backend && node dist/server.js`
4. Add all environment variables from `.env.example`

**Frontend on Vercel:**
1. Import project → root directory: `frontend/`
2. Framework preset: **Vite**
3. Environment variables:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   VITE_SITE_NAME=Pixora Labz
   VITE_SITE_URL=https://main.pixoralabz.tech
   ```

Pre-configured: `vercel.json` with SPA rewrites and security headers.

### Option B: Single VPS

```bash
# Build
cd frontend && npm run build
cd ../backend && npm run build

# Run with PM2
pm2 start dist/server.js --name pixoralabz-api
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name main.pixoralabz.tech;

    root /var/www/pixoralabz;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## CMS Admin Panel

### Access
- **URL:** `/admin/login`
- **Default:** `admin@pixoralabz.com` / `ChangeThisPassword123!`
- **⚠️ Change the password immediately after first login**

### Features
| Section | Capabilities |
|---------|-------------|
| **Dashboard** | Overview stats, quick actions |
| **Services** | CRUD with icon picker, ordering, publish toggle |
| **Portfolio** | Rich projects with images, tech tags, live/GitHub URLs |
| **Blog** | Rich text editor, categories, tags, featured posts |
| **Team** | Member profiles with social links |
| **Testimonials** | Star ratings, company logos |
| **About** | Company information management |
| **Messages** | Contact form inbox with read/unread, reply via email |
| **SEO** | Per-page meta titles, descriptions, OG images |
| **Settings** | Company info, hero content, social links, footer |

---

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/login` | — | Login |
| GET | `/api/auth/me` | ✓ | Current user |
| GET | `/api/services` | — | Public services |
| GET | `/api/services/admin` | ✓ | All services (admin) |
| POST | `/api/services` | ✓ | Create service |
| PUT | `/api/services/:id` | ✓ | Update service |
| DELETE | `/api/services/:id` | ✓ | Delete service |
| GET | `/api/portfolio` | — | Public projects |
| GET | `/api/portfolio/:slug` | — | Project by slug |
| GET | `/api/portfolio/admin/all` | ✓ | All projects (admin) |
| POST | `/api/portfolio` | ✓ | Create project |
| PUT | `/api/portfolio/:id` | ✓ | Update project |
| DELETE | `/api/portfolio/:id` | ✓ | Delete project |
| GET | `/api/blog` | — | Public posts |
| GET | `/api/blog/:slug` | — | Post by slug |
| GET | `/api/blog/admin/all` | ✓ | All posts (admin) |
| POST | `/api/blog` | ✓ | Create post |
| PUT | `/api/blog/:id` | ✓ | Update post |
| DELETE | `/api/blog/:id` | ✓ | Delete post |
| GET | `/api/team` | — | Public team |
| GET | `/api/team/admin` | ✓ | All members (admin) |
| POST | `/api/team` | ✓ | Add member |
| PUT | `/api/team/:id` | ✓ | Update member |
| DELETE | `/api/team/:id` | ✓ | Remove member |
| GET | `/api/testimonials` | — | Public testimonials |
| GET | `/api/testimonials/admin` | ✓ | All testimonials (admin) |
| POST | `/api/testimonials` | ✓ | Create testimonial |
| PUT | `/api/testimonials/:id` | ✓ | Update testimonial |
| DELETE | `/api/testimonials/:id` | ✓ | Delete testimonial |
| POST | `/api/contact` | — | Send message (rate limited) |
| GET | `/api/contact` | ✓ | All messages (admin) |
| PATCH | `/api/contact/:id/read` | ✓ | Mark read |
| DELETE | `/api/contact/:id` | ✓ | Delete message |
| GET | `/api/settings` | — | Site settings |
| PUT | `/api/settings` | ✓ | Update settings |
| GET | `/api/seo` | ✓ | All SEO data |
| GET | `/api/seo/:page` | — | SEO for page |
| POST | `/api/seo` | ✓ | Create/update SEO |
| POST | `/api/upload` | ✓ | Upload image (5MB max) |
| GET | `/api/health` | — | Health check |
| GET | `/api/sitemap.xml` | — | Dynamic XML sitemap |

---

## Security

- **Authentication:** JWT tokens via Authorization header, bcrypt 12-round password hashing
- **Input validation:** Zod schemas on all endpoints (8 schemas)
- **XSS prevention:** sanitize-html on all user content
- **Rate limiting:** 100 req/15min general, 10 req/15min for auth routes
- **Security headers:** Helmet with HSTS (1 year), CSP in production
- **CORS:** Restricted to configured `FRONTEND_URL` origin
- **File uploads:** 5MB max, MIME type validation (images only)
- **Database:** MongoDB injection prevented via Mongoose ODM
- **CMS protection:** `noindex` meta on all admin pages
- **Error handling:** Production-safe (no stack traces leaked)

---

## SEO

- **Structured data:** JSON-LD schemas (Organization, WebSite, BlogPosting, ContactPage)
- **Meta tags:** Dynamic per-page titles, descriptions, OG images via React Helmet Async
- **Sitemap:** Static (`/sitemap.xml`) + dynamic API endpoint (`/api/sitemap.xml` from database)
- **Robots:** `robots.txt` configured for search engines
- **PWA:** `manifest.json` with app metadata
- **CMS SEO manager:** Per-page meta editor in admin panel

---

## Performance

- **Code splitting:** All pages lazy-loaded with `React.lazy`
- **Vendor chunking:** Separate bundles for `react`/`react-router` (vendor) and `framer-motion` (animations)
- **Image optimization:** Cloudinary auto-format, auto-quality, responsive sizing
- **Smooth scroll:** Lenis at 60fps
- **Animations:** GPU-accelerated (transform/opacity only) via Framer Motion
- **Font loading:** Google Fonts with `display=swap`
- **CSS:** Tailwind CSS purge removes unused styles in production
- **Build:** Vite 8 with Rolldown — production build in ~2.5s

---

## Accessibility

- Skip-to-content link on all public pages
- Semantic HTML with `aria-label` on navigation
- Footer with `role="contentinfo"`
- Keyboard-navigable interfaces

---

## License

Proprietary — Pixora Labz. All rights reserved.

# Pixora Labz 🚀

Pixora Labz is a modern, high-performance web application acting as a digital real-estate and administrative dashboard for a boutique development studio. The platform is designed focusing on breathtaking client-facing aesthetics, a seamlessly integrated AI assistant, and a highly secure administration backbone.

## 🌟 Key Features

### Frontend (React + Vite)
- **Stunning UI/UX**: Custom design system featuring fluid micro-animations, glassmorphism, and responsive styling.
- **AI Virtual Assistant**: A floating chat widget enabling users to seamlessly converse with the Pixora AI powered backend.
- **Dynamic Content rendering**: Connected to the backend to seamlessly render Hero texts, contact metrics, and statistics straight from the database.

### Backend (Node.js + Express + PostgreSQL)
- **Robust Admin Infrastructure**: Secure administration panel with JWT-based authentication.
- **Cryptographic Key Rotation**: Industry-standard cryptographic token security handling real-time forced secret rotations and graceful session deprecations.
- **RESTful Endpoints**: Full CRUD control over Team profiles, Portfolio Projects, and Site Content.

### AI Capabilities
- Built-in endpoints providing integration for advanced LLM services capable of:
  - Global AI Chatting capabilities
  - ATS Resume formatting and reviewing
  - Intelligent Cover letter generations
  - Automated Startup Idea validation

## 🛠 Tech Stack

- **Frontend Builder:** Vite + React + Lucide React
- **Backend Infrastructure:** Node.js (Express), TypeScript
- **Database:** PostgreSQL (Neon Serverless)
- **Containerization:** Docker & Docker Compose
- **Security:** bcryptjs, jsonwebtoken

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [Docker](https://www.docker.com/) installed on your machine.

### 1. Environment Setup
You need to establish your environment variables on the backend. Create `.env` inside the `/server` directory using the provided `.env.example`:

```bash
cd server
cp .env.example .env
```
Ensure your `DATABASE_URL` matches your deployed Neon database URL.

### 2. Standard Development Start
Run the frontend and backend simultaneously in respective terminals:

**Terminal 1 (Backend):**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm install
npm run dev
```

### 3. Docker Deployment (Production)

You can launch the entire ecosystem concurrently using Docker Compose:

```bash
# From the root directory
docker-compose up --build -d
```
The site will map its local services gracefully and run in detached mode.

---
*Developed by the Pixora Labz Engineering Team*

# SHIV SHAKTI INDUSTRIES — Production Web Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A high-performance, secure, and SEO-optimized web application for **Shiv Shakti Industries**, precision CNC & VMC manufacturing specialists based in Makarpura GIDC, Vadodara, Gujarat.

---

## 🛠️ Technology Stack

* **Framework:** Next.js 15 (App Router with Server Components & Server Actions)
* **UI & Styling:** React 19, Tailwind CSS v4, Lucide Icons, GSAP, Framer Motion
* **3D Visualizations:** Three.js / React Three Fiber / Drei
* **Form Handling & Email:** React Hook Form, Nodemailer (Brevo / SMTP)
* **Security & DevSecOps:** Sliding-window rate limiting, input sanitization, file extension whitelisting, HTTP Security Headers, Next.js Middleware route guards

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js 20.x or 22.x LTS
* npm or pnpm

### 2. Installation
```bash
git clone https://github.com/your-org/cnc-machining-demo.git
cd cnc-machining-demo
npm install
```

### 3. Environment Setup
Copy the template and configure your secrets:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Free SMTP Configuration (e.g. Brevo)
SMTP_HOST="smtp-relay.brevo.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="your-login-email"
SMTP_PASS="your-smtp-master-key"

SMTP_FROM_EMAIL='"Shiv Shakti Industries" <sale@shivshaktiindustries.org>'
SMTP_TO_EMAIL="sale@shivshaktiindustries.org"

# Admin Dashboard Security
ADMIN_SECRET_KEY="replace-with-a-unique-random-secret-at-least-32-characters"
ADMIN_INITIAL_PASSWORD="set-a-unique-password-of-at-least-12-characters"

# Domain
NEXT_PUBLIC_SITE_URL="https://shivshaktiindustries.org"
```

Admin sessions are disabled unless `ADMIN_SECRET_KEY` is configured with at
least 32 characters. Do not use the example values; set private, unique secrets
in your deployment environment. `ADMIN_INITIAL_PASSWORD` is only used when
initializing a new local JSON-backed admin-user store. Existing admin accounts
are preserved and should have their passwords rotated through the password
reset flow if they used a previous default.

The application supports local JSON persistence and an optional MySQL/MariaDB
connection. The customer directory uses local JSON storage when MySQL is not
configured. Before enabling MySQL customer storage, inspect the target database
and apply `migrations/001_create_customers.sql`. Its paired `.down.sql` rollback
drops the customer table and should only be used after a verified backup.

The admin Sales & Revenue register uses local JSON storage when MySQL is not
configured. Before enabling MySQL sales storage, inspect the target database
and apply `migrations/002_create_sales.sql`. Revenue metrics count only sales
marked Paid; pending and overdue amounts are reported separately, and canceled
records are excluded from sales counts.

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🔒 Security & Protection Architecture

* **OWASP Compliance:** All incoming user input in `/api/contact` and `/api/rfq` is validated and escaped using entity encoding before rendering into HTML emails to block stored & reflected XSS.
* **CAD Upload Protection:** File uploads are restricted to 15MB and whitelisted to safe engineering drawing formats (`.step`, `.stp`, `.iges`, `.igs`, `.dwg`, `.dxf`, `.pdf`, `.zip`, `.rar`). All filenames are sanitized against path traversal.
* **Rate Limiting:** Built-in sliding-window rate limiting protects `/api/contact`, `/api/rfq`, and `/api/products` against automated spam, credential stuffing, and DoS attempts.
* **HTTP Security Headers:** Configured with HSTS, X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy, and Permissions-Policy.
* **Admin Guard:** Route `/admin` is protected via `middleware.ts`.

---

## 🌐 Technical SEO & Metadata

* **Dynamic XML Sitemap:** Automatically generated at `/sitemap.xml` with priority hierarchy.
* **Search Engine Crawlers:** Managed via `/robots.txt` protecting administrative and API endpoints.
* **Structured Data:** Enriched Schema.org JSON-LD graph (`ManufacturingPlant`, `LocalBusiness`, and `WebSite`) with geo-coordinates, ISO 9001:2015 details, and offer catalogs.
* **Canonical & OpenGraph:** Canonical URLs and social preview cards defined across all pages.

---

## 🩺 System Health Monitoring

Uptime monitoring services can ping the dedicated health endpoint:
```text
GET /api/health
```
Returns HTTP 200 with server status, timestamp, and process uptime.

---

## 📄 License
Copyright © 2026 SHIV SHAKTI INDUSTRIES. All Rights Reserved.
"# shivshaktiindustries" 

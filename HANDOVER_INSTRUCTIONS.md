# SHIV SHAKTI INDUSTRIES — TECHNICAL HANDOVER & HOSTING GUIDE

**Platform:** Shiv Shakti Industries Precision CNC & VMC Manufacturing Website  
**Technology:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, MySQL/MariaDB  
**Domain:** `https://shivshaktiindustries.org`  

---

## 1. Hosting Environment & Deployment Options

The website is production-ready and can be hosted on standard cloud platforms:

### Option A: Vercel / Netlify (Recommended for Speed & Global CDN)
1. Import the Git repository into [Vercel](https://vercel.com).
2. Set the framework preset to **Next.js**.
3. Add the required Environment Variables in **Project Settings → Environment Variables** (see Section 2).
4. Click **Deploy**. Vercel will build and launch with automatic SSL certificates.

### Option B: Node.js VPS / cPanel (Hostinger, DigitalOcean, AWS EC2, Ubuntu)
1. Ensure Node.js 18.18+ or Node.js 20+ is installed:
   ```bash
   node -v
   npm -v
   ```
2. Clone repository and install dependencies:
   ```bash
   npm install
   ```
3. Create a production build:
   ```bash
   npm run build
   ```
4. Start with PM2 process manager:
   ```bash
   pm2 start npm --name "shivshakti-web" -- start
   pm2 save
   pm2 startup
   ```
5. Configure Nginx reverse proxy to forward port 80/443 to `http://127.0.0.1:3000`.

---

## 2. Environment Variables Specification

The system uses `.env.local` for development and production environment variables.  
A clean template is provided in [`.env.example`](file:///c:/cnc-machining-demo/.env.example).

| Variable Name | Purpose & Description | Required in Production |
| :--- | :--- | :--- |
| **`DB_HOST`** | Hostname of MySQL server (e.g. `localhost`, `127.0.0.1`, or RDS endpoint) | **Yes** (or runs in persistent local store) |
| **`DB_PORT`** | MySQL Port (default: `3306`) | Optional (defaults to 3306) |
| **`DB_USER`** | MySQL username (e.g. `shivshakti_user`) | **Yes** |
| **`DB_PASSWORD`** | MySQL user password | **Yes** |
| **`DB_NAME`** | Database name (e.g. `shivshakti_db`) | **Yes** |
| **`ADMIN_SECRET_KEY`** | Secret key for signing admin session tokens (min 32 random characters) | **Yes (Critical)** |
| **`SMTP_HOST`** | SMTP server hostname (e.g. `smtp-relay.brevo.com` or `smtp.gmail.com`) | **Yes** (for live email dispatch) |
| **`SMTP_PORT`** | SMTP port (typically `587` for TLS or `465` for SSL) | **Yes** |
| **`SMTP_SECURE`** | Set to `false` for port 587, or `true` for port 465 | **Yes** |
| **`SMTP_USER`** | SMTP login account username | **Yes** |
| **`SMTP_PASS`** | SMTP API key or App Password | **Yes** |
| **`SMTP_RFQ_EMAIL`** | Target inbox for RFQs (Default: `rfq@shivshaktiindustries.org`) | Optional (defaults provided) |
| **`SMTP_INFO_EMAIL`** | Target inbox for general inquiries (Default: `info@shivshaktiindustries.org`) | Optional (defaults provided) |
| **`NEXT_PUBLIC_SITE_URL`**| Canonical URL (Default: `https://shivshaktiindustries.org`) | **Yes** |

---

## 3. Database Initial Setup (MySQL / MariaDB)

If using MySQL/MariaDB:
1. Log in to MySQL as root:
   ```bash
   mysql -u root -p
   ```
2. Create database and dedicated user:
   ```sql
   CREATE DATABASE shivshakti_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'shivshakti_user'@'localhost' IDENTIFIED BY 'SetStrongPasswordHere2026!';
   GRANT ALL PRIVILEGES ON shivshakti_db.* TO 'shivshakti_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
3. Import the tables:
   ```bash
   mysql -u shivshakti_user -p shivshakti_db < scripts/schema.sql
   ```
4. Put the credentials into `.env.local`. When the website starts, it automatically connects to live MySQL!

> **Zero-Downtime Fallback Feature:** If MySQL is temporarily offline or credentials are not yet entered, the platform automatically switches to its built-in local persistent store in `data/store/`. The website and admin panel never crash.

---

## 4. Domain & DNS Handover Configuration

For **`shivshaktiindustries.org`**, configure the following DNS records with your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):

| Type | Name / Host | Target Value | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | Server IPv4 Address (e.g., Vercel `76.76.21.21` or your VPS IP) | Automatic |
| **CNAME** | `www` | `shivshaktiindustries.org` | Automatic |
| **TXT** | `@` | SPF email verification: `v=spf1 include:spf.brevo.com ~all` | Automatic |
| **MX** | `@` | Your mail provider MX records | Priority 10 |

---

## 5. Client Account & Password Handover

- **Private Owner Portal URL:** `https://shivshaktiindustries.org/owner-access-7x9k` *(The public URL `/admin` intentionally returns HTTP 404 to all unauthenticated visitors)*
- **Initial Username:** `admin` (or `admin@shivshaktiindustries.com`)
- **Initial Password:** `Admin@ShivShakti2026!`
- **Password Reset:** If the client ever forgets their password, they can click "Forgot password?" on the login page, enter their email address, and receive a secure 60-minute password reset link. Alternatively, a developer can run:
  ```bash
  node -e "require('./lib/db').updateAdminPassword(1, 'NewClientPasswordHere!')"
  ```

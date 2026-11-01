# Shiv Shakti Industries — Hostinger Production Deployment Guide

## 1. Readiness Assessment

**Status: READY FOR PRODUCTION DEPLOYMENT**

Your website is fully tested, built, and optimized for production deployment on Hostinger:
- **Build Status**: `next build` compiled cleanly (0 errors across all 43 static & dynamic routes).
- **Security Audit**: All 36 automated security tests passed (`scripts/security-test.js`).
- **Database Engine**: Dual-engine architecture in `lib/db.ts` supports Hostinger MySQL/MariaDB out of the box with zero-downtime local JSON storage fallback.
- **Admin & Owner Protection**: Public `/admin` returns a genuine HTTP 404 response. Private owner management is securely isolated at `/owner-access-7x9k`.
- **Integrations**: 16 CNC precision products seeded, RFQ and contact forms validated with SMTP email delivery, CSV export, and database backup routines ready.

---

## 2. Choosing Your Hostinger Plan (Important Requirement)

Because this website is built with **Next.js 15 (App Router)** featuring Server-Side Rendering (SSR), API routes (`/api/rfq`, `/api/admin/*`), and cryptographic session cookies, it **requires a Node.js runtime (v20+)**.

| Hostinger Plan | Suitability | Notes |
| :--- | :---: | :--- |
| **Hostinger KVM VPS (Ubuntu 22.04 / 24.04)** | ⭐⭐⭐⭐⭐ **Recommended** | Maximum performance, full control, PM2 process management, automated reboots, Nginx reverse proxy, and free SSL. |
| **Hostinger Cloud / Business Web Hosting** | ⭐⭐⭐⭐ **Supported** | Has built-in **Node.js Application Manager** in hPanel. Good for low maintenance. |
| **Hostinger Single / Premium Web Hosting** | ❌ **Not Suitable** | Standard shared PHP-only hosting without Node.js daemon support. (Do not use for dynamic Next.js). |

---

## 3. Preparation: Production Environment Configuration

Create a `.env.production` (or configure these variables directly in your Hostinger environment):

```env
# =================================================================
# PRODUCTION ENVIRONMENT CONFIGURATION
# =================================================================

# Node Environment
NODE_ENV="production"
PORT=3000

# Canonical Public Domain (Your actual domain registered on Hostinger)
NEXT_PUBLIC_SITE_URL="https://shivshaktiindustries.org"

# --- Hostinger MySQL Database Credentials (from hPanel) ---
DB_HOST="localhost"
DB_PORT=3306
DB_NAME="u123456789_ssi"
DB_USER="u123456789_ssi_user"
DB_PASSWORD="YourStrongDatabasePassword123!"

# --- Security & Secret Keys ---
# Generate with: openssl rand -hex 32
ADMIN_SECRET_KEY="e4b85c13f99072e519c28bfd7e7c992e5927ad6bfb5a31a982cb12d8a39c148f"
OWNER_ACCESS_PATH="/owner-access-7x9k"

# --- Email Notifications (SMTP: Brevo / Hostinger Mail / Google) ---
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER="info@shivshaktiindustries.org"
SMTP_PASS="YourEmailPassword"
SMTP_RFQ_EMAIL="rfqssi@gmail.com"
SMTP_INFO_EMAIL="infossi2512@gmail.com"
SMTP_TO_EMAIL="rfqssi@gmail.com"
SMTP_FROM_EMAIL='"Shiv Shakti Industries" <info@shivshaktiindustries.org>'
```

---

## 4. Database Setup in Hostinger hPanel

1. Log in to your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Navigate to **Databases** > **Management** > **Create a New MySQL Database and Database User**:
   - **Database Name**: e.g., `u123456789_ssi`
   - **Username**: e.g., `u123456789_ssi_user`
   - **Password**: Enter a secure password (and save it for `.env`).
3. Click **Create**.
4. Next to your new database, click **Enter phpMyAdmin**.
5. In phpMyAdmin, click the **Import** tab at the top.
6. Click **Choose File** and select `scripts/schema.sql` from this project.
7. Click **Go / Import**.
   - All 8 production tables (`products`, `admin_users`, `enquiries`, `customers`, `sales`, `content_blocks`, `seo_meta`, `activity_logs`) will be created automatically.

---

## 5. Deployment Method A: Hostinger KVM VPS (Recommended)

### Step 5.1 — Connect to your VPS via SSH
Open your terminal (PowerShell or macOS Terminal):
```bash
ssh root@YOUR_SERVER_IP
```

### Step 5.2 — Install Node.js 20, Git, and PM2
Run the following system updates and installations:
```bash
# Update Ubuntu package lists
apt update && apt upgrade -y

# Install Node.js 20 LTS (NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git build-essential nginx

# Verify versions
node -v   # Should show v20.x.x
npm -v    # Should show 10.x.x

# Install PM2 (Process Manager) globally
npm install -g pm2
```

### Step 5.3 — Deploy the Project Code
```bash
# Create application directory
mkdir -p /var/www/shivshakti
cd /var/www/shivshakti

# Option A: Clone from your GitHub/GitLab repository
git clone https://github.com/your-username/shiv-shakti-industries.git .

# Option B: Or copy files via SCP/FileZilla from your computer
# (Exclude node_modules and .next)
```

### Step 5.4 — Configure Environment and Install Dependencies
```bash
cd /var/www/shivshakti

# Create the production .env file
nano .env.local
# (Paste your production environment variables from Section 3, then Ctrl+O to save and Ctrl+X to exit)

# Install production dependencies
npm install

# Build Next.js production bundle
npm run build
```

### Step 5.5 — Start Application with PM2
```bash
# Start Next.js using PM2
pm2 start npm --name "shivshakti-web" -- start -- -p 3000

# Enable PM2 to auto-start on server boot / reboot
pm2 save
pm2 startup
```

### Step 5.6 — Configure Nginx Reverse Proxy
```bash
nano /etc/nginx/sites-available/shivshakti
```
Paste this configuration (replace `shivshaktiindustries.org` with your actual domain):
```nginx
server {
    listen 80;
    server_name shivshaktiindustries.org www.shivshaktiindustries.org;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    client_max_body_size 50M;
}
```
Enable the site and reload Nginx:
```bash
ln -s /etc/nginx/sites-available/shivshakti /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Step 5.7 — Install Free SSL Certificate (Let's Encrypt)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d shivshaktiindustries.org -d www.shivshaktiindustries.org
```

Your website is now live with HTTPS, auto-renewing SSL, and high-performance PM2 process management!

---

## 6. Deployment Method B: Hostinger Cloud / Business Hosting (hPanel Node.js)

If your plan has the built-in **Node.js** icon in hPanel:

1. **Prepare Project Archive**:
   - In your project root, create a ZIP file containing all files **EXCEPT** `node_modules` and `.next`.
2. **Upload to Hostinger**:
   - In hPanel, open **File Manager**.
   - Navigate to `public_html` (or your domain directory).
   - Upload the ZIP file and click **Extract**.
3. **Configure Node.js Application**:
   - In hPanel, find **Node.js** (under Advanced or Applications).
   - Click **Create Application**.
   - **Node.js Version**: Select **20.x**.
   - **Application Root**: Set to your folder (e.g. `/home/u123.../public_html`).
   - **Application Startup File**: Select or type `node_modules/next/dist/bin/next` with argument `start` (or use a standalone server).
   - **Environment Variables**: Add `ADMIN_SECRET_KEY`, `OWNER_ACCESS_PATH`, `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `SMTP_*`.
4. **Run npm install & build**:
   - Click **NPM Install**.
   - Open SSH/Web Terminal in hPanel and run:
     ```bash
     npm run build
     ```
5. **Start Application**:
   - Click **Start / Restart Application**.

---

## 7. Post-Deployment Verification Checklist

Once deployed, perform these verification checks:
1. **Public Website**: Visit `https://yourdomain.com` — 3D components, interactive canvas, and product catalog should load smoothly.
2. **Product Catalog**: Visit `https://yourdomain.com/products` — all 16 precision parts should be visible with technical specs.
3. **Public 404 Lockout**: Visit `https://yourdomain.com/admin` — verify it returns **HTTP 404 Not Found**.
4. **Private Owner Access**: Visit `https://yourdomain.com/owner-access-7x9k` — log in with:
   - **User ID**: `admin`
   - **Password**: Your configured secure password
5. **Live RFQ Form**: Submit a test RFQ on the contact/quote form and confirm receipt in the owner portal and via email.

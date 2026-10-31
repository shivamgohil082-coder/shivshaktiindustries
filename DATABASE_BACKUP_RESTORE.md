# SHIV SHAKTI INDUSTRIES — DATABASE BACKUP & RESTORE DOCUMENTATION

This document describes the backup and recovery procedures for the **Shiv Shakti Industries** web platform.

---

## 1. Automated & Dashboard Backup (Recommended)

### Method A: One-Click Web Download
Administrators can download complete database backups directly from the Admin Dashboard:
1. Navigate to **`https://shivshaktiindustries.org/admin/settings`**.
2. Under **Database Backup & Recovery**, click:
   - **"Download SQL Dump"** — Generates a `.sql` script with `INSERT INTO products` and `INSERT INTO enquiries`.
   - **"Download JSON Backup"** — Generates a complete structured `.json` snapshot of all products, inquiries, and content.

### Method B: Automated Command-Line Script
Run the automated backup script from the terminal or schedule it via Cron:
```bash
node scripts/backup.js
```
- **Output:** Backups are saved with timestamp names into the `./backups/` directory:
  - `./backups/backup-shivshakti_db-YYYY-MM-DD-HH-MM-SS.sql`
  - `./backups/snapshot-YYYY-MM-DD-HH-MM-SS.json`

---

## 2. Recovery & Restore Procedures

### Method A: Restoring with the Node Script
To restore your database from a previous backup:
```bash
node scripts/restore.js backups/snapshot-2026-10-31T12-00-00.json
```
or for MySQL SQL dumps:
```bash
node scripts/restore.js backups/backup-shivshakti_db-2026-10-31T12-00-00.sql
```

### Method B: Restoring via phpMyAdmin (cPanel / Web Hosting)
1. Log in to your hosting cPanel or Plesk panel.
2. Open **phpMyAdmin**.
3. Select your database: `shivshakti_db`.
4. Click the **"Import"** tab in the top navigation bar.
5. Click **"Choose File"** and select your `.sql` backup file (or `scripts/schema.sql`).
6. Click **"Go"** at the bottom of the page.
7. phpMyAdmin will execute all table creations and records restorations.

### Method C: Restoring via MySQL Terminal
```bash
mysql -h localhost -u shivshakti_user -p shivshakti_db < backups/backup-filename.sql
```

---

## 3. Database Schema Reference

The full DDL schema is maintained in [`scripts/schema.sql`](file:///c:/cnc-machining-demo/scripts/schema.sql).

### Key Tables & Structure:
- **`admin_users`**: Admin credentials, PBKDF2 password hashes, and 1-hour password reset tokens.
- **`products`**: Precision components, micro-tolerances, material grades, processes, dimensions, and image paths.
- **`enquiries`**: RFQ quote submissions, customer contact info, message bodies, CAD attachments, and pipeline status (`New`, `Pending`, `Contacted`, `Completed`).
- **`content_blocks`**: Editable homepage marketing headlines, company story, and quality statements.
- **`seo_meta`**: Page-level meta titles, descriptions, and keywords for search engines.
- **`activity_logs`**: Audit trail of administrative operations.

---

## 4. Automated Backup Scheduling (Cron Job Setup)

To run automated daily backups at 02:00 AM on a Linux server or VPS:
```bash
crontab -e
```
Add the following line:
```cron
0 2 * * * cd /var/www/shivshakti && /usr/bin/node scripts/backup.js >> /var/log/ssi-backup.log 2>&1
```

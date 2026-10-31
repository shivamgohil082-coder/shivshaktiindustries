/**
 * Automated Database Backup Script for Shiv Shakti Industries
 * Usage: node scripts/backup.js
 * Supports MySQL live dump (if mysqldump/mysql2 is configured) or JSON persistent snapshot.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const BACKUP_DIR = path.join(process.cwd(), 'backups');
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

// Read environment
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME;

console.log('--- Shiv Shakti Industries Database Backup Utility ---');
console.log('Timestamp:', timestamp);

if (dbHost && dbUser && dbName) {
  console.log(`Connecting to MySQL database "${dbName}" on ${dbHost}...`);
  const sqlDumpFile = path.join(BACKUP_DIR, `backup-${dbName}-${timestamp}.sql`);
  const passArg = dbPass ? `-p"${dbPass}"` : '';
  const cmd = `mysqldump -h ${dbHost} -u ${dbUser} ${passArg} ${dbName} > "${sqlDumpFile}"`;

  exec(cmd, (err) => {
    if (err) {
      console.warn('mysqldump binary not in PATH or failed. Falling back to structured data snapshot.');
      createJsonSnapshot();
    } else {
      console.log(`✓ MySQL database backup completed successfully: ${sqlDumpFile}`);
    }
  });
} else {
  console.log('MySQL credentials not configured in environment. Creating structured snapshot...');
  createJsonSnapshot();
}

function createJsonSnapshot() {
  const storeDir = path.join(process.cwd(), 'data', 'store');
  const backupFile = path.join(BACKUP_DIR, `snapshot-${timestamp}.json`);

  const snapshot = {
    timestamp: new Date().toISOString(),
    stores: {},
  };

  if (fs.existsSync(storeDir)) {
    const files = fs.readdirSync(storeDir);
    files.forEach((f) => {
      try {
        const content = fs.readFileSync(path.join(storeDir, f), 'utf8');
        snapshot.stores[f] = JSON.parse(content);
      } catch (e) {}
    });
  }

  fs.writeFileSync(backupFile, JSON.stringify(snapshot, null, 2), 'utf8');
  console.log(`✓ Database snapshot created: ${backupFile}`);
}

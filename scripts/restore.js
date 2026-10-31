/**
 * Database Restore & Recovery Script for Shiv Shakti Industries
 * Usage: node scripts/restore.js [path-to-backup-file]
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

const targetFile = process.argv[2];

if (!targetFile) {
  console.error('Error: Please specify the backup file to restore.');
  console.log('Usage: node scripts/restore.js backups/backup-filename.sql (or .json)');
  process.exit(1);
}

const resolvedPath = path.resolve(process.cwd(), targetFile);

if (!fs.existsSync(resolvedPath)) {
  console.error(`Error: Backup file not found at "${resolvedPath}"`);
  process.exit(1);
}

console.log(`Starting recovery from: ${resolvedPath}`);

if (resolvedPath.endsWith('.sql')) {
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbUser = process.env.DB_USER || 'root';
  const dbPass = process.env.DB_PASSWORD ? `-p"${process.env.DB_PASSWORD}"` : '';
  const dbName = process.env.DB_NAME || 'shivshakti_db';

  const cmd = `mysql -h ${dbHost} -u ${dbUser} ${dbPass} ${dbName} < "${resolvedPath}"`;
  console.log(`Executing SQL restore to database ${dbName}...`);
  exec(cmd, (err) => {
    if (err) {
      console.error('MySQL restore failed:', err.message);
      process.exit(1);
    }
    console.log('✓ MySQL Database successfully restored.');
  });
} else if (resolvedPath.endsWith('.json')) {
  try {
    const raw = fs.readFileSync(resolvedPath, 'utf8');
    const data = JSON.parse(raw);

    const storeDir = path.join(process.cwd(), 'data', 'store');
    if (!fs.existsSync(storeDir)) {
      fs.mkdirSync(storeDir, { recursive: true });
    }

    if (data.stores) {
      Object.entries(data.stores).forEach(([fileName, content]) => {
        fs.writeFileSync(path.join(storeDir, fileName), JSON.stringify(content, null, 2), 'utf8');
        console.log(`Restored ${fileName}`);
      });
      console.log('✓ Persistent store restored successfully from JSON snapshot.');
    } else {
      console.error('Unrecognized JSON backup format.');
    }
  } catch (err) {
    console.error('JSON recovery failed:', err);
  }
}

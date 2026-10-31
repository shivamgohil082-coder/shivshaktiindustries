const fs = require('fs');
const path = require('path');

function ensureTree(srcDir) {
  if (!fs.existsSync(srcDir)) return;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(srcDir, entry.name);
    if (entry.isDirectory()) {
      const rel = path.relative('app', full);
      fs.mkdirSync(path.join('.next', 'server', 'app', rel), { recursive: true });
      fs.mkdirSync(path.join('.next', 'types', 'app', rel), { recursive: true });
      fs.mkdirSync(path.join('.next', 'static', 'chunks', 'app', rel), { recursive: true });
      ensureTree(full);
    }
  }
}

fs.mkdirSync(path.join('.next', 'server', 'app'), { recursive: true });
fs.mkdirSync(path.join('.next', 'types', 'app'), { recursive: true });
fs.mkdirSync(path.join('.next', 'static', 'chunks', 'app'), { recursive: true });
fs.mkdirSync(path.join('.next', 'static', 'css'), { recursive: true });
ensureTree('app');
console.log('Build directories prepared successfully.');

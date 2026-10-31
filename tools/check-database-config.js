const fs = require('fs');

let hasDb = false;
let dbHost = '';
let dbName = '';

if (fs.existsSync('.env.local')) {
  for (const line of fs.readFileSync('.env.local', 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('DATABASE_URL=')) {
      hasDb = true;
      const val = trimmed.slice('DATABASE_URL='.length).trim().replace(/^["']|["']$/g, '');
      try {
        const u = new URL(val);
        dbHost = u.host;
        dbName = u.pathname.replace(/^\//, '');
      } catch {
        dbHost = '(unparseable)';
      }
    }
  }
}

console.log('DATABASE_URL present:', hasDb);
console.log('Database Host:', dbHost || '(none)');
console.log('Database Name:', dbName || '(none)');


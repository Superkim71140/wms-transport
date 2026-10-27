const fs = require('fs');
const content = fs.readFileSync('src/app/(marketing)/blog/posts.ts', 'utf8');
const lines = content.split('\n');
const slugs = [];
lines.forEach((line, idx) => {
  const m = line.match(/^\s*["']([a-z0-9-]+)["']:\s*\{/);
  if (m) {
    slugs.push({ slug: m[1], line: idx + 1 });
  }
});
console.log(JSON.stringify(slugs, null, 2));

const http = require('http');

function checkUrl(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ path, statusCode: res.statusCode, body: data });
      });
    }).on('error', (err) => {
      resolve({ path, statusCode: 500, error: err.message });
    });
  });
}

async function run() {
  console.log("Checking Homepage & Article URLs...");
  const paths = [
    '/',
    '/blog',
    '/blog/how-to-request-quote-checklist',
    '/blog/what-can-box-truck-carry',
    '/blog/moving-condo-thonburi-elevator-parking',
    '/blog/moving-house-nongkhaem-phetkasem-access',
    '/blog/factory-cargo-delivery-mahachai-checklist',
    '/blog/cargo-scheduling-krathumbaen-omnoi',
    '/blog/first-time-dorm-moving-packing-guide',
    '/blog/prepare-motorcycle-transport',
    '/blog/hire-truck-with-helpers-vs-diy',
    '/blog/what-determines-moving-cost-factors',
  ];

  for (const p of paths) {
    const res = await checkUrl(p);
    let extra = '';
    if (p === '/') {
      const hasArticles = res.body.includes('id="articles"') && res.body.includes("บทความแนะนำ");
      const hasGallery = res.body.includes("ตัวอย่างงานขนย้ายจริงของ");
      extra = ` | Articles: ${hasArticles} | Gallery: ${hasGallery}`;
    } else if (p.startsWith('/blog/')) {
      const hasDirectAnswer = res.body.includes("คำตอบสรุปตรงประเด็น");
      const hasChecklist = res.body.includes("เช็กลิสต์สำคัญสำหรับคุณ");
      extra = ` | DirectAnswer: ${hasDirectAnswer} | Checklist: ${hasChecklist}`;
    }
    console.log(`${p.padEnd(46)} | Status: ${res.statusCode}${extra}`);
  }
}

run();

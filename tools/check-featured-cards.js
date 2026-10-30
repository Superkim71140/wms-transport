const https = require('https');

const urls = [
  // PRIORITY 10
  '/areas/samutsakhon/maha-chai',
  '/areas/krathumbaen-omnoi/krathum-baen',
  '/areas/bkk-thonburi/nong-khaem',
  '/areas/bkk-thonburi/bang-khae',
  '/areas/maha-chai/ban-phaeo',
  '/areas/krathumbaen-omnoi/om-noi',
  '/areas/bkk-thonburi/bang-bon',
  '/areas/rama2-bangkradi/rama-2',
  '/areas/phutthamonthon-sai-1-4/salaya',
  '/areas/phutthamonthon-sai-1-4/sam-phran',
  // ALL_AREA_CARDS
  '/service/samutsakhon',
  '/service/bkk-thonburi',
  '/service/bangkok',
  '/service/bkk-phra-nakhon',
  '/service/samut-songkhram',
  '/service/chonburi',
  '/service/phuket',
  '/service/chiang-mai',
  // STRATEGIC ZONES
  '/areas/maha-chai',
  '/areas/krathumbaen-omnoi',
  '/areas/rama2-bangkradi',
  '/areas/bangbon-ekachai',
  '/areas/nongkhaem-phetkasem81',
  '/areas/bang-khae',
  '/areas/phutthamonthon-sai-1-4'
];

async function checkAll() {
  for (const u of urls) {
    await new Promise(r => {
      https.get('https://wms-transport.com' + u, (res) => {
        let body = '';
        res.on('data', c => { if (body.length < 50000) body += c; });
        res.on('end', () => {
          const canonMatch = body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
          const robotsMatch = body.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
          console.log(u.padEnd(42), 'Status:', res.statusCode, 'Canon:', (canonMatch ? canonMatch[1] : 'NONE'), 'Robots:', (robotsMatch ? robotsMatch[1] : 'NONE'));
          r();
        });
      }).on('error', e => { console.log(u, 'ERR:', e.message); r(); });
    });
  }
}
checkAll();


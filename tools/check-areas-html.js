const https = require('https');

https.get('https://wms-transport.com/areas', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('HTML length:', html.length);
    // Find all href links in HTML
    const hrefs = [...html.matchAll(/href=["'](\/[^"']+)["']/g)].map(m => m[1]);
    const uniqueHrefs = [...new Set(hrefs)];
    console.log('Total unique hrefs on /areas:', uniqueHrefs.length);
    const areaHrefs = uniqueHrefs.filter(h => h.startsWith('/areas'));
    console.log('Area hrefs count:', areaHrefs.length);
    console.log('Sample area hrefs:', areaHrefs.slice(0, 15));
    
    // Check if Priority 10 area links are present in raw HTML:
    const priority10 = [
      '/areas/samutsakhon/maha-chai',
      '/areas/krathumbaen-omnoi/krathum-baen',
      '/areas/bkk-thonburi/nong-khaem',
      '/areas/bkk-thonburi/bang-khae',
      '/areas/maha-chai/ban-phaeo',
      '/areas/krathumbaen-omnoi/om-noi',
      '/areas/bkk-thonburi/bang-bon',
      '/areas/rama2-bangkradi/rama-2',
      '/areas/phutthamonthon-sai-1-4/salaya',
      '/areas/phutthamonthon-sai-1-4/sam-phran'
    ];
    const missingP10 = priority10.filter(p => !uniqueHrefs.includes(p));
    console.log('Missing Priority 10 in raw HTML:', missingP10);

    // Check 7 zones
    const zones = [
      '/areas/maha-chai',
      '/areas/krathumbaen-omnoi',
      '/areas/rama2-bangkradi',
      '/areas/bangbon-ekachai',
      '/areas/nongkhaem-phetkasem81',
      '/areas/bang-khae',
      '/areas/phutthamonthon-sai-1-4'
    ];
    const missingZones = zones.filter(z => !uniqueHrefs.includes(z));
    console.log('Missing Zones in raw HTML:', missingZones);
  });
});


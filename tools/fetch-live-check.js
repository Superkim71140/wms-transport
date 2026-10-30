async function check() {
  const urls = [
    'https://wms-transport.com/areas/bang-khae',
    'https://wms-transport.com/areas/bkk-thonburi/bang-khae',
    'https://wms-transport.com/service/samutsakhon/freight',
    'https://wms-transport.com/service/phuket/motorcycle',
    'https://wms-transport.com/sitemap.xml'
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const text = await res.text();
      const titleMatch = text.match(/<title>([^<]+)<\/title>/);
      const h1Match = text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const canonicalMatch = text.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
      console.log('--- ' + u + ' ---');
      console.log('Status:', res.status);
      if (titleMatch) console.log('Title:', titleMatch[1]);
      if (h1Match) console.log('H1:', h1Match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
      if (canonicalMatch) console.log('Canonical:', canonicalMatch[1]);
      if (u.includes('sitemap.xml')) {
        const count = (text.match(/<loc>/g) || []).length;
        const lastmodCount = (text.match(/<lastmod>/g) || []).length;
        const sampleLastmods = text.match(/<lastmod>([^<]+)<\/lastmod>/g)?.slice(0, 5);
        console.log('Total URLs in live sitemap:', count);
        console.log('Total lastmod tags:', lastmodCount);
        console.log('Sample lastmods:', sampleLastmods);
      }
    } catch(e) {
      console.log('Error fetching', u, e.message);
    }
  }
}
check();

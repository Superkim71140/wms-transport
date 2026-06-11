async function validateSitemap() {
  const sitemapUrl = 'http://localhost:3000/sitemap.xml';
  console.log(`Fetching sitemap from ${sitemapUrl}...`);

  try {
    const res = await fetch(sitemapUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
    }

    const xml = await res.text();
    console.log('Sitemap fetched successfully. Parsing XML using regex...');

    // Regex to extract all <loc> values
    const locRegex = /<loc>(.*?)<\/loc>/g;
    const urls = [];
    let match;
    while ((match = locRegex.exec(xml)) !== null) {
      urls.push(match[1].trim());
    }

    console.log(`Found ${urls.length} URLs in the sitemap.`);

    if (urls.length === 0) {
      throw new Error('Sitemap is empty or no <loc> elements were found.');
    }

    const seen = new Set();
    let errorsCount = 0;

    const logError = (msg) => {
      console.error(`[ERROR] ${msg}`);
      errorsCount++;
    };

    urls.forEach((urlStr, index) => {
      // 1. Is parseable as a valid URL
      let url;
      try {
        url = new URL(urlStr);
      } catch (e) {
        logError(`URL at index ${index} is not parseable: "${urlStr}"`);
        return;
      }

      // 2. Starts with https://wms-transport.com
      if (!urlStr.startsWith('https://wms-transport.com')) {
        logError(`URL does not start with https://wms-transport.com: "${urlStr}"`);
      }

      // 3. Contains wms-transport.vercel.app or any vercel.app
      if (urlStr.includes('vercel.app')) {
        logError(`URL contains vercel.app reference: "${urlStr}"`);
      }

      // 4. Contains localhost
      if (urlStr.includes('localhost')) {
        logError(`URL contains localhost reference: "${urlStr}"`);
      }

      // 5. Starts with http://
      if (urlStr.startsWith('http://')) {
        logError(`URL uses HTTP instead of HTTPS: "${urlStr}"`);
      }

      // 6. Contains // after the origin boundary (e.g. https://wms-transport.com//blog)
      const pathname = urlStr.replace('https://wms-transport.com', '');
      if (pathname.includes('//')) {
        logError(`URL contains duplicate slashes after origin: "${urlStr}"`);
      }

      // 7. Contains whitespace
      if (/\s/.test(urlStr)) {
        logError(`URL contains whitespace: "${urlStr}"`);
      }

      // 8. Appears more than once
      if (seen.has(urlStr)) {
        logError(`Duplicate URL found: "${urlStr}"`);
      } else {
        seen.add(urlStr);
      }
    });

    // 9. Confirm homepage exists exactly once
    const homepageCount = urls.filter(u => u === 'https://wms-transport.com').length;
    if (homepageCount !== 1) {
      logError(`Homepage "https://wms-transport.com" exists ${homepageCount} times (expected exactly 1).`);
    }

    // 10. Confirm /service/samut-songkhram exists exactly once
    const samutCount = urls.filter(u => u === 'https://wms-transport.com/service/samut-songkhram').length;
    if (samutCount !== 1) {
      logError(`Province page "/service/samut-songkhram" exists ${samutCount} times (expected exactly 1).`);
    }

    // 11. Confirm blog routes are present
    const blogListingCount = urls.filter(u => u === 'https://wms-transport.com/blog').length;
    if (blogListingCount !== 1) {
      logError(`Blog listing "/blog" exists ${blogListingCount} times (expected exactly 1).`);
    }

    const blogPostCount = urls.filter(u => u.startsWith('https://wms-transport.com/blog/')).length;
    if (blogPostCount === 0) {
      logError('No blog post routes found in sitemap.');
    } else {
      console.log(`Validated ${blogPostCount} blog post URLs.`);
    }

    if (errorsCount > 0) {
      console.error(`\nSitemap validation FAILED with ${errorsCount} error(s).`);
      process.exit(1);
    } else {
      console.log('\nSitemap validation PASSED successfully!');
      process.exit(0);
    }

  } catch (err) {
    console.error(`Sitemap validation encountered a fatal error: ${err.message}`);
    process.exit(1);
  }
}

validateSitemap();

const { getPublishedLocalPoints } = require('./src/data/areaZonesData');
const points = getPublishedLocalPoints();
console.log('Total published points:', points.length);
console.log('Sample preferredUrls:');
points.slice(0, 10).forEach(p => console.log(p.slug, '->', p.preferredUrl, 'action:', p.action));

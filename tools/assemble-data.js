const fs = require('fs');
const path = require('path');

const p1_30 = require('./points-data-1-30.js');
const p31_50 = require('./points-data-31-50.js');
const p51_70 = require('./points-data-51-70.js');

const allPoints = [...p1_30, ...p31_50, ...p51_70];

console.log(`Assembling ${allPoints.length} points...`);

// 1. Read existing ZONE_HUBS from areaZonesData.ts
const existingContent = fs.readFileSync('src/data/areaZonesData.ts', 'utf8');
const zoneHubsMatch = existingContent.match(/export const ZONE_HUBS: Record<string, ZoneHubItem> = (\{[\s\S]*?\n\};\n)/);

if (!zoneHubsMatch) {
  console.error('Could not find ZONE_HUBS in areaZonesData.ts');
  process.exit(1);
}

const zoneHubsStr = zoneHubsMatch[1];

// 2. Generate TypeScript file content
let ts = `export interface LocalPointItem {
  pointId: number;
  zoneSlug: string;
  slug: string;
  thaiName: string;
  disambiguation: string;
  preferredUrl: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  searchIntent: string;
  action: 'new_page' | 'existing_reused';
  status: 'published';
  title: string;
  description: string;
  h1: string;
  directAnswer: string;
  localContext: string;
  verifiedServices: { name: string; desc: string }[];
  pickupGuidance: string[];
  accessAndLoading: {
    parking: string;
    heightClearance: string;
    elevatorOrStairs: string;
  };
  quotationChecklist: string[];
  localFaqs: { question: string; answer: string }[];
  nearbyAreas: { name: string; url: string; relation: string }[];
}

export interface ZoneHubItem {
  zoneNumber: number;
  slug: string;
  name: string;
  thaiName: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  overview: string;
  coveragePointsSummary: string;
  pointIds: number[];
  serviceScope: { title: string; desc: string }[];
  quotationNotes: string[];
  nearbyZones: { slug: string; name: string; reason: string }[];
}

export const ZONE_HUBS: Record<string, ZoneHubItem> = ${zoneHubsStr}

export const LOCAL_POINTS: Record<number, LocalPointItem> = {
`;

for (const p of allPoints) {
  ts += `  ${p.pointId}: ${JSON.stringify(p, null, 2).split('\n').map((l, i) => i === 0 ? l : '  ' + l).join('\n')},\n`;
}

ts += `};

export function getAllZoneHubs(): ZoneHubItem[] {
  return Object.values(ZONE_HUBS);
}

export function getZoneHub(slug: string): ZoneHubItem | undefined {
  return ZONE_HUBS[slug];
}

export function getAllLocalPoints(): LocalPointItem[] {
  return Object.values(LOCAL_POINTS);
}

export function getLocalPoint(pointId: number): LocalPointItem | undefined {
  return LOCAL_POINTS[pointId];
}

export function getLocalPointBySlug(zoneSlug: string, slug: string): LocalPointItem | undefined {
  return Object.values(LOCAL_POINTS).find(
    (p) => p.zoneSlug === zoneSlug && p.slug === slug
  );
}

export function getPublishedLocalPoints(): LocalPointItem[] {
  return Object.values(LOCAL_POINTS).filter((p) => p.status === 'published');
}

export function getPointsForZone(zoneSlug: string): LocalPointItem[] {
  return Object.values(LOCAL_POINTS).filter((p) => p.zoneSlug === zoneSlug);
}
`;

fs.writeFileSync('src/data/areaZonesData.ts', ts, 'utf8');
console.log('Successfully written src/data/areaZonesData.ts');

// 3. Generate keyword-map.csv
// CSV Columns: Point ID, Zone, Locality, Preferred URL, Primary Keyword, Supporting Keywords, Search Intent, Action, Publication Status
const csvHeader = 'Point ID,Zone,Locality,Preferred URL,Primary Keyword,Supporting Keywords,Search Intent,Action,Publication Status\n';
const csvRows = allPoints.map(p => {
  const supporting = `"${p.supportingKeywords.join('; ')}"`;
  const intent = `"${p.searchIntent.replace(/"/g, '""')}"`;
  const locality = `"${p.thaiName} (${p.disambiguation})"`;
  return `${p.pointId},${p.zoneSlug},${locality},${p.preferredUrl},"${p.primaryKeyword}",${supporting},${intent},${p.action},${p.status}`;
});

const csvContent = csvHeader + csvRows.join('\n') + '\n';
fs.writeFileSync('keyword-map.csv', csvContent, 'utf8');
fs.writeFileSync('docs/keyword-map.csv', csvContent, 'utf8');
console.log('Successfully written keyword-map.csv');

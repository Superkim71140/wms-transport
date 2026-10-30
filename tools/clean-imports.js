const fs = require('fs');
let wes = fs.readFileSync('src/components/WorkEvidenceSummary.tsx', 'utf8');
wes = wes.replace('ArrowRight, CheckCircle2, ShieldCheck', 'ArrowRight, ShieldCheck');
fs.writeFileSync('src/components/WorkEvidenceSummary.tsx', wes, 'utf8');

let dpv = fs.readFileSync('src/components/service-area/DistrictPageView.tsx', 'utf8');
dpv = dpv.replace(/import Image from ["']next\/image["'];\r?\n/, '');
fs.writeFileSync('src/components/service-area/DistrictPageView.tsx', dpv, 'utf8');
console.log('Cleaned up unused imports successfully');


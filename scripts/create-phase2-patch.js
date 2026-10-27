import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const files = [
  "src/components/QuotationPreparationGuide.tsx",
  "src/app/(marketing)/pricing/page.tsx",
  "src/app/(marketing)/pricing/moving/page.tsx",
  "src/app/(marketing)/service/[province]/[serviceId]/page.tsx",
  "src/components/InContentCTA.tsx",
  "src/app/(marketing)/service/phuket/motorcycle/page.tsx",
  "src/app/(marketing)/service/phuket/moving/page.tsx",
  "src/app/(marketing)/pricing/motorcycle-2026/page.tsx",
  "src/app/(marketing)/guides/[slug]/page.tsx",
  "src/app/(marketing)/portfolio/[slug]/page.tsx",
  "src/data/guidesData.ts"
];

try {
  const quoted = files.map(f => `"${f}"`).join(" ");
  const diffOutput = execSync(`git diff ${quoted}`, { encoding: "utf8" });
  fs.writeFileSync("PHASE2-CHANGES.patch", diffOutput, "utf8");
  console.log(`Successfully generated PHASE2-CHANGES.patch (${diffOutput.length} characters)`);
} catch (err) {
  console.error("Failed to generate patch:", err);
  process.exit(1);
}

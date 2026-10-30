# WMS TRANSPORT — Phase 2 SEO and AEO Expansion
## English implementation prompt for Antigravity IDE

Prepared October 29, 2026. Domain: https://wms-transport.com
This is a continuation of WMS-Antigravity-SEO-Prompt-EN.md, not a replacement for completed Phase 1 work.

ROLE
Act as a senior Next.js engineer, technical SEO specialist, Thai content strategist, and UX designer. Inspect the current working tree and implement supported changes. Do not stop after producing recommendations.

LANGUAGE
Instructions and technical reports may be English. All public website copy must remain accurate, natural Thai. Keep existing Thai place names and URL slugs. Explain final results to the owner in Thai.

SCOPE AND COUNTS
This specification contains exactly:
- G01–G10: 10 additional SEO/AEO initiatives.
- D01–D20: 20 additional geographic intent-differentiation groups beyond the original Bang Khae pair.
- C01–C20: 20 detailed service/location content improvements.
- L01–L20: 20 additional internal-link improvements.
- E01–E20: 20 verifiable work-evidence improvements.
Total: 90 actionable items. These are not 90 new pages. Existing URLs should be improved where they already own the intent. A parent hub may appear in several groups; improve that hub once and connect its relevant children.

CURRENT-STATE RULES
- Read current files, git status, existing Phase 1 reports, and applicable AGENTS.md before editing.
- Do not assume Phase 1 has been implemented just because its prompt exists.
- If a requirement is already satisfied, mark it verified with evidence rather than rewriting it.
- Historical baseline: the supplied GSC screenshot updated October 23 showed 26 indexed / 54 non-indexed pages. A separate sitemap snapshot contained 155 URLs. These are not equivalent scopes or dates.
- Every URL below appeared in that sitemap snapshot. Verify that it still exists, returns meaningful content, and is intended for indexing.
- Do not invent a missing route or redirect a URL merely because it appears in this plan.
- Service-area groups are operational navigation, not assertions of municipal boundaries or physical branches.
- Preserve current useful URLs and indexed content. Do not mass-delete, mass-noindex, or create cross-product location pages.
- The outcome sought is more useful, eligible pages and qualified visits. Indexing, first-page rankings, featured snippets, and AI citations cannot be guaranteed.
- Keep local implementation and previews separate from production deployment. Do not deploy or change account settings automatically.

REQUIRED SKILLS
Discover and read actual installed SKILL.md files:
1. claude-seo/skills/seo plus relevant seo-audit, seo-plan, seo-page, seo-content, seo-content-brief, seo-cluster, seo-local, seo-programmatic, seo-technical, seo-sitemap, seo-schema, seo-images, seo-geo, seo-sxo, and seo-google when authorized credentials exist.
2. Ponytail from DietrichGebert/ponytail: typically .agent/skills/ponytail, ponytail-audit, and ponytail-review, or the actual ponytail/skills checkout.
3. ui-ux-pro-max-skill-main/.claude/skills/ui-ux-pro-max, or the actual installed equivalent.

The user's "/ponytail.git/skills" reference identifies the intended collection; do not treat it as a verified absolute path.
If slash commands are registered, use the documented commands. Otherwise execute the workflows by reading the files directly. Record what was actually read and used.

Use Ponytail full: reuse existing code, smallest complete implementation, no speculative CMS or new dependencies. Audit and review phases are read-only; implementation follows the authorized task.
UI UX Pro Max must be adapted to the actual Next.js website. Ignore React Native-specific stack assumptions in the supplied skill copy. Use its relevant accessibility, responsive layout, typography, directory, form, and card guidance.
Skill word-count, uniqueness-percentage, and link-count thresholds are internal heuristics, not Google ranking requirements.
This work improves an existing large location inventory. It does not authorize manufacturing hundreds of new location pages to satisfy a count.

REUSE EXISTING FOUNDATIONS
Inspect these before adding new equivalents:
- src/data/searchIntentMap.ts
- src/data/areaZonesData.ts
- src/data/districtLandingPages.ts
- src/data/AnswerSurfaceData.ts
- src/data/vehicleCapacity.ts
- src/data/mediaEvidence.ts
- src/data/reviewEvidence.ts
- src/data/guidesData.ts
- src/data/approvedRouteCorridors.ts
- src/data/pricingPolicy.ts
- src/components/DecisionAnswerSurface.tsx
- src/components/CargoFitPlanner.tsx
- src/components/TransitTimeVisualizer.tsx
- src/components/service-area/ZoneHubView.tsx
- src/components/service-area/LocalPointView.tsx
- src/components/service-area/DistrictPageView.tsx
- src/components/service-area/ServiceAreaNearbyLinks.tsx
- src/components/service-area/ServiceAreaRelatedServices.tsx
- src/components/service-area/ServiceAreaRouteTable.tsx
- src/components/service-area/ServiceAreaQuoteForm.tsx
- Existing metadata/entity/schema helpers, route generation, sitemap, robots, and validation scripts.
Account for explicit Phuket service-route overrides as well as generic dynamic pages.

AEO GUARDRAILS
Use current official Google guidance, not outdated optimization myths.
Readable answers, useful comparisons, source-backed facts, and a crawlable site are the intended improvements. Do not promise that a specific answer length or "AI schema" produces citations.
Google's current guidance says special AI text files such as llms.txt are not needed for visibility in Google Search. Do not prioritize them as a Google ranking tactic.
Check current official guidance on generative-AI eligibility and applicable Search Console controls; do not assume access or claim an account setting has been checked without evidence.
Google's documentation update log says FAQ rich results have been retired. Plain-language FAQs can remain useful, but do not sell FAQPage markup as an extra search-result feature.
Do not misuse QAPage for company-written FAQs. Do not add unsupported Review/AggregateRating data.
Respect deliberate privacy/snippet restrictions. Identify accidental restrictions; do not remove intentional ones without understanding their purpose.
Keep public information complete and consistent. Do not give bots different answers from users.

## G — 10 additional SEO/AEO initiatives

### G01. Build a query-to-page opportunity list
Use an authorized GSC export to group non-brand queries by intent and destination. Prioritize pages with relevant impressions and opportunities to improve their answer, title, or customer journey; observed positions around 8–20 can be a review filter, not a promise of easy gains. Compare equal date windows and device/country segments.
Deliverable: query, landing page, customer need, baseline impressions/clicks/position, proposed change, and measurement window.
If GSC is unavailable, provide an empty import template and label hypotheses. Never invent metrics.

### G02. Add useful direct answers through the existing answer component
Reuse DecisionAnswerSurface.tsx and AnswerSurfaceData.ts. Lead with a short Thai answer to the page's actual customer question, followed immediately by conditions, preparation, and relevant evidence. Answer length should fit the question; do not impose a supposed Google word-count rule.
Example question: "ย้ายคอนโดไม่มีลิฟต์ ต้องแจ้งข้อมูลอะไรบ้าง?"
QA: the answer must be visible text, match the service policy, and remain understandable without reading the CTA.

### G03. Turn existing comparison pages into decision tools
Improve /compare/moving-alone-vs-helpers, /compare/one-vehicle-vs-multiple-trips, and /compare/pickup-vs-box-truck with comparison rows for job suitability, handling effort, weather exposure, access constraints, and quote inputs.
Clarify which vehicle types WMS actually offers; a comparison does not establish inventory.
Use real criteria and explicit uncertainties instead of asserting WMS is always best. Link each recommendation to its relevant service, guide, or pricing page.
QA: each option has honest limitations and no unsupported rates.

### G04. Resolve contradictory vehicle facts before reusing them
In the supplied vehicleCapacity.ts snapshot, payloadCapacityKg is 1800 while a limitations string mentions 2200 kg. This is a factual inconsistency requiring owner/manufacturer/vehicle-document verification, not an invitation to select either value.
Trace every rendered use, calculator, answer block, and schema consumer. Distinguish cargo payload, gross vehicle weight, internal cargo height, external clearance, door opening, and usable volume.
Deliverable: one supported value/source per fact or an explicitly unresolved field. Do not publish a numeric loading recommendation until resolved.

### G05. Make the existing cargo planner genuinely useful
Improve CargoFitPlanner rather than creating a second calculator. Accept item dimensions, quantity, and weight when known; explain that volume alone cannot prove fit or safe payload. Handle door-opening dimensions, orientation restrictions, and loading arrangement where verified data exists.
Keep output in component state rather than generating indexable result URLs for every input combination.
QA: unit conversion, zero/negative values, missing weights, and implausible dimensions are handled; outputs are estimates, not guaranteed load plans or invented prices.

### G06. Publish original operational observations when sufficient evidence exists
Use anonymized verified jobs to explain patterns customers can act on: which missing details most often require a revised quotation, or which access checks prevent repeat trips.
If the sample is too small, publish a clearly bounded case-based observation rather than a statistic.
Deliverable: source set, date range, selection method, limitations, and useful takeaway. Never extrapolate "most customers" or fabricate percentages. This can enrich an existing guide before becoming a separate article.

### G07. Explain genuine service boundaries and exception handling
On appropriate service/pricing pages, publish verified answers about appointment availability, prohibited cargo, packaging responsibility, recipient absence, waiting time, and changes after booking.
Use a named policy owner or review process only if real. Keep policy details consistent across all locations.
QA: every operational promise has a source; hypothetical examples are labeled; actual exceptions are not presented as universal terms.

### G08. Add real demonstration media with accessible explanations
When authorized original footage exists, embed a short demonstration of preparation, loading, securing, or handover with Thai captions and an accurate transcript.
Place it on the most relevant existing guide or case page. Do not create empty video pages solely to increase URL count. Use appropriate video metadata only when all required information is verified.
QA: footage is real, the transcript matches it, privacy is protected, and lazy-loading preserves useful visible text and page performance.

### G09. Strengthen business identity and genuine external references
Reconcile the website's business name, phone, actual address, hours, service coverage, and official profiles against owner-approved information. Use existing siteConfig and entity IDs.
Identify legitimate partner or association references only where a real relationship exists. Prepare recommendations rather than posting or contacting anyone without authorization.
QA: no fake branches, invented memberships, paid link schemes, or review incentives; do not imply local-pack visibility is identical to organic web-page ranking.

### G10. Measure outcomes without inventing an AEO score
Track page-level impressions, clicks, relevant query coverage, qualified phone/LINE actions where permitted, and indexing status separately.
Keep a small dated manual log of observed AI citations with query, locale, surface, cited URL, and observation time. Do not treat one observation as a stable ranking or assume a separate GSC AI filter exists.
Compare suitable before/after windows, noting seasonality and deployment dates. Report correlation rather than asserting causation from a small change.
QA: actual data source and limitations accompany every metric.

## D — 20 additional geographic differentiation groups

These are existing URL pairs/groups to audit and improve beyond the original Bang Khae example. They are not instructions to create 40 new pages.
The first URL is generally a directory/overview; the second owns a specific local decision. Both can remain self-canonical only when independently useful.
If current content already fulfills the distinction, mark verified and implement only remaining gaps.
Do not manufacture a physical branch or change administrative geography to match navigation groups.

For EVERY D item deliver:
- Current role and overlap evidence.
- Intended primary question, Thai title/H1, outline, and boundary with adjacent pages.
- Specific facts needed and source status.
- Useful content changes, contextual links in both directions, and matching breadcrumbs.
- Current/final status, canonical, sitemap eligibility, and rendered-HTML check.
- Outcome: verified-existing, differentiated-existing, pending-facts, or consolidation-proposal. A proposal must identify its effect on current indexed URLs.

### D01. Maha Chai directory versus Maha Chai service booking
A: /areas/maha-chai
B: /areas/samutsakhon/maha-chai
A organizes supported subareas and helps customers locate pickup guidance. B explains accepted jobs, quotation inputs, verified local examples, and booking steps.
Unique question for B: "What information is needed to quote this specific pickup/delivery job in Maha Chai?"
Require actual operating coverage and supported job evidence. Keep the province-wide overview on /service/samutsakhon.

### D02. Nong Khaem zone versus Nong Khaem district service
A: /areas/nongkhaem-phetkasem81
B: /areas/bkk-thonburi/nong-khaem
A lets users choose the relevant alley/corridor. B explains the local service decision, handling requirements, and quotation workflow.
Differentiate service coverage from neighborhood access guidance. Use the district page for booking intent and the zone page for finding specific local instructions.

### D03. Bang Bon–Ekkachai zone versus Bang Bon district service
A: /areas/bangbon-ekachai
B: /areas/bkk-thonburi/bang-bon
A is the browseable directory of supported local points. B owns the broad Bang Bon service proposition and job assessment.
Do not copy a full price/FAQ/service block into both. Explain which customer should use the directory versus request a quotation.

### D04. Krathum Baen–Om Noi zone versus Krathum Baen local page
A: /areas/krathumbaen-omnoi
B: /areas/krathumbaen-omnoi/krathum-baen
A supports selecting a local destination. B focuses on a confirmed Krathum Baen job's access and receiving requirements, with customer-supplied site details.
Potential unique questions: loading appointment, delivery entrance, cargo list, and contact at the receiving location. Do not assert universal factory rules.

### D05. Krathum Baen–Om Noi zone versus Om Noi
A: /areas/krathumbaen-omnoi
B: /areas/krathumbaen-omnoi/om-noi
Reuse A's directory changes from D04. B provides Om Noi-specific verified receiving/access information, not the Krathum Baen page with a replaced name.
Require a meaningful difference in pickup guidance, customer task, or supported evidence. If none exists yet, record the gap instead of fabricating local detail.

### D06. Rama 2–Bang Kradi zone versus Rama 2 corridor
A: /areas/rama2-bangkradi
B: /areas/rama2-bangkradi/rama-2
A organizes the broader service grouping. B helps customers identify the precise pickup point on a long corridor: pin, side/access entrance, safe loading position, and building/site contact.
Do not invent current roadworks, legal restrictions, or travel times. Link to confirmed adjacent local pages rather than stuffing place names.

### D07. Rama 2–Bang Kradi zone versus Bang Kradi
A: /areas/rama2-bangkradi
B: /areas/rama2-bangkradi/bang-kradi
A remains the zone directory. B addresses the specific site's loading entrance, receiving appointment, and item/vehicle suitability where supported.
Avoid claiming that every customer is a factory or that every entrance accepts the same vehicle. Show what customers must confirm.

### D08. Phutthamonthon grouping versus Sai 1
A: /areas/phutthamonthon-sai-1-4
B: /areas/phutthamonthon-sai-1-4/phutthamonthon-sai-1
A supports selecting the road/locality. B explains how to specify the exact Sai 1 pickup point, alley, entrance, and vehicle-to-door distance using verified information.
Distinguish the corridor from the site's Bang Khae service landing. Do not duplicate its generic booking pitch.

### D09. Phutthamonthon grouping versus Sai 2
A: /areas/phutthamonthon-sai-1-4
B: /areas/phutthamonthon-sai-1-4/phutthamonthon-sai-2
Use B for confirmed local access and pickup coordination, such as asking customers to supply gate, frontage, and loading-position photos when relevant.
Require source-backed local detail or a truly distinct customer task. A renamed Sai 1 paragraph does not qualify.

### D10. Phutthamonthon grouping versus Sai 3
A: /areas/phutthamonthon-sai-1-4
B: /areas/phutthamonthon-sai-1-4/phutthamonthon-sai-3
Separate the directory role from B's actual receiving/loading guidance.
If handling shops or business premises is a verified customer pattern, explain appointment and item-list requirements. Otherwise use supported neutral guidance; do not invent a local industry profile.

### D11. Phutthamonthon grouping versus Sai 4
A: /areas/phutthamonthon-sai-1-4
B: /areas/phutthamonthon-sai-1-4/phutthamonthon-sai-4
B should clarify the exact site and pickup/drop-off arrangements, including customer-supplied access details at both ends.
Do not present nearby place names as proof that all properties are served or that the company has a branch here. Avoid fixed timing promises.

### D12. Phutthamonthon grouping versus Salaya
A: /areas/phutthamonthon-sai-1-4
B: /areas/phutthamonthon-sai-1-4/salaya
A is an operational directory, not a statement that Salaya belongs administratively to the same district as every sibling.
B can address accommodation/condo preparation if actual service information supports it: parking, stair/elevator access, inventory, and appointment coordination.
Use a real case only when it is actually from the area.

### D13. Phutthamonthon grouping versus Sam Phran
A: /areas/phutthamonthon-sai-1-4
B: /areas/phutthamonthon-sai-1-4/sam-phran
B owns practical information for supported Sam Phran jobs and their actual pickup/delivery constraints.
Explain service coverage honestly and require the precise location for quotation. Do not reuse Salaya's accommodation story as a local fact.

### D14. Maha Chai grouping versus Ban Phaeo
A: /areas/maha-chai
B: /areas/maha-chai/ban-phaeo
Review the grouping label because Ban Phaeo and Mueang Samut Sakhon are different districts. Existing URL grouping must not misstate administrative boundaries.
A may describe a broader operational service grouping accurately. B addresses Ban Phaeo pickups with verified coverage, entrance/turning constraints when relevant, and receiving coordination.
Keep the existing slug unless a well-supported migration plan justifies changing it.

### D15. Maha Chai grouping versus Phanthai Norasing
A: /areas/maha-chai
B: /areas/maha-chai/phanthai-norasing
B answers the local customer's preparation questions: exact project/building, gate entry, loading position, item list, and appointment.
Ground any claimed local capability or example in actual evidence. Do not copy a province-wide sales page into this URL.

### D16. Maha Chai grouping versus Khok Kham
A: /areas/maha-chai
B: /areas/maha-chai/khok-kham
B should own supported Khok Kham pickup guidance and job-fit questions. Request precise address/pin privately rather than publish customer addresses.
Differentiate from D15 through verified site information and relevant cases, not synonym replacement. If evidence is absent, list specific required facts.

### D17. Nong Khaem zone versus Phetkasem 81
A: /areas/nongkhaem-phetkasem81
B: /areas/nongkhaem-phetkasem81/phetkasem-81
A compares local areas. B helps customers identify the correct entrance, sub-alley, parking point, and carrying distance for an actual job.
If local examples exist, use their verified constraints; do not imply every sub-alley has the same access conditions.

### D18. Bang Bon–Ekkachai zone versus Ekkachai corridor
A: /areas/bangbon-ekachai
B: /areas/bangbon-ekachai/ekkachai
A serves navigation. B explains how to provide a precise point on the corridor and the site's actual loading/receiving arrangements.
Avoid turning corridor coverage into an unverified municipality or branch claim. Use cross-links only to truly relevant neighboring routes.

### D19. Bang Bon–Ekkachai grouping versus Sampheng 2
A: /areas/bangbon-ekachai
B: /areas/bangbon-ekachai/sampheng-2
B can help a verified shop/business customer provide unit/entrance, cargo/package count, and receiving window.
Check the actual geography and site rules before naming districts, gates, or permitted loading times. The directory's grouping is not proof of administrative location.

### D20. Thonburi service overview versus Pinklao local service
A: /service/bkk-thonburi
B: /areas/bkk-thonburi/pinklao
A helps users choose a service and supported area across Thonburi. B explains verified Pinklao service arrangements and quotation inputs.
Pinklao is a neighborhood/corridor designation, not a license to invent an administrative district or local branch.
Keep the motorcycle portfolio case separate as evidence of one job, not a duplicate service page.

## C — 20 additional service/location content improvements

These are new, specific content modules or decision aids on existing service pages, extending Phase 1's general differentiation. Do not create a page per module.
Each item requires a useful Thai question/answer, the actual operational policy, a source status, and a customer next step.
A module may be omitted from public rendering when essential facts are unavailable; implement supported portions and record the precise gap.
Do not prescribe vehicle payload, handling techniques, or property rules beyond verified information.

### C01. Bangkok moving: two-endpoint elevator and access worksheet
Target: /service/bangkok/moving
Add a compact origin/destination checklist: elevator availability, permitted moving window, entrance clearance, loading position, and distance to the lift.
Separate internal cargo height from the vehicle's total external height. Ask customers to send building restrictions rather than claiming universal dimensions.
Output: a readable preparation section and existing quotation-form fields only where genuinely useful.
Check: no automatic “vehicle fits” verdict without verified vehicle and building data.

### C02. Thonburi moving: alley-to-door handling assessment
Target: /service/bkk-thonburi/moving
Explain which photos help assess the entrance, turns, parking point, steps, and distance between vehicle and property.
Separate vehicle access from the manual carrying task. A vehicle unable to reach the door does not automatically mean a job is impossible or free to carry.
Output: labeled example requirements using real/clearly illustrative diagrams or existing media.
Check: actual helper and access policies support the wording; no invented neighborhood-wide restrictions.

### C03. Phra Nakhon moving: coordination with two property managers
Target: /service/bkk-phra-nakhon/moving
Create an appointment preparation sequence covering permission at origin and destination, lift reservations, a contact person, and what happens if one end is not ready.
Use actual rescheduling/waiting policy where verified; otherwise ask customers to confirm arrangements during quotation.
Output: a two-column coordination checklist.
Check: it does not assert that every building has the same deposit, moving hours, or access rules.

### C04. Samut Sakhon moving: staged townhouse inventory
Target: /service/samutsakhon/moving
Add a floor-by-floor item-list method, separating items that need dismantling, heavy items, fragile objects, and boxes.
Explain which details determine helpers, handling sequence, and possible trips without promising a fixed vehicle count.
Output: a copyable Thai inventory example labeled hypothetical, not a completed customer job.
Check: no fabricated item weights, guaranteed packing inclusion, or unsupported dismantling services.

### C05. Samut Songkhram moving: access suitability before booking
Target: /service/samut-songkhram/moving
Ask for actual entrance width, overhead obstacles, turning/parking space, and any bridge/access information supplied by the customer where applicable.
Describe the process for reviewing access, not a claim that all roads have these constraints.
Output: a “send these photos before confirming the vehicle” module.
Check: no improvised legal load ratings or claims of alternative vehicles the business does not offer.

### C06. Chonburi moving: synchronize pickup and move-in appointments
Target: /service/chonburi/moving
Explain how customers should coordinate work schedules, property handover, lift booking, recipient availability, and the list of items.
Distinguish an agreed appointment window from a guaranteed journey duration.
Output: a preparation timeline relative to the agreed moving date, based on real business procedures.
Check: do not invent daily service availability, same-day guarantees, or property-specific rules.

### C07. Phuket moving: interprovincial inventory and handover plan
Target: /service/phuket/moving
Add an origin-to-destination inventory and contact checklist: item counts, packing responsibility, pickup contact, receiving contact, and changes that require reconfirmation.
Distinguish estimated scheduling from guaranteed delivery.
Output: a long-distance preparation module grounded in actual supported routes.
Check: inspect the explicit Phuket route implementation; do not assume a generic-template edit reaches it.

### C08. Chiang Mai moving: destination readiness and contingency questions
Target: /service/chiang-mai/moving
Explain what customers should confirm if the recipient, keys, loading area, or building access may not be ready.
Publish waiting, storage, cancellation, or redelivery terms only when the business has supplied them.
Output: a destination-readiness checklist and questions to settle before booking.
Check: do not silently introduce storage service, free waiting, or guaranteed fallback arrangements.

### C09. Bangkok motorcycle transport: modified-bike dimensions
Target: /service/bangkok/motorcycle
Ask for model, approximate actual dimensions, accessories, panniers, handlebar width, ground clearance, and whether the bike can roll.
Explain why photos of modifications affect suitability and equipment planning.
Output: an intake checklist with “confirm with the operator” conditions.
Check: no unsupported universal fit statement or instruction to dismantle customer equipment without a real procedure.

### C10. Phuket motorcycle transport: compare preparation by motorcycle type
Target: /service/phuket/motorcycle
Compare the information needed for a standard motorcycle, scooter, and larger motorcycle: dimensions, mass when known, accessories, mobility, and receiving arrangements.
Only describe ramps, wheel supports, and straps actually used and suitable for the vehicle.
Output: a factual comparison table and preparation sequence.
Check: no invented equipment specifications, prices, insurance limits, or arbitrary class-based guarantees.

### C11. Chiang Mai motorcycle transport: condition record and key handover
Target: /service/chiang-mai/motorcycle
Describe the actual intake/handover documentation process: visible condition, accessories, keys, authorized recipient, and acknowledgment.
Use anonymized source-backed examples only; otherwise a labeled blank checklist.
Output: a clear explanation of what the customer and operator each confirm.
Check: do not imply that documenting condition substitutes for insurance or changes liability terms.

### C12. Samut Sakhon motorcycle transport: electric-bike eligibility questions
Target: /service/samutsakhon/motorcycle
Add questions about vehicle type, battery condition, modifications, mobility, and known damage only if the business accepts or assesses electric motorcycles.
The operator must verify transport eligibility and current applicable requirements. Do not declare every battery-powered vehicle accepted.
Output: a bounded eligibility enquiry section, or an internal evidence gap if the policy is unknown.
Check: no improvised battery disassembly, discharge, or hazardous-material instructions.

### C13. Chonburi motorcycle transport: non-running vehicle assessment
Target: /service/chonburi/motorcycle
Differentiate engine-not-starting from locked wheels, steering problems, collision damage, or leakage; these may require different equipment or rejection.
Ask what the operator needs to assess the job, without promising recovery or towing.
Output: an actual acceptance checklist tied to verified capabilities.
Check: no claim that all damaged/non-running vehicles can be loaded.

### C14. Samut Songkhram motorcycle transport: pickup meeting-point options
Target: /service/samut-songkhram/motorcycle
Explain how an accessible, safe meeting point can be agreed when the exact property entrance is unsuitable, if this is actually offered.
Clarify who confirms the location and what changes the quotation.
Output: a simple decision sequence: property pickup assessment → agreed alternative if supported → confirmation.
Check: no fixed depot, public-road loading promise, or invented pickup station.

### C15. Samut Sakhon freight: volume, weight, and loading-equipment distinction
Target: /service/samutsakhon/freight
Explain separately package count, outside dimensions, total mass, stackability, pallets, and available loading equipment.
Make clear that cubic volume does not prove safe payload or pallet compatibility.
Output: a structured enquiry table and verified examples.
Check: resolve the 1800/2200 kg inconsistency before using either value; do not imply forklift loading is available at every site.

### C16. Chonburi freight: factory entry and receiving-document checklist
Target: /service/chonburi/freight
Ask customers to confirm appointment reference, entrance, receiving contact, required driver/vehicle information, and proof-of-delivery expectations.
Present each as site-dependent, not a universal industrial-estate rule.
Output: a customer-to-operator checklist using verified company procedures.
Check: keep real IDs, security instructions, and private access documents out of public HTML/assets.

### C17. Bangkok freight: multiple-stop quotation logic
Target: /service/bangkok/freight
Explain why stop sequence, package allocation, loading order, waiting windows, and recipient readiness affect planning.
Provide a labeled hypothetical stop-list example without invented prices or travel-time estimates.
Output: a copyable multi-stop information template.
Check: no automatic cheapest-route claim; actual multiple-stop availability and charging policy must be verified.

### C18. Phra Nakhon freight: receiving-window and access confirmation
Target: /service/bkk-phra-nakhon/freight
Create a checklist for shops/offices to confirm loading access, service entrance, lift rules, receiving times, and whom to contact on arrival.
Distinguish building policies from public traffic restrictions; verify any legal claim before publishing it.
Output: site-specific coordination guidance.
Check: no generalized truck-entry law, unrestricted parking promise, or assumption that delivery can occur at any hour.

### C19. Phuket freight: packaging responsibility and destination receipt
Target: /service/phuket/freight
Describe the actual responsibilities for package preparation, labeling, loading, protection, and destination acknowledgment.
Explain how customers should disclose fragile, moisture-sensitive, high-value, or otherwise restricted cargo.
Output: “customer prepares / operator confirms / recipient checks” table.
Check: no blanket waterproof or damage-free guarantee; do not imply specialized climate-controlled transport unless real.

### C20. Chiang Mai freight: reconcile quantities and receiving exceptions
Target: /service/chiang-mai/freight
Explain how package counts and recipient details are recorded, what a delivery exception means, and how to ask about returning pallets/packaging if offered.
Use real process information instead of fabricated delivery statistics.
Output: a handover and exception checklist.
Check: no free-return, storage, or redelivery promise without verified terms.

## L — 20 additional internal-link improvements

These proposals extend Phase 1's link matrix. Audit existing edges first; if an edge already exists naturally, verify it rather than duplicating it.
Every link must help a user take a sensible next step. Do not force a location-specific link into nationally relevant content without context.

Global checks:
- Use real <a href> links rendered by Next Link where appropriate.
- Both source and target must exist and have content appropriate to the proposed relationship.
- Resolve any Phase 1 intent-owner or redirect decision before finalizing targets.
- Use natural Thai anchors, visible contextual placement, and no internal UTM parameters.
- Do not promote unsupported cases, draft pages, or temporary previews.
- Avoid giant all-to-all link blocks and exact-match anchor repetition.
- Record source, target, anchor, placement, relationship, evidence dependency, and final validation result.
- Reused parent hubs should receive one coherent update, not one duplicated section per task.

### L01. Homepage → cargo-capacity guide
Source: /
Target: /guides/truck-capacity-cbm
Anchor idea: "เช็กขนาดของก่อนเลือกรถ"
Placement: near the service-selection or quotation-preparation content.
Reason: help customers establish what information is needed before contacting the business.
Dependency: the guide and planner must not use unresolved vehicle-weight claims.

### L02. Krathum Baen–Om Noi hub → cargo scheduling guide
Source: /areas/krathumbaen-omnoi
Target: /blog/cargo-scheduling-krathumbaen-omnoi
Anchor: "เตรียมนัดหมายโหลดสินค้าในโซนกระทุ่มแบน–อ้อมน้อย"
Placement: the hub's preparation section, not inside every area card.
Reason: connect geographic selection to useful preparation without duplicating the article.

### L03. Cargo scheduling article → Samut Sakhon freight service
Source: /blog/cargo-scheduling-krathumbaen-omnoi
Target: /service/samutsakhon/freight
Anchor: "ส่งรายละเอียดเพื่อประเมินงานขนส่งสินค้า"
Placement: after the actual appointment checklist.
Reason: provide a commercial next step after the informational answer.
Check: the service genuinely covers the locations discussed.

### L04. Rama 2 zone hub → relevant freight service
Source: /areas/rama2-bangkradi
Candidate target: /service/samutsakhon/freight
Anchor: "บริการขนส่งสินค้าเชื่อมต่อสมุทรสาคร"
Placement: only in a section genuinely discussing that supported connection.
Reason: allow a relevant cross-area service journey.
If the relationship is unsupported, choose the verified matching service or mark pending; do not force this edge.

### L05. Nong Khaem zone → local moving-access article
Source: /areas/nongkhaem-phetkasem81
Target: /blog/moving-house-nongkhaem-phetkasem-access
Anchor: "เตรียมทางเข้าและจุดจอดก่อนย้ายบ้านย่านหนองแขม"
Placement: access/preparation summary.
Reason: keep detailed preparation in its owner article instead of copying it into the directory.

### L06. Nong Khaem moving-access article → district service
Source: /blog/moving-house-nongkhaem-phetkasem-access
Target: /areas/bkk-thonburi/nong-khaem
Anchor: "ประเมินงานรถรับจ้างในหนองแขม"
Placement: after the customer has the required access information.
Reason: link preparation to the matching local transaction.

### L07. Bang Bon service → matching townhouse case
Source: /areas/bkk-thonburi/bang-bon
Target: /portfolio/moving-townhouse-bang-bon
Anchor: "ดูตัวอย่างงานย้ายทาวน์โฮมบางบอน"
Placement: evidence module.
Dependency: verify the case's source and publication permission before using it as proof.
Do not substitute a generic photo if the case cannot be supported.

### L08. Bang Bon townhouse case → one trip versus multiple trips comparison
Source: /portfolio/moving-townhouse-bang-bon
Target: /compare/one-vehicle-vs-multiple-trips
Anchor: "ประเมินจำนวนเที่ยวจากรายการของอย่างไร"
Placement: after the case's inventory/planning explanation.
Reason: generalize the decision without pretending the actual case used a particular number of trips unless documented.

### L09. Bangkok moving → no-elevator guide
Source: /service/bangkok/moving
Target: /guides/condo-no-elevator
Anchor: "เตรียมข้อมูลขนย้ายอาคารไม่มีลิฟต์"
Placement: immediately after the floor/elevator quotation inputs.
Reason: let customers understand handling factors before submitting a quote.

### L10. Chonburi moving → moving-house checklist
Source: /service/chonburi/moving
Target: /blog/moving-house-checklist
Anchor: "เช็กลิสต์เตรียมของก่อนวันย้ายบ้าน"
Placement: the preparation sequence.
Reason: avoid duplicating a full general packing article on a location landing page.

### L11. Phuket motorcycle service → Phuket-to-Bangkok route
Source: /service/phuket/motorcycle
Target: /route/phuket/bangkok
Anchor: "ข้อมูลเส้นทางภูเก็ตไปกรุงเทพฯ"
Placement: supported destination choices.
Dependency: verify the route actually supports this service and direction.
Do not imply a daily timetable or guaranteed duration.

### L12. Bangkok-to-Phuket route → Phuket motorcycle service
Source: /route/bangkok/phuket
Target: /service/phuket/motorcycle
Anchor: "รายละเอียดการขนส่งมอเตอร์ไซค์ที่เกี่ยวข้องกับภูเก็ต"
Placement: its motorcycle-service section, if supported.
Reason: the route page owns origin/destination planning; the service page owns vehicle preparation and acceptance conditions.
Do not duplicate the entire service page on the route.

### L13. Bangkok-to-Chiang Mai route → motorcycle preparation owner
Source: /route/bangkok/chiang-mai
Candidate target: /blog/prepare-motorcycle-transport
Anchor: "เตรียมรถมอเตอร์ไซค์ก่อนส่งต่างจังหวัด"
Placement: the motorcycle preparation section where relevant.
Dependency: resolve overlap with /guides/prep-motorcycle-transport and link to the current intent owner.
Do not create two near-identical preparation destinations.

### L14. Samut Songkhram freight → supported inbound route
Source: /service/samut-songkhram/freight
Target: /route/samutsakhon/samut-songkhram
Anchor: "เส้นทางสมุทรสาครไปสมุทรสงคราม"
Placement: an explicitly inbound-route subsection.
Reason: provide useful directional information without confusing origin and destination.
Check actual freight availability on that route.

### L15. Moving pricing → helpers versus DIY comparison
Source: /pricing/moving
Target: /compare/moving-alone-vs-helpers
Anchor: "เลือกจ้างคนยกหรือเตรียมคนยกเอง"
Placement: the helper-cost factor explanation.
Reason: explain an actual purchasing choice instead of linking only to another sales page.
Do not claim self-handling always reduces total price.

### L16. Freight pricing → cargo-capacity guide
Source: /pricing/freight
Target: /guides/truck-capacity-cbm
Anchor: "คำนวณปริมาตรและเตรียมน้ำหนักสินค้าก่อนขอราคา"
Placement: the cargo-size/weight explanation.
Reason: reduce incomplete enquiries while keeping calculation guidance in its owner page.
Check that volume estimates are not mistaken for payload approval.

### L17. Cargo-capacity guide → trip-count comparison
Source: /guides/truck-capacity-cbm
Target: /compare/one-vehicle-vs-multiple-trips
Anchor: "ของหลายชิ้นควรประเมินจำนวนเที่ยวอย่างไร"
Placement: after the guide explains the limits of volume-only calculations.
Reason: connect measurement to planning while retaining uncertainty about actual loading arrangements.

### L18. Refrigerator packing guide → moving pricing
Source: /blog/how-to-pack-fridge
Target: /pricing/moving
Anchor: "ปัจจัยค่าขนย้ายตู้เย็นและของชิ้นใหญ่"
Placement: after verified handling/preparation guidance.
Reason: a general article should lead to relevant general pricing rather than arbitrarily favor one province.
Do not invent appliance handling rules or guaranteed orientation.

### L19. Rain-preparation guide → vehicle-type comparison
Source: /guides/moving-in-rain
Target: /compare/pickup-vs-box-truck
Anchor: "เปรียบเทียบลักษณะรถสำหรับงานขนย้าย"
Placement: the explanation of vehicle protection and practical limitations.
Reason: help readers evaluate fit without promising waterproof transport or implying every compared vehicle is offered.

### L20. First-time dorm packing guide → helper-choice comparison
Source: /blog/first-time-dorm-moving-packing-guide
Target: /compare/moving-alone-vs-helpers
Anchor: "ประเมินว่าต้องใช้คนช่วยยกหรือไม่"
Placement: the handling/assistance preparation section.
Reason: support the next decision for first-time movers.
QA: anchor and target remain useful even if the customer is outside a priority geographic area.

## E — 20 additional verifiable work-evidence improvements

These are specific evidence records and public presentation improvements, not instructions to fabricate 20 case studies.
Several evidence items may belong to one genuine job. Reuse one job identity rather than pretending it is several customers or locations.
Use existing mediaEvidence, portfolio, and review models where possible. Add only the minimum fields needed for provenance, permission, and truthful rendering.

For every item distinguish:
- What the source actually establishes.
- What it does not establish.
- Whether public use is authorized.
- Which public page or module may use it.
- Which private identifiers must remain internal.
A sourceStatus or isVerified flag alone is not proof.

### E01. Give each genuine job one stable reference
Create or reuse an internal job ID linking its case, media, service, and broad origin/destination.
Publicly show a safe reference only when useful; do not expose booking IDs that reveal private account information.
QA: the same job is not counted as several jobs just because multiple pages mention it.
Output: a minimal relation record connected to existing portfolio data.

### E02. Retain original-media provenance
Record the original media reference, uploader/owner confirmation, and which public derivative was made from it.
A checksum may prevent accidental duplicates but does not prove that a photo depicts a real job or named location.
QA: every newly used “actual work” image can be traced internally to its source; editing/redaction history does not silently change what the image is claimed to show.

### E03. Verify geographic association independently of captions
Confirm broad job locations using an owner-supported job record or another suitable source. Do not derive location solely from filenames, a generic truck photo, or unverified geotags.
QA: public captions and related-area links use only the verified level of detail.
Output: broadArea/sourceStatus mapping; exact customer addresses stay private.

### E04. Preserve date precision
Separate job date, image capture date when trustworthy, publication date, and content modification date.
If only a month is known, display a month; if the date is unknown, omit it rather than assigning one.
QA: a dated photo does not automatically determine a case page's publishedAt or lastmod.
Output: precise date semantics reused by case UI and metadata.

### E05. Document the actual cargo inventory
Use a redacted item list, package tally, or owner-confirmed job record to support what was transported.
Distinguish actual counts from illustrative examples and from estimated customer enquiries.
QA: “15 boxes” or “one motorcycle” appears only when supported; the same manifest is not reused as evidence for another job.
Publicly summarize only information permitted for release.

### E06. Verify internal cargo dimensions with measurements
Use current measurements for the actual vehicle, recording how and when they were taken and what parts of the compartment they describe.
Separate floor length/width, usable internal height, obstructions, and door opening.
QA: diagrams and calculator values refer to the same verified vehicle record; do not assume a generic model specification describes a modified cargo box.

### E07. Verify payload and resolve the conflicting numbers
Obtain appropriate vehicle documentation and owner/operator confirmation to establish what the site's payload field actually means.
Do not infer permissible cargo weight from cargo volume or choose the larger of the conflicting 1800/2200 kg numbers.
QA: public text, calculators, FAQs, and schema use the same supported meaning/value, or withhold the unresolved numeric claim.
Do not publish private vehicle documents unredacted.

### E08. Document external clearance separately
Measure/verify total vehicle height and relevant dimensions independently from internal cargo dimensions.
Present building-clearance assessment as requiring both vehicle and site information.
QA: a 2.1 m internal compartment height is never substituted for overall vehicle height.
Output: a clear explanatory section or diagram using confirmed measurements, without guaranteeing entrance access from one dimension alone.

### E09. Support elevator-access claims with actual job information
For a real condo job, document the freight lift, booking arrangement, and loading connection only to the extent the record supports.
Use anonymized images or process descriptions with permission.
QA: one building's procedure is not described as a rule across all condos or an entire district.
Output: a specific case lesson and a customer checklist framed as what to confirm.

### E10. Support stair and carrying-distance examples
Record actual stairs/floors and carrying conditions when documented, then explain how they influenced the job assessment.
Do not publish a fabricated helper count, handling time, or extra charge.
QA: public examples distinguish documented facts from planning guidance.
Output: a case-backed explanation linked to the no-elevator or helper-choice guide.

### E11. Show packing before/after evidence
Pair authorized media of the same actual item before packing, during preparation, and at handover where available.
Identify which packing service was actually supplied and which preparation the customer performed.
QA: photos from different jobs are not presented as one sequence; the sequence does not imply a universal damage-free guarantee.
Output: an accessible gallery with concise truthful captions.

### E12. Show actual motorcycle securing practices
Use original media of the specific supported equipment and process, verified by the operator.
Explain what is visibly demonstrated and the limits of the example.
QA: do not copy stock diagrams and claim they depict WMS equipment; do not promise every motorcycle uses the same configuration.
Output: a real-case illustration connected to the appropriate motorcycle service page.

### E13. Document cargo enclosure and weather limitations honestly
Use verified photos and actual policy to explain the vehicle's enclosure and preparation for weather.
Differentiate protection features from an absolute waterproof guarantee.
QA: closed doors or a roof photo do not prove all cargo is protected under every condition.
Output: a bounded description supporting the rain guide and relevant service pages.

### E14. Verify handover and receipt
Use an authorized redacted receipt, signed delivery record, or owner-confirmed acknowledgment to support completion.
Keep names, signatures, telephone numbers, and exact addresses private unless expressly approved.
QA: “delivered” is not inferred merely from a loaded-vehicle photo.
Output: a truthful public outcome summary rather than the raw document.

### E15. Publish bounded historical price examples
Only with owner permission, summarize a real quotation or completed-job charge alongside its date, route scope, cargo, helpers, and relevant conditions.
Label it as a historical example, not a current fixed price.
QA: every number matches its source; no omitted conditions make the example misleading.
If permission or supporting detail is absent, explain pricing factors without inventing a price.

### E16. Distinguish actual journey records from forecasts
When authorized records exist, explain a specific job's pickup/arrival timeline at a privacy-safe level.
Record whether times are approximate and what delays/conditions affected that job.
QA: one recorded journey is not converted into a general delivery-time promise or real-time tracking service.
Output: a bounded case timeline, not a universal ETA.

### E17. Include a truthful problem-and-resolution case
When a real event is documented and publication is approved, explain a complication such as access changes, mismatched inventory, or recipient coordination and how it was handled.
Do not invent a success story, blame identifiable customers, or omit a material unresolved outcome.
QA: the lesson is supported and useful; failures are not rewritten as guaranteed success.
Output: a practical case section improving customer preparation.

### E18. Attach review provenance and exact wording
Link each displayed review internally to its actual public source or permission-backed original message.
Verify that the quote is accurate, any shortening is fair, and the public display name is authorized.
QA: no invented stars, customer avatars, testimonials, undisclosed incentives, or AI-generated review text.
Output: source-backed review presentation without unsupported rich-result promises.

### E19. Verify the people behind advice
If advice is attributed to an operator/reviewer, confirm the person's actual role and contribution.
Do not invent expert credentials, committees, years of experience, or certifications. The supplied code's reviewer labels require corroboration like other claims.
QA: the visible byline/review note reflects a real accountable contributor.
Output: a concise factual attribution where useful, not a decorative authority badge.

### E20. Add a small evidence-permission and correction workflow
Track public-use permission, source status, corrections, and withdrawal requests using the existing data structure or a minimal internal registry.
Allow a disputed/unapproved claim or asset to be removed without deleting an otherwise useful service page.
QA: private evidence fields do not enter client bundles/JSON-LD; withdrawn media stops appearing in every consumer.
Output: a documented lightweight update process, not a new CMS or compliance dashboard.

## Execution architecture and editorial rules

### 1. Audit before changing content
Capture current routes, metadata, index policy, sitemap inclusion, content roles, and internal edges.
Read Phase 1 implementation reports if present; verify their claims against code and rendered output.
Treat GSC states as unknown unless actual authorized data is available.
Do not label index/follow or HTTP 200 as “indexed.”

### 2. Separate intent from page count
Build an intent-owner map:
pageUrl, pageType, primaryQuestion, audience, uniqueContribution, supportingFacts, adjacentOwner, currentAction, evidenceStatus.

D items concern geographic directory/local-page boundaries.
C items add useful service-specific information on existing pages.
L items connect related tasks.
E items establish provenance for facts used by the other sections.
G items guide discovery, decision quality, and measurement.
Cross-reference dependencies rather than pretending each item requires an independent new component or URL.

A useful directory may have a concise answer and good navigation. A transactional page must independently explain the service and next step. Do not create an intermediary page whose only function is to funnel a user to the real answer.

Do not require every city page to contain an original case study to remain indexable.
However, do not call an unconfirmed case “verified” or expand unsupported operating claims.
If two pages still answer the same task after review, record a consolidation proposal with current traffic/indexing evidence when available, canonical/redirect mapping, and internal-link consequences. Do not force differentiation by filler text.

### 3. Page template requirements
Reuse existing components and typed records. Add only required optional fields.
For each genuinely differentiated local/service page, render:
- A clear Thai title and H1 appropriate to its role.
- A useful answer or introduction.
- Relevant scope, conditions, and information needed from the customer.
- Specific supporting detail and evidence where available.
- A meaningful next step and contextual links.
- Accurate metadata, self-canonical when appropriate, and consistent breadcrumbs.
- A real content modification date only when supported.

Do not add “SEO keywords,” internal evidence scores, or indexability labels to customer-facing UI.
Keep important content in accessible text, including limitations adjacent to recommendations.
No hidden keyword sections, doorway pages, bot-only answers, or synonym-spun location content.

### 4. Reuse the current quotation flow
Where C items imply new intake questions, first check whether the existing form already captures them.
Avoid adding all 20 modules as mandatory fields. Use a short common form and service-relevant optional questions.
No fake submission success. Test the actual phone/LINE/form handoff.
Do not send customer information into analytics event labels or URLs.
Use progressive disclosure for UX, while keeping informational content discoverable.

### 5. Reconcile facts once
Create a small fact-conflict list with:
fact, competingValues, affectedPages, sourceNeeded, verifiedResolution, consumersUpdated.

Prioritize:
- Internal versus external height.
- Payload versus gross weight.
- Vehicle offerings versus comparison-only options.
- Claimed service areas versus physical branches.
- Price examples versus current pricing policy.
- Actual appointment windows versus estimated travel times.
- Proven cases versus generic imagery.

Use existing siteConfig, vehicleCapacity, pricingPolicy, and entity-graph models.
Do not introduce a second authoritative data source for the same fact.

### 6. Preserve Phase 1 date and indexing safeguards
Keep lastmod tied to substantive page changes, not build/request time.
Do not assign today's date to every page, flatten dates to a release constant, or infer publication from job dates.
A shared component change affects a page date only when that page's significant rendered content actually changed.
Keep route generation, metadata, sitemap, and published-state predicates consistent.
Do not list noindex, redirected, missing, or draft pages in the public sitemap.
Do not turn every draft eligibility flag on to increase the page count.

### 7. UI UX Pro Max application
Use directory cards for hubs, decision content for service pages, and documented sequences for cases.
Preserve brand colors and Thai typography.
At 390px, 768px, and 1440px confirm:
- No horizontal overflow.
- Thai tone marks/vowels are not clipped.
- Touch targets and keyboard focus are usable.
- CTAs do not cover answers, consent notices, or form controls.
- Images have stable dimensions and appropriate sizes.
- Long directories have crawlable grouping/pagination.
- Important evidence does not require an inaccessible carousel.
- Motion respects reduced-motion settings.

A cosmetic redesign alone is not completion of a content-differentiation item.

## Implementation sequence

Batch 1 — Foundation
- Inspect Phase 1 state and existing skills.
- Establish inventory, intent owners, fact conflicts, and evidence provenance.
- Address G04 and any misleading public facts before extending calculators/answer blocks.
- Keep missing-data items explicit, without blocking independent work.

Batch 2 — Geographic differentiation
- Implement D01–D03 as representative zone/district patterns where needed.
- Verify rendered differences and navigation, then apply the appropriate pattern to D04–D20.
- Do not copy unique local facts from representative pages to other areas.
- Reuse shared hub edits instead of repeating them.

Batch 3 — Service-specific content
- Complete C01–C20 wherever facts support publication.
- If a source is missing, finish the reusable UI/data wiring and internal brief; publish only supported content.
- Check Phuket's explicit route implementations.

Batch 4 — Evidence and internal links
- Complete applicable E01–E20 records using genuine available sources.
- Implement L01–L20 when each target/relationship is valid.
- Do not add unverified case links solely to complete the matrix.

Batch 5 — AEO readiness and validation
- Complete applicable G01–G10 without duplicating existing features.
- Validate accessible answers, fact consistency, snippets/controls, structured data, and actual metrics sources.
- Run relevant existing build/lint/tests and focused regression checks.
- Review the final diff with ponytail-review.

Proceed through all supported batches without stopping after the plan. Do not block the whole task on unavailable GSC access, missing photos, or one unresolved business policy. State exact limitations.

## Acceptance tests

### Task accounting
Create one status record for every ID G01–G10, D01–D20, C01–C20, L01–L20, and E01–E20.
Allowed statuses:
verified-existing, implemented, pending-owner-fact, pending-access, not-applicable-with-reason, consolidation-proposal.
Do not mark unimplemented drafts as completed public work.

### Routing and metadata
- Every edited/linked existing URL is verified against the current build.
- Canonical, sitemap, and page index policy agree.
- Unknown slugs do not return generic HTTP 200 placeholders.
- No inadvertent inherited homepage canonicals.
- Existing useful indexed pages are not broadly noindexed without an evidence-based decision.
- Proposed redirects are exact, justified, and do not create loops or chains.

### Content
- Each D group has distinct user tasks when both pages remain.
- Each C module adds actionable detail rather than repeated template filler.
- Location claims are verified or expressed as questions requiring customer confirmation.
- Important answers and their qualifications are readable without interacting with a quote form.
- No unsupported safety, price, timing, insurance, review, or branch claims.

### Links
- Added edges are actual crawlable links with relevant source/target context.
- No unsupported evidence destinations, new broken URLs, or repeated duplicate links.
- Measure minimum click depth from actual links, not path segments.
- Audit orphan status for priority pages.
- Keep a before/after adjacency list or equivalent small report.

### Evidence and data
- Every new public case/review claim has a source and permission status.
- Private source identifiers, customer addresses, signatures, and original chats do not leak.
- Vehicle fact conflicts are resolved from appropriate sources or the unsupported numeric claims remain unpublished.
- The same job/photo is not counted as separate original evidence in multiple areas.
- Corrections/withdrawals propagate to all public consumers.

### Dates
Retain Phase 1 regression coverage:
unchanged rebuild, one-page content change, missing dates, impossible dates, future dates, and copyright-only edits.
No sitewide automatic lastmod refresh.

### UI and functioning
- Build and relevant tests pass, or failures are honestly separated into pre-existing versus new.
- Validate final rendered HTML rather than TypeScript alone.
- Check representative directory, local page, each service type, case, guide, and comparison layouts.
- Contact flows actually work.
- Do not report unexecuted checks as passed or invent Lighthouse/CWV scores.

### Search outcome measurement
- Indexing eligibility is not reported as confirmed Google indexing.
- Use current GSC results only when available and date them.
- Do not assign an artificial “AEO score” or promise first-page results.
- Maintain a dated deployment/change log so future comparisons are interpretable.
- Check current official documentation before claiming a particular report separates AI traffic.

## Deliverables

Prefer extending existing Phase 1 reports instead of creating parallel systems.
Deliver the following logical outputs, combining files when practical:

1. PHASE2-IMPLEMENTATION-REPORT.md
   - What changed, relevant skill paths, dependencies, current counts, and limitations.
   - Distinguish enriched existing pages from genuinely new pages.
   - Explain why each new URL was necessary, if any.

2. PHASE2-TASK-REGISTER.csv
   - id, category, targetUrls, status, changedFiles, sourceStatus, dependencyIds, validation, nextAction
   - Exactly 90 unique IDs from this specification.

3. Updated intent/page inventory
   - Current and final roles for the 20 D groups.
   - Thai title/H1 and primary customer question.
   - New/keep/enrich/differentiate/consolidation-proposal decisions with evidence.

4. Updated internal-link matrix
   - All 20 L proposals with final source/target, actual Thai anchor, placement, and outcome.
   - Explain conditional/unimplemented edges.

5. Updated evidence and fact-conflict register
   - E item coverage, missing owner information, public treatment, and verified resolutions.
   - No sensitive raw documents in public output.

6. QA report and preview evidence
   - Actual commands, results, screenshots, and unresolved checks.
   - Date and indexing regression results.
   - Recommended post-deployment GSC checks for the owner.

Final owner-facing summary in Thai:
- What is finished and how it changes the user experience.
- Which of the 20 additional groups are differentiated already.
- Which service pages gained specific new information.
- Which internal links and genuine evidence were added.
- Which facts need confirmation.
- What remains unverified and why.
- What to monitor after deployment.

Do not deploy automatically. Prepare a reviewable implementation and preview.

## Official sources to verify at execution time

Google generative AI optimization:
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Google AI features:
https://developers.google.com/search/docs/appearance/ai-features

Google documentation updates, including current rich-result changes:
https://developers.google.com/search/updates

Google featured snippets:
https://developers.google.com/search/docs/appearance/featured-snippets

Google helpful content:
https://developers.google.com/search/docs/fundamentals/creating-helpful-content

Google crawlable links:
https://developers.google.com/search/docs/crawling-indexing/links-crawlable

Google sitemap and lastmod:
https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

Google canonicalization:
https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

Google spam policies:
https://developers.google.com/search/docs/essentials/spam-policies

Google structured-data policies:
https://developers.google.com/search/docs/appearance/structured-data/sd-policies

Official guidance supplies principles. Actual repository, production, owner, and GSC evidence establish this site's facts.






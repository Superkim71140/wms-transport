# WMS Entity & Provenance Graph Architecture

## Core Concept
The "WMS Entity & Provenance Graph" ensures that all structured data on WMS TRANSPORT points to the exact same entities across the entire site. Instead of redefining "WMS Transport" on every page, we use a global stable `@id` reference. This proves provenance to search engines and builds a dense, conflict-free Knowledge Graph.

## Canonical Identity Nodes
All canonical identifiers are managed in `src/lib/seo/entityGraph.ts`.

### 1. The Organization Node
- **@id**: `https://wms-transport.com/#organization`
- **Definition**: The corporate entity, representing WMS Transport.
- **Includes**: Logo, social profiles, core contact points.
- **Role**: Serves as the "publisher" of the website and the "provider" of all services.

### 2. The WebSite Node
- **@id**: `https://wms-transport.com/#website`
- **Definition**: The digital platform.
- **Publisher**: Points to `#organization`.

### 3. The WebPage Node
- **@id**: `https://wms-transport.com/{path}#webpage`
- **Definition**: The specific page the user is currently viewing.
- **PartOf**: Points to `#website`.
- **About**: Points to specific Services or Routes depending on the page content.

### 4. Service Hub Nodes (Province)
- **@id**: `https://wms-transport.com/service/{provinceId}#hub`
- **Definition**: The operational base or geographic node for WMS Transport in a specific province.
- **Provider**: `#organization`
- **AreaServed**: The specific geographic entity.

### 5. Route Nodes
- **@id**: `https://wms-transport.com/route/{from}/{to}#route`
- **Definition**: A specific transit operation connecting two geographic points.
- **Provider**: `#organization`

## Component Responsibility

### `EntityGraphSchema.tsx`
Rendered once in `layout.tsx`. Emits the foundational `#organization` and `#website` nodes.

### Local Business & Service Schema (Future/Ongoing)
When emitted on local or service pages, they MUST reference `{"@id": "https://wms-transport.com/#organization"}` in their `provider` or `brand` fields rather than recreating the organization object.

## Governance Rules
1. **Never invent `@id`s inline**: Always import from `entityGraph.ts`.
2. **Never duplicate the Organization graph**: Only `EntityGraphSchema.tsx` defines the full organization block. Other schemas reference it.
3. **Always match visible text**: Do not add structured data assertions that are invisible to the user.
4. **Escape all JSON-LD**: Ensure `escapeJsonLd` is used before injecting raw JSON strings into `dangerouslySetInnerHTML`.

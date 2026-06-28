# ADR-0004: Per-Page Canonical URL Strategy

**Date**: 2026-06-28
**Status**: accepted
**Deciders**: Shahriar Haque Abir, Zed Agent

## Context

The portfolio is deployed to Vercel with a custom domain but can also be accessed via the default `*.vercel.app` URL. Individual sections (experience, projects, certifications) are rendered as client-side views within a single-page shell, but each has its own Next.js route at `/experience`, `/projects`, `/certifications`, etc. Without explicit canonical URLs, search engines could index the same content under multiple URLs, create duplicate content signals, and dilute ranking authority. The root layout sets `metadataBase` but does not set a global canonical.

## Decision

Set per-page canonical URLs via `metadata.alternates.canonical` in each route's `page.tsx` export. The canonical value is a path-relative string (`/`, `/experience`, `/projects`, etc.) that resolves against the `metadataBase` URL set in the root layout. This ensures every route explicitly declares its preferred URL for search engine indexing.

The pattern is:
```typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description.",
  alternates: {
    canonical: "/page-path",
  },
};
```

## Alternatives Considered

### Alternative 1: Global canonical in root layout
- **Pros**: Single declaration, less code
- **Cons**: Every sub-page would canonicalize to `/` — wrong; would collapse all section pages to the homepage URL
- **Why not**: Destroys per-page SEO value

### Alternative 2: Dynamic canonical via `generateMetadata`
- **Pros**: Programmatic, scales with route params
- **Cons**: Over-engineered for a portfolio with static routes; adds complexity without benefit
- **Why not**: Static routes don't need dynamic generation — explicit per-page metadata is clearer

## Consequences

### Positive
- Each page declares its own preferred URL, preventing duplicate content issues
- SEO authority is correctly attributed to individual section pages
- Pattern is explicit and easy to audit
- Works with Vercel's deployment and any custom domain

### Negative
- Must be manually maintained when new routes are added — a potential future gap if the project grows

### Risks
- If `NEXT_PUBLIC_SITE_URL` is not set, canonical URLs fall back to the Vercel preview domain — acceptable for development but should be set in production

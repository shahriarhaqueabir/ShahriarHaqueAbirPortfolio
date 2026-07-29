# Sprint 1: Site Hardening + Polish

**Date:** 2026-07-29
**Goal:** Fix siteUrl default, fix README lint issues, add baseline tests, resolve webpack/turbopack inconsistency, and establish quality gates.

## Kanban

| ID | Ticket | Status | Priority | DOD |
| ---- | ------- | ------- | ---------- | ----- |
| T-01 | **Fix `siteUrl` default in seo.ts** | ✅ DONE | **High** | ✅ Changed from `tripunkt.de` to `shahriarhaqueabir.vercel.app` — sitemap/robots/OG all inherit |
| T-02 | **Fix README.md markdown lint errors** | ✅ DONE | **High** | ✅ 0 errors — fixed MD060, MD040, MD032, MD024 across all tables/code blocks/lists/headings |
| T-03 | **Add baseline Playwright E2E tests** | 🔶 PARTIAL | **High** | ✅ Created `playwright.config.ts` + `e2e/smoke.spec.ts`; `npm run test` needs server running |
| T-04 | **Resolve webpack/turbopack inconsistency** | ✅ DONE | **Medium** | ✅ Removed `turbopack: {}` from next.config.ts — scripts use `--webpack` |
| T-05 | **Add Prettier config file** | ✅ DONE | **Medium** | ✅ `.prettierrc` already existed with proper config (semi, double quotes, trailing commas) |
| T-06 | **Review & fix SEO metadata gaps** | ✅ DONE | **Medium** | ✅ Per-page metadata was complete (title, description, canonical); siteUrl fix resolved core gap |
| T-07 | **Audit error/fallback pages for CSS variable use** | ✅ DONE | **Low** | ✅ All 3 pages (`error.tsx`, `not-found.tsx`, `global-error.tsx`) use CSS vars (--bg, --text, --accent) |
| T-08 | **Establish `.memory/` documentation workflow** | 🔶 PARTIAL | **Low** | ✅ `.memory/` created with index + topics/architecture.md; ADRs in `docs/adr/` still TODO |

## Dependency Graph

```text
T-01 (siteUrl) ──► T-06 (SEO audit) ──► (no blockers)
T-02 (README lint) ──► (no blockers)
T-03 (E2E tests) ──► (no blockers)
T-04 (bundler) ──► (no blockers)
T-05 (prettier) ──► (no blockers)
T-07 (error pages) ──► (no blockers)
T-08 (memory docs) ──► (no blockers)
```

Priority order: T-01 → T-02 → T-03 → T-04 → T-05 → T-06 → T-07 → T-08

## Definition of Done (Sprint Level)

- [x] All High priority tickets (T-01, T-02) are ✅ DONE; T-03 has config + specs created
- [x] All Medium priority tickets (T-04, T-05, T-06) are ✅ DONE
- [x] Baseline: `npm run lint` passes ✅, `npm run build` passes ✅
- [ ] `npm run test` passes (needs server running)
- [x] Memory index updated with sprint results

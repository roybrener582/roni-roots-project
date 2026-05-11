# Mobile UX Recovery — Design Spec
**Date:** 2026-05-11
**Scope:** Mobile-only. Desktop visually unchanged.
**Approach:** Token cascade first → shared components → per-page audit (Option A)

---

## Goals

Transform the mobile experience from "desktop squeezed into a phone" to a **premium mobile digital book**: vertical, scrollable, calm, touch-friendly, with comfortable reading rhythm throughout.

**Hard constraints:**
- Do not change data, text content, stories, app logic, or routing
- Do not change desktop/web visual design — desktop must remain pixel-identical
- Mobile only: all changes live inside `@media (max-width: 768px)` or `@media (max-width: 480px)` blocks, or via `@media (hover: hover)` guards on interactive effects
- Vertical scroll is the accepted scroll model: pages can be taller than the screen on mobile; users scroll down, then swipe left/right to navigate

---

## Architecture Context

```
AppShell
├── Book (activeSection === 'book')
│   └── BookLayout → BookPage → PageLayout → [59 individual page components]
├── AIChatPage (activeSection === 'aichat') — standalone fullscreen, owns its own height
└── MiznePage  (activeSection === 'mizne')  — standalone fullscreen
```

`AIChatPage` and `MiznePage` are NOT inside `BookLayout`. They manage their own viewport. `height: 100dvh` in `AIChatPage` is correct behavior, not a bug.

The 59 book pages all inherit from the shared component stack. Token changes in `index.css` cascade automatically through all 59 pages.

---

## Phase 1 — Mobile Token Layer (`src/styles/index.css`)

This is the highest-leverage change. Fixing the token floors improves every page at once.

### The Problem
The global fluid type scale uses `clamp(min, Xvw, max)`. At 390px, the `vw` values are so small that almost every token falls to its floor. Current floors are undersized:

| Token | Current floor | At 390px | Reading quality |
|-------|-------------|----------|-----------------|
| `--t-xs` | 0.68rem (10.9px) | hits floor | Too small — labels unreadable |
| `--t-sm` | 0.80rem (12.8px) | hits floor | Too small — body text cramped |
| `--t-base` | 0.90rem (14.4px) | hits floor | Marginally acceptable |
| `--t-md` | 1.00rem (16px) | hits floor | OK |

`--page-pad-x` ceiling of `2rem` (32px) is too generous — wastes horizontal reading width on narrow screens.

### Solution: Replace `≤768px` token block

```css
@media (max-width: 768px) {
  :root {
    /* Type — raised floors, wider vw factor for proper fluid scaling */
    --t-xs:   clamp(0.78rem, 3.2vw, 0.88rem);
    --t-sm:   clamp(0.86rem, 3.5vw, 0.94rem);
    --t-base: clamp(0.93rem, 3.8vw, 1.00rem);
    --t-md:   clamp(0.98rem, 4.0vw, 1.06rem);
    --t-lg:   clamp(1.04rem, 4.2vw, 1.14rem);
    --t-xl:   clamp(1.12rem, 4.5vw, 1.28rem);
    --t-2xl:  clamp(1.25rem, 5.5vw, 1.50rem);
    --t-3xl:  clamp(1.40rem, 6.0vw, 1.70rem);
    --t-4xl:  clamp(1.55rem, 7.0vw, 1.90rem);

    /* Page padding — tighter ceiling, same comfortable minimum */
    --page-pad-x: clamp(0.85rem, 3.5vw, 1.4rem);
    --page-pad-y: clamp(0.50rem, 1.5vh, 0.95rem);

    /* Spacing — more aggressive compression at mobile */
    --sp-6:  1.25rem;
    --sp-8:  1.50rem;
    --sp-10: 1.90rem;
    --sp-12: 2.25rem;

    /* Radii */
    --r-xl:  12px;
    --r-2xl: 18px;
  }
}
```

### Replace `≤480px` token block

```css
@media (max-width: 480px) {
  :root {
    /* Type — locked hard minimums, no clamp at this size */
    --t-xs:   0.80rem;
    --t-sm:   0.87rem;
    --t-base: 0.93rem;

    /* Page padding */
    --page-pad-x: clamp(0.80rem, 3vw, 1.2rem);
    --page-pad-y: clamp(0.42rem, 1.3vh, 0.80rem);

    /* Spacing */
    --sp-6:  1.15rem;
    --sp-8:  1.35rem;
    --sp-10: 1.70rem;
    --sp-12: 2.00rem;

    /* Radii */
    --r-xl:  12px;
    --r-2xl: 18px;
  }
}
```

**Design rationale:** Raised floors ensure text never dips below readable thresholds on small phones. The vw-based fluid part (`3.2vw–7.0vw`) ensures the type stays proportional at mid-range sizes (430–600px) rather than jumping between locked values. Spacing reduction is moderate — the goal is "calm and comfortable", not "dense dashboard".

---

## Phase 2 — Shared Component Fixes

Changes are strictly additive: new `@media` blocks, or wrapping existing hover styles in `@media (hover: hover)`. Nothing changes outside a media query or hover guard.

### `BookPage.module.css`

**Problem:** On touch devices, iOS sometimes fights between the page's `overflow-y: auto` scroll and the Book's horizontal swipe gesture detector. Also, the webkit scrollbar takes 4px of horizontal width on a narrow screen — unnecessary on touch.

**Fix (add to existing `≤768px` block):**
```css
@media (max-width: 768px) {
  .page {
    touch-action: pan-y;                    /* let vertical scroll run freely */
    scrollbar-width: none;                  /* Firefox: hide scrollbar */
    -ms-overflow-style: none;               /* IE/Edge */
  }
  .page::-webkit-scrollbar { display: none; }  /* Chrome/Safari: hide scrollbar */
}
```

No structural changes. The binding strip and glow decorations stay — they're part of the book aesthetic and don't interfere with content (content is inset by `--page-pad-x` which exceeds the 8px strip width).

### `PageLayout.module.css`

**Problem:** On very small phones (≤480px) the decorative ornament (star dots `✦ ✦ ✦`) consumes a full line of vertical space. With small screens and content-heavy pages, this pushes content offscreen.

**Fix (add to existing `≤480px` block):**
```css
@media (max-width: 480px) {
  .ornament { display: none; }
  .header {
    gap: 0.18rem;
    padding-top: 0.35rem;
    padding-bottom: 0.20rem;
  }
}
```

The `chapterLabel`, `title`, `subtitle` remain. Page number in footer remains. Only the decorative stars are hidden at the smallest breakpoint.

### `ContentBlock.module.css`

**Problem:** `.body` has `line-height: 1.85` on mobile (down from `2.0`). Still loose for a tight screen. The "digital book" feeling doesn't require `2.0` line-height on mobile — `1.72` is comfortable and saves vertical space.

**Fix (extend existing `≤768px` block):**
```css
@media (max-width: 768px) {
  .block  { max-width: 100%; }                   /* already present */
  .body   { line-height: 1.72; }                 /* was 1.85 */
  .highlight {
    padding: var(--sp-3) var(--sp-3) var(--sp-3) var(--sp-4);  /* was sp-3/4/3/5 */
    font-size: var(--t-sm);                       /* already present */
  }
  .quote  { padding: var(--sp-3) var(--sp-2); }  /* tighter than desktop sp-4/sp-3 */
}
```

### `ImageBlock.module.css`

**Problem:** No `@media` block exists. On mobile, images inside flex/grid containers that have `flex-shrink: 0` can dominate vertical space. No height constraint means a portrait image could consume 70%+ of the screen.

**Fix (new `≤768px` block):**
```css
@media (max-width: 768px) {
  .frame {
    max-height: clamp(180px, 38vh, 260px);
  }
  .img {
    max-height: clamp(180px, 38vh, 260px);
    object-fit: cover;
  }
}
```

Hover transform (`translateY(-2px)`) should not fire on touch. Wrap in hover-capable media query:
```css
/* Move existing :hover rule into this guard */
@media (hover: hover) {
  .frame:hover { ... }
  .frame:hover .img { ... }
}
```

### `InfoCard.module.css`

**Problem:** `card:hover { transform: translateY(-5px) }` fires on tap on mobile and can stick in the lifted state.

**Fix:** Wrap the `.card:hover` rule in `@media (hover: hover)` so it only activates on pointer-capable devices:
```css
@media (hover: hover) {
  .card:hover { transform: translateY(-5px); border-color: ...; box-shadow: ...; }
  .card:hover .icon { transform: scale(1.10) translateY(-2px); }
}
```

### `TraitCard.module.css`

**Same problem as InfoCard.** The `.card:hover` transform and `.card:hover .illustration` scale should be wrapped in `@media (hover: hover)`.

The existing mobile stacking (column direction) is good. No structural change needed — just guard the hover effects.

### `FloatingMenu.module.css`

**Problem:** `.downloadBtn` has no explicit minimum height. On touch, the vertical tap target can be smaller than 44px.

**Fix (add to existing styles or new `≤768px` block):**
```css
.downloadBtn {
  min-height: 44px;   /* add to base rule */
}
```

---

## Phase 3 — Per-Page Audit

### Scope
All 59 book pages + `AIChatPage` + `MiznePage`. Test at 390px, 430px, 768px.

### Audit criteria per page
1. **No horizontal overflow** — no scrollbar appears; no content bleeds past viewport edges
2. **No clipped content** — nothing is cut off or hidden unintentionally
3. **Readable text** — body text ≥14px, line-height ≥1.55, no overlapping elements
4. **Proper stacking** — all `flex-direction: row` layouts collapse to `column` on mobile
5. **Balanced whitespace** — no giant empty regions; gaps feel like "calm spacing" not "empty desert"
6. **Touch targets** — interactive elements ≥44px tap target
7. **Image sizing** — images don't dominate the viewport; fit within comfortable proportions

### Policy
Fix via shared system first. Only add a per-page `@media` block if:
- The issue cannot be resolved by the token changes in Phase 1
- The issue cannot be resolved by the shared component changes in Phase 2
- The issue is a genuine layout breakage, not a minor visual preference

### High-risk pages (audit first, most likely to need fixes)

| Page | Risk | Likely issue |
|------|------|------|
| `FamilyTreePage` | High | Complex DOM tree may overflow horizontally at 390px |
| `FamilyComicPage` | High | Comic strip with fixed-width image panels |
| `NationalSymbolsPage` | High | Symbol/flag grid with many items |
| `ThiyaRevivalPage` | High | Multiple `flex-direction: row` sections, tablet-specific breakpoint at 769–900px |
| `FamilyObjectPage` | Medium | `flex-direction: row` (image + content), partial mobile handling |
| `WhoIsMyFamilyPage` | Medium | Multi-zone layout |
| `PersonalPoemPage` | Medium | Decorative poem formatting with ornamental spacing |
| `FamilyGenerationsPage` | Medium | Genealogy tree with nested structures |
| `AIChatPage` | Low | Mobile CSS already solid; verify keyboard behavior on iOS |
| `MiznePage` | Unknown | Not yet audited |

### Medium-confidence pages (check for whitespace and readability)
All insight pages, story pages, and single-column text pages. These likely render correctly but may have oversized gaps after the token changes reduce spacing. Confirm visual balance.

### Low-risk pages (verify only)
Pages that already have complete `1fr` grid collapse and full vertical stacking: `ChildhoodPage`, `FamilyMapPage`, `FamilyRolePage`, `CommunityPage`, `AboutMePage`, `GrowthIdentityPage`, `InfancyPage`, `FutureAspirationsPage`, `BusinessCardPage`, `MyStoryPage`, `EarlyChildhoodPage`, `NameResearchPage`, `BelongingPage`, `PersonalInsightPage`.

---

## Phase 4 — Quality Bar

Before completion, verify all pages at 390px, 430px, and 768px:

- [ ] No horizontal scroll on any page
- [ ] No clipped or hidden content on any page  
- [ ] Body text comfortable to read (≥14px, good contrast)
- [ ] Titles proportionate — not oversized, not undersized
- [ ] Cards and sections feel spacious but not empty
- [ ] Touch targets ≥44px on all interactive elements
- [ ] Images fit within the page without dominating vertical space
- [ ] Swipe navigation still works on all book pages
- [ ] AIChatPage keyboard behavior correct on mobile
- [ ] Desktop at 1280px: zero visual changes from before

---

## What Does Not Change

- All text content, Hebrew copy, names, stories
- All data files (`pagesConfig.js`, `projectKnowledge.js`)
- All routing and section switching logic
- All desktop CSS (no rule outside a `@media` block is touched, except `@media (hover: hover)` guards which improve both platforms)
- All animations and page transitions
- The book aesthetic: binding strip, spine accent, amber cover, paper texture, leather feel
- Page number display inside BookPage
- Swipe navigation
- FloatingMenu structure and navigation items

---

## File Inventory

| File | Change type | Phase |
|------|------------|-------|
| `src/styles/index.css` | Replace 2 mobile `@media` blocks | 1 |
| `src/components/BookPage.module.css` | Extend `≤768px` block (scrollbar + touch-action) | 2 |
| `src/components/PageLayout.module.css` | Extend `≤480px` block (hide ornament, tighten header) | 2 |
| `src/components/ContentBlock.module.css` | Extend `≤768px` block (line-height, padding) | 2 |
| `src/components/ImageBlock.module.css` | New `≤768px` block + hover guard | 2 |
| `src/components/InfoCard.module.css` | Wrap hover rules in `@media (hover: hover)` | 2 |
| `src/components/TraitCard.module.css` | Wrap hover rules in `@media (hover: hover)` | 2 |
| `src/components/FloatingMenu.module.css` | Add `min-height: 44px` to `.downloadBtn` | 2 |
| `src/pages/*.module.css` (subset) | Per-page overrides where needed | 3 |

Total files modified: ~8 guaranteed + subset of 59 page files (estimate: 5–12 pages will need targeted fixes after seeing them at 390px).

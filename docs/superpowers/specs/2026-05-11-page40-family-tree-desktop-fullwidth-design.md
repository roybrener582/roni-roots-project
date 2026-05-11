# Design: Page 40 Family Tree — Desktop Full-Width Stretch Layout

**Date:** 2026-05-11  
**Scope:** Page 40 (`FamilyTreePage`) — desktop/web only (`min-width: 769px`)  
**Goal:** Tree canvas fills the full available width of the book page and adapts responsively to any desktop viewport size.

---

## Problem

The previous desktop fix (height-driven sizing: `height: 100%; width: auto`) correctly eliminated vertical overflow but produced a visually narrow result. At 1440×900 the tree occupied only ~58% of the content-area width (≈680px in 1180px), leaving large empty margins on both sides.

This is a geometric consequence: the tree's `aspect-ratio: 1000/900` (≈1.11:1, nearly square) cannot simultaneously fill a wide landscape content area (≈1.93:1 at 1440×900) in both dimensions without overflow. Any aspect-ratio-preserving approach will always be constrained by one dimension.

**Decision:** Release the fixed aspect ratio on desktop. Let the tree canvas fill the full available rectangle. The SVG and node positions are both proportional (percentage-based), so the tree renders correctly at any canvas shape.

---

## Approach: Stretch to Fill

The tree canvas (`div.wrap`) becomes a flex child that grows to fill its parent's available space in both width and height. No new wrapper elements. No JavaScript. No magic numbers.

```css
@media (min-width: 769px) {
  .wrap {
    width: 100%;        /* full content-area width */
    flex: 1;            /* grow to fill all vertical space in .main */
    min-height: 0;      /* override the 680px base floor */
    aspect-ratio: auto; /* release fixed 1000/900 ratio */
  }
}
```

---

## Why This Works

| Element | Behavior |
|---|---|
| `div.wrap` | `flex: 1` in `.main` (flex column) fills all available vertical space; `width: 100%` fills horizontal space |
| `TreeSvg` | `position: absolute; inset: 0; width: 100%; height: 100%` — always fills wrap exactly |
| SVG | `viewBox="0 0 1000 900"` with `preserveAspectRatio="none"` — branches/leaves stretch to match any canvas |
| Person nodes | `left: (cx/1000)*100%` and `top: ((cy-sz/2)/900)*100%` — percentage-based, scale with canvas |

---

## Geometric Context

At representative viewports (estimated `.main` dimensions after all shell/cover/page/header padding):

| Viewport | `.main` size | Canvas size | Vs. aspect-ratio-constrained |
|---|---|---|---|
| 1440×900 | ~1180×612px | 1180×612px (1.93:1) | Previously: 680×612px (58% width) |
| 1920×1080 | ~1744×745px | 1744×745px (2.34:1) | Previously: 828×745px (47% width) |
| 1280×800 | ~1050×540px | 1050×540px (1.94:1) | Previously: 600×540px (57% width) |

---

## Known Caveat: Vertical Node Offset

Node vertical positioning uses a fixed pixel correction:

```js
const topPct = ((p.cy - sz / 2) / 900) * 100;
```

The `sz/2` subtraction (in pixels) centers each circle at `cy`, but is calibrated for a 900px-tall canvas. At shorter canvases the circles sit slightly below the branch endpoints:

| Canvas height | Max offset (xl nodes, sz=90) | Branch width at connection |
|---|---|---|
| 745px (1080p) | ~7px | 14px |
| 612px (900p) | ~14px | 14px |
| 540px (800p) | ~17px | 11–14px |

The main trunk and primary branches are 22–32px wide, absorbing the offset completely. Secondary connections (11–14px) show a slight offset at 900p but remain visually connected. For an organic illustrated tree this is acceptable. The offset would only need correction if the layout moves to a portrait-format book page.

---

## Scope Boundaries

- **Changes:** `src/pages/FamilyTreePage.module.css` — replace the desktop `@media` block (4 lines)
- **No changes:** `FamilyTreePage.jsx`, `PageLayout`, `BookPage`, or any shared component
- **Mobile unaffected:** `max-width: 768px` block is separate and untouched
- **Page 42 unaffected:** Uses its own CSS module
- **Content unaffected:** No PEOPLE data, PHOTOS mapping, or SVG paths change

---

## Verification Checklist

1. **1440×900:** Tree fills full content width, no horizontal overflow, no vertical scroll on `.page`
2. **1920×1080:** Tree wider/taller, still fully contained, footer ornament visible
3. **1280×800:** Tree fits, no overflow
4. **Mobile 375×812:** Mobile layout unchanged — scrollable tree as before
5. **Footer:** BookPage `.pageNumber` (absolutely positioned) remains visible and clear of the tree
6. **Lightbox:** Photo click opens overlay — unaffected by layout change

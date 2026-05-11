# Page 40 Family Tree — Desktop Height-Fill Fix

**Date:** 2026-05-11  
**Scope:** Desktop/web only (`min-width: 769px`). Mobile untouched.

## Problem

`FamilyTreePage .wrap` uses `width: 100%; aspect-ratio: 1000/900; min-height: 680px`.  
On a 1440px-wide desktop the page content area is ~1180px wide, so the aspect-ratio derives
a height of ~1062px — far exceeding the ~640px available in `.main`. The `min-height: 680px`
floor compounds this on shorter screens. Result: vertical overflow, scrolling, footer overlap.

## Solution

Add a single `@media (min-width: 769px)` block to `FamilyTreePage.module.css` that switches
the sizing axis from width-driven to height-driven:

```css
@media (min-width: 769px) {
  .wrap {
    height: 100%;     /* fill .main's available content height */
    width: auto;      /* let aspect-ratio derive the width     */
    min-height: 0;    /* remove the 680 px floor               */
    max-width: 100%;  /* never overflow horizontally           */
  }
}
```

The base-rule `aspect-ratio: 1000/900` is inherited unchanged, preserving exact proportions.
`height: 100%` resolves correctly because `.main` has a definite height via the flex chain:
`BookLayout (100svh) → .cover (flex:1) → .pageArea (flex:1) → .page (flex:1, min-height:0) → .container (flex:1) → .main (flex:1)`.

## Expected result on representative screens

| Viewport | `.main` avail. | `.wrap` (H×W)  | Horizontal breathing room |
|----------|----------------|----------------|---------------------------|
| 1440×900 | ~640×1180 px   | 640×711 px     | ~234 px each side         |
| 1920×1080| ~750×1580 px   | 750×833 px     | ~373 px each side         |

The tree is centered in `.main` via inherited `align-items: center` on the flex container.

## Visual notes

- Fixed-pixel rings (52–90 px) and rem-based labels preserve readability at all sizes.
- The very bottom labels (Roni/Amit, cy≈790) extend ~30 px below `.wrap`'s rounded background.
  They remain fully visible against the page paper and well within `.page`'s total height.
- The desktop footer (ornament + page number) is `position: absolute; bottom: 0` inside
  `.wrapper` and is cleared by `.page`'s `padding-bottom: 3.5rem`. No overlap.

## Files changed

- `src/pages/FamilyTreePage.module.css` — add desktop `@media` override for `.wrap`

## Out of scope

- Mobile layout (untouched)
- Family tree data, node positions, SVG paths
- All other pages

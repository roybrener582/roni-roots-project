# Design: Page 40 Family Tree — Desktop Photo Sizes

**Date:** 2026-05-11
**Scope:** Page 40 (`FamilyTreePage`) — desktop/web only (`min-width: 769px`)
**Goal:** Make person photo circles visibly larger on desktop, proportional to the now full-width tree canvas.

---

## Problem

After the tree canvas switched to full-width stretch layout, the photo circles (fixed pixel sizes) became proportionally small relative to the wider canvas (~1180px at 1440×900, vs ~680px before). The faces need to be larger to read well at the new scale.

---

## Approach: CSS Ring Size Overrides

Add per-size-class ring overrides in the existing `@media (min-width: 769px)` block, scaling each tier ~1.4×. This matches the exact pattern the mobile block already uses for ring overrides. No JS changes, no JSX changes.

```css
@media (min-width: 769px) {
  /* existing .wrap rules … */

  .ssm .ring { width: 72px;  height: 72px;  }
  .smd .ring { width: 88px;  height: 88px;  }
  .slg .ring { width: 106px; height: 106px; }
  .sxl .ring { width: 124px; height: 124px; }
}
```

| Size class | Who | Current | Desktop |
|---|---|---|---|
| `sm` | Great-grandparents | 52px | 72px |
| `md` | Grandparents | 64px | 88px |
| `lg` | Parents / siblings | 76px | 106px |
| `xl` | Roni (me) | 90px | 124px |

---

## Known Caveat

Node vertical positioning uses `topPct = ((cy - sz/2) / 900) * 100` where `sz` is the JS value (unchanged). With larger CSS rings, the visual circle center drifts 5–14px below the branch endpoint. Branch strokes are 7–32px wide — this offset is fully absorbed at the trunk/primary level and barely noticeable on secondary branches.

---

## Scope

- **Changes:** `src/pages/FamilyTreePage.module.css` — 4 lines added to the desktop `@media` block
- **No changes:** `FamilyTreePage.jsx`, `SIZE_PX` constant, any shared component
- **Mobile unaffected:** `max-width: 768px` block already has its own ring overrides; untouched
- **Other pages unaffected**

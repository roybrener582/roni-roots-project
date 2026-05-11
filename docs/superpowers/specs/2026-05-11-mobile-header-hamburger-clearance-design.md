# Mobile Header Hamburger Clearance

**Date:** 2026-05-11
**Scope:** Mobile only (`≤768px`, `≤480px`)
**Files changed:** `src/components/PageLayout.module.css` only

---

## Problem

The floating `HamburgerButton` is `position: fixed` at the top-right corner of the viewport:

- `top: max(18px, calc(env(safe-area-inset-top, 0px) + 8px))`
- `right: max(clamp(16px, 2.5vw, 32px), calc(env(safe-area-inset-right, 0px) + 8px))`
- `width: 44px; height: 44px`

This places the button's bottom edge at **62px from the top** (more on notched iPhones).

`PageLayout.module.css` — used by all 60+ book pages — has no horizontal or vertical clearance reserved for this button. On mobile, the header's `padding-top` is `0.50rem` (~8px) and `0.35rem` (~5.6px) on small phones. The title and ornamental stars start at essentially the same height as the button, causing both vertical and horizontal overlap.

Pages that already handle this correctly (and whose values inform this fix):
- `AIChatPage.module.css`: `padding-right: max(1.2rem, calc(68px + env(safe-area-inset-right, 0px)))`
- `HomeScreen.module.css` (MiznePage): `padding-top: max(52px, calc(70px + env(safe-area-inset-top, 0px)))`

---

## Fix

Single-file change: `src/components/PageLayout.module.css`.

### Clearance values

| Direction | CSS value | Derivation |
|---|---|---|
| Vertical | `max(70px, calc(env(safe-area-inset-top, 0px) + 62px))` | button top 18px + height 44px + 8px gap = 70px; +safe-area for notched iPhones |
| Horizontal | `max(68px, calc(env(safe-area-inset-right, 0px) + 60px))` | button right 16px + width 44px + 8px gap = 68px; uses physical `padding-right` to match button's physical `right` property |

### Changes

**1. `@media (max-width: 768px)` — `.header`**

Replace `padding-top: 0.50rem` with the vertical clearance value. Add `padding-right` with the horizontal clearance value.

**2. `@media (max-width: 480px)` — `.header`**

Replace `padding-top: 0.35rem` with the vertical clearance value. Add `padding-right` with the horizontal clearance value. (Same button, same clearance needed.)

**3. Both mobile media queries — `.compact .header`**

The compact variant rule (`.compact .header`) has CSS specificity 0,2,0 vs `.header` at 0,1,0 — it always wins. Without explicit overrides in the media queries, compact pages (MyNamePage, NameResearchPage, FamilyTreePage, etc.) continue to overlap. Both media query blocks need a `.compact .header` rule with the same clearance values.

---

## Out of Scope

- `AIChatPage` — already correct, no change needed
- `MiznePage` / `HomeScreen` — already correct, no change needed
- Desktop styles — untouched; all changes are inside mobile media queries
- JSX / component logic — no changes
- z-index hierarchy — no changes

---

## Success Criteria

- On any mobile viewport (≤768px), the page title and ornamental stars never sit behind or under the hamburger button
- On notched iPhones (safe-area-inset-top > 0), clearance scales correctly
- Compact-variant pages get the same protection as standard pages
- Desktop layout is pixel-identical to before

# Page 40 Desktop Full-Width Stretch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the family tree on page 40 fill the full available width of the book page on desktop by releasing its fixed aspect ratio and letting the canvas stretch to the actual available rectangle.

**Architecture:** Replace the existing desktop `@media (min-width: 769px)` block in `FamilyTreePage.module.css` with a stretch-fill model: `flex: 1` fills available height, `width: 100%` fills width, `aspect-ratio: auto` releases the fixed 1000/900 ratio. The SVG uses `preserveAspectRatio="none"` (already set) so branches scale to match. Person nodes use percentage-based positioning so they adapt to any canvas size. No JSX changes. No shared-component changes. Mobile is unaffected.

**Tech Stack:** React + Vite, CSS Modules, Vite dev server (`npm run dev`), browser DevTools for viewport testing.

**Spec:** `docs/superpowers/specs/2026-05-11-page40-family-tree-desktop-fullwidth-design.md`

---

### Task 1: Replace the desktop CSS block

**Files:**
- Modify: `src/pages/FamilyTreePage.module.css` (lines 236–244, the `@media (min-width: 769px)` block)

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:5173` in a browser and navigate to page 40 (עץ המשפחה שלי). Use DevTools → Device toolbar, set viewport to **1440×900**.

Confirm the current state: tree is centered with large empty margins on both sides (tree is roughly 680px wide in a 1180px content area).

- [ ] **Step 2: Replace the desktop override block**

Open `src/pages/FamilyTreePage.module.css`. Find and **replace** the existing block at the end of the file (before the `@media (max-width: 768px)` block):

**Remove this:**
```css
/* ── Desktop: height-fill so the tree never overflows the page ── */
@media (min-width: 769px) {
  .wrap {
    height: 100%;    /* fill .main's available content height  */
    width: auto;     /* aspect-ratio derives the width         */
    min-height: 0;   /* remove the 680px floor                 */
    max-width: 100%; /* prevent horizontal overflow            */
  }
}
```

**Replace with:**
```css
/* ── Desktop: stretch to fill full available space ── */
@media (min-width: 769px) {
  .wrap {
    width: 100%;        /* full content-area width */
    flex: 1;            /* fill all vertical space in .main */
    min-height: 0;      /* override the 680px base floor */
    aspect-ratio: auto; /* release fixed ratio; canvas fills actual space */
  }
}
```

Save the file.

- [ ] **Step 3: Verify at 1440×900**

In DevTools, set viewport to **1440×900**, navigate to page 40.

Expected:
- Tree canvas fills the full width of the book page content area (edge-to-edge, no empty side margins).
- Tree canvas fills the full vertical space of the content area below the header.
- All four generations (great-grandparents at top → Roni/Amit at bottom) are visible without scrolling.
- No horizontal scrollbar or overflow.
- Footer ornament (✦ ✦ ✦) and page number are visible at the bottom of the page, not overlapping the tree.
- The warm parchment background of `.wrap` fills the available space.
- Branches connect to person photo circles (slight offset of 8–14px on secondary branches is expected and acceptable per spec).

- [ ] **Step 4: Verify at 1920×1080**

Set DevTools viewport to **1920×1080**.

Expected:
- Tree fills even wider — panoramic spread across the full page width.
- All content visible, no scroll, no overflow.
- Footer visible and clear of the tree.
- Vertical node offset is smaller than at 900p (≤7px) — connections look clean.

- [ ] **Step 5: Verify at 1280×800**

Set DevTools viewport to **1280×800**.

Expected:
- Tree fills full width of narrower page.
- All four generations visible, no scroll.
- No overflow in either direction.

- [ ] **Step 6: Verify mobile is unaffected**

Set DevTools to **375×812** (iPhone) or any mobile preset.

Expected:
- Mobile layout is unchanged — tree scrolls as before (intentional on mobile).
- No visual regression: labels hidden on small nodes, key nodes (Roni, Roy, Einat) show labels.
- The `@media (max-width: 768px)` block is completely unmodified and takes effect.

- [ ] **Step 7: Verify page 42 is unaffected**

Navigate to page 42. Confirm it looks exactly as before — no layout changes.

- [ ] **Step 8: Commit**

```bash
git add src/pages/FamilyTreePage.module.css
git commit -m "fix(page40): stretch tree canvas to fill full desktop book width

Release the fixed 1000/900 aspect ratio on desktop. Use flex:1 + width:100%
so the tree canvas fills the actual available rectangle instead of being
constrained to 58% of the page width by the near-square ratio.

SVG already uses preserveAspectRatio=none; person nodes use percentage
positioning — both adapt correctly to any canvas shape.

Mobile layout (max-width: 768px) is unchanged.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

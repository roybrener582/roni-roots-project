# Page 40 Desktop Photo Sizes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make person photo circles ~1.4× larger on desktop so faces read well against the now full-width tree canvas.

**Architecture:** Add four ring-size overrides inside the existing `@media (min-width: 769px)` block in `FamilyTreePage.module.css`. No JS, no JSX, no shared-component changes. Follows the same pattern as the mobile block which already overrides ring sizes with `!important`.

**Tech Stack:** React + Vite, CSS Modules, Vite dev server (`npm run dev`).

**Spec:** `docs/superpowers/specs/2026-05-11-page40-family-tree-desktop-photo-sizes-design.md`

---

### Task 1: Add desktop ring-size overrides

**Files:**
- Modify: `src/pages/FamilyTreePage.module.css` (inside the `@media (min-width: 769px)` block)

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:5173`, navigate to page 40 (עץ המשפחה שלי), set DevTools viewport to **1440×900**. Note the current photo circle sizes — they look small relative to the wide canvas.

- [ ] **Step 2: Add the ring-size overrides**

Open `src/pages/FamilyTreePage.module.css`. Find the existing desktop block:

```css
/* ── Desktop: stretch to fill full available space ── */
@media (min-width: 769px) {
  .wrap {
    width: 100%;
    flex: 1;
    min-height: 0;
    aspect-ratio: auto;
  }
}
```

Replace it with:

```css
/* ── Desktop: stretch to fill full available space ── */
@media (min-width: 769px) {
  .wrap {
    width: 100%;
    flex: 1;
    min-height: 0;
    aspect-ratio: auto;
  }

  .ssm .ring { width: 72px;  height: 72px;  }
  .smd .ring { width: 88px;  height: 88px;  }
  .slg .ring { width: 106px; height: 106px; }
  .sxl .ring { width: 124px; height: 124px; }
}
```

Save the file.

- [ ] **Step 3: Verify at 1440×900**

In the browser (dev server running), navigate to page 40 at **1440×900**.

Expected:
- Photo circles are visibly larger than before — great-grandparents 72px, grandparents 88px, parents/siblings 106px, Roni 124px.
- Circles still clearly connect to their branches (branch lines meet the ring or slightly overlap it).
- No circles overlap each other or their label chips.
- Tree fills the full width with no horizontal overflow.
- Footer ornament visible at the bottom.

- [ ] **Step 4: Verify at 1920×1080**

Set DevTools to **1920×1080**.

Expected:
- Circles are the same pixel sizes (72/88/106/124px) — they don't change with viewport width, which is correct.
- Tree is even wider; the larger circles look well-proportioned against the panoramic spread.
- No overlap, no overflow.

- [ ] **Step 5: Verify mobile is unaffected**

Set DevTools to **375×812** (iPhone).

Expected:
- Mobile ring sizes are unchanged — the mobile block's `!important` overrides (`ssm: 40px`, `smd: 50px`, `slg: 60px`, `sxl: 72px`) still apply.
- The desktop overrides do NOT take effect (they are inside `min-width: 769px`).

- [ ] **Step 6: Commit**

```bash
git add src/pages/FamilyTreePage.module.css
git commit -m "fix(page40): increase photo circle sizes on desktop

Scale ring sizes ~1.4x inside the desktop media query to match the
now full-width tree canvas: sm 52→72px, md 64→88px, lg 76→106px,
xl 90→124px. Mobile ring sizes unchanged.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

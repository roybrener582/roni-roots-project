# Page 40 Family Tree Desktop Height-Fill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the family tree on page 40 fit entirely within the visible book page on desktop without scrolling, by switching from width-driven to height-driven sizing.

**Architecture:** Add a single `@media (min-width: 769px)` override to `FamilyTreePage.module.css` that makes `.wrap` fill the available `.main` height and derive its width from the existing `aspect-ratio: 1000/900`, removing the `min-height: 680px` floor. No HTML, no JS, no mobile impact.

**Tech Stack:** React + Vite, CSS Modules, Vite dev server (`npm run dev`)

---

### Task 1: Add desktop height-fill CSS override

**Files:**
- Modify: `src/pages/FamilyTreePage.module.css` (end of file, after the `@media (max-width: 768px)` block)

- [ ] **Step 1: Open the dev server and navigate to page 40**

```bash
npm run dev
```

Open `http://localhost:5173` in a browser, navigate to page 40 (עץ המשפחה שלי). Resize the browser to 1440×900. Confirm the current problem: the tree overflows, the bottom is cut off, and a scrollbar appears inside the page surface.

- [ ] **Step 2: Add the desktop override block**

Append this block to the **end** of `src/pages/FamilyTreePage.module.css`, after the existing `@media (max-width: 768px)` block:

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

The base-rule `aspect-ratio: 1000/900` (line 9 of the file) continues to apply — no need to repeat it.

- [ ] **Step 3: Verify at 1440×900**

In the browser (dev server still running), resize to exactly **1440×900**. Navigate to page 40.

Expected:
- The entire family tree (all four generations, from great-grandparents at the top to Roni/Amit at the bottom) is fully visible inside the book page surface.
- No vertical scrollbar on the page surface.
- The tree is centered horizontally with ~230 px of breathing room on each side.
- The footer ornament (✦ ✦ ✦) and page number are visible at the bottom of the page, not overlapping the tree.
- The warm rounded-rectangle background of `.wrap` fills the vertical space neatly.

- [ ] **Step 4: Verify at 1920×1080**

Resize the browser to **1920×1080** (or use DevTools device toolbar).

Expected:
- Tree still fully visible, no scroll.
- Tree is ~833px wide × ~750px tall, centered with ~370 px breathing room each side.
- Footer visible and clear of the tree.

- [ ] **Step 5: Verify mobile is unaffected**

Resize to **375×812** (iPhone) or use DevTools mobile emulation.

Expected:
- Mobile layout unchanged — the tree scrolls as before (mobile scrolling is intentional).
- No visual regression on mobile.

- [ ] **Step 6: Commit**

```bash
git add src/pages/FamilyTreePage.module.css
git commit -m "fix(page40): make family tree fit inside desktop book page without scrolling

Switch .wrap from width-driven (aspect-ratio overflows on wide screens) to
height-driven sizing on desktop: height:100% fills .main, width:auto derives
from the existing 1000/900 aspect-ratio. Removes the 680px min-height floor.

Co-Authored-By: Claude <noreply@anthropic.com>"
```

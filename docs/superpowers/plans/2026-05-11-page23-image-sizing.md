# Page 23 Desktop Image Sizing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the photo on page 23 fill the full available height of its column on desktop, turning it from a small centered thumbnail into a dominant visual anchor.

**Architecture:** Single CSS file change in `MyStoryPage.module.css`. The image column already stretches to full layout height via `align-items: stretch` on `.layout` — the only blocker is that `.imageCol` uses `align-items: center` (which vertically centers the frame at its intrinsic height) and `.imageFrame` has a hard `aspect-ratio: 4/5` (which caps height at 337px for a 270px-wide column). Removing both constraints lets the frame stretch to the full column height. `object-fit: cover` on `.photo` fills any frame gracefully. Mobile is untouched — its `@media (max-width: 768px)` block already overrides both properties with its own fixed-height strip.

**Tech Stack:** CSS Modules, Vite dev server (`npm run dev`)

---

### Task 1: Fix the image column CSS

**Files:**
- Modify: `src/pages/MyStoryPage.module.css`

- [ ] **Step 1: Open the file and locate the two rules to change**

The two targets are `.imageCol` (lines ~16–25) and `.imageFrame` (lines ~27–33).

Current `.imageCol`:
```css
.imageCol {
  flex:            0 0 auto;
  width:           clamp(170px, 38%, 270px);
  display:         flex;
  align-items:     center;
  justify-content: center;
  overflow:        hidden;
  border-radius:   var(--r-xl);
}
```

Current `.imageFrame`:
```css
.imageFrame {
  width:         100%;
  aspect-ratio:  4 / 5;
  margin:        0;
  overflow:      hidden;
  border-radius: var(--r-xl);
}
```

- [ ] **Step 2: Update `.imageCol` — switch to stretch alignment and bump max-width**

Change `align-items: center` → `align-items: stretch`, `justify-content: center` → `justify-content: stretch`, and raise the max-width cap from `270px` → `300px`:

```css
.imageCol {
  flex:            0 0 auto;
  width:           clamp(170px, 38%, 300px);
  display:         flex;
  align-items:     stretch;
  justify-content: stretch;
  overflow:        hidden;
  border-radius:   var(--r-xl);
}
```

- [ ] **Step 3: Update `.imageFrame` — remove aspect-ratio, fill full height**

Remove `aspect-ratio: 4 / 5` and add `height: 100%`:

```css
.imageFrame {
  width:         100%;
  height:        100%;
  margin:        0;
  overflow:      hidden;
  border-radius: var(--r-xl);
}
```

- [ ] **Step 4: Start the dev server**

```bash
npm run dev
```

Expected: Vite dev server starts, URL printed (typically `http://localhost:5173`).

- [ ] **Step 5: Verify desktop — page 23 image is large**

Open the app in a desktop browser (viewport ≥ 900px wide). Navigate to page 23 ("הסיפור שלי").

Expected:
- The photo fills the full height of the content area on the right side — approximately the same height as the three story cards stacked on the left
- No empty space above or below the image
- The photo is not stretched or distorted (face/subject still looks correct at top)
- The three story sections (עבר / הווה / עתיד) are unchanged and readable

- [ ] **Step 6: Verify mobile — layout is unchanged**

Resize browser to ≤ 768px (or use DevTools device emulation).

Expected:
- Image appears as a horizontal strip at the top (same as before)
- Height is still `clamp(130px, 24vh, 185px)`
- Content sections stack vertically below the strip
- No regression from the mobile changes

- [ ] **Step 7: Commit**

```bash
git add src/pages/MyStoryPage.module.css
git commit -m "fix(page23): make image fill full available height on desktop"
```

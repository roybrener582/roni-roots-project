# Mobile UX Recovery — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recover and rebuild the full mobile UX of the Roni digital book app — comfortable reading, vertical scroll, premium "digital book" feel — without changing the desktop design.

**Architecture:** Token cascade in `index.css` first (fixes all 59 book pages at once via CSS custom property inheritance), then targeted shared component fixes, then systematic per-page audit of every page at 390px/430px/768px. Every change lives inside a `@media` block or `@media (hover: hover)` guard — desktop CSS is never touched directly.

**Tech Stack:** React + Vite, CSS Modules, Hebrew RTL (`direction: rtl`), 69 page components, `clamp()` fluid type scale, CSS custom properties as design tokens

---

### Task 1: Start dev server and record baseline

**Files:**
- No changes

- [ ] **Step 1: Start the dev server**

```bash
cd /Users/roy.brener/workspace/Roni
npm run dev
```

Open Chrome. Open DevTools (F12) → toggle device toolbar → set custom dimensions to `390 × 844`. Navigate to `http://localhost:5173`.

- [ ] **Step 2: Record your baseline observations**

Navigate through these 5 pages and note what you see:
1. **WelcomePage** (page 1) — is title text a comfortable size? does subtitle feel cramped?
2. **InfancyPage** — do timeline cards have comfortable padding? is text readable?
3. **TraitsPage** — do trait cards stack cleanly?
4. **BusinessCardPage** — do the two cards stack vertically?
5. **AIChatPage** (via hamburger menu → "צ׳אט AI") — does the input stay visible when keyboard opens?

Write down any issues you notice. These are your before-reference points.

- [ ] **Step 3: No commit (baseline observation only)**

---

### Task 2: Token cascade — replace mobile CSS custom properties

**Files:**
- Modify: `src/styles/index.css`

**Why this matters:** The global fluid type scale uses `clamp(floor, Xvw, ceiling)`. At 390px, the `vw` values are so small that every token hits its floor. Current floors are too small — `--t-xs` floor is `0.68rem (10.9px)`, `--t-sm` is `0.80rem (12.8px)`. This single file change cascades through all 59 book pages at once via CSS custom property inheritance.

- [ ] **Step 1: Replace the `≤768px` token block**

Find this exact block in `src/styles/index.css`:
```css
/* ── Mobile token overrides (≤ 768px) ─────────────────── */
@media (max-width: 768px) {
  :root {
    --page-pad-x: clamp(1rem, 4vw, 2rem);
    --page-pad-y: clamp(0.6rem, 1.8vh, 1.2rem);
    --r-xl:       13px;
    --r-2xl:      20px;
    --sp-8:       1.75rem;
    --sp-10:      2.2rem;
    --sp-12:      2.6rem;
  }
}
```

Replace with:
```css
/* ── Mobile token overrides (≤ 768px) ─────────────────── */
@media (max-width: 768px) {
  :root {
    /* Type — raised floors ensure readable text at 390px */
    --t-xs:   clamp(0.78rem, 3.2vw, 0.88rem);
    --t-sm:   clamp(0.86rem, 3.5vw, 0.94rem);
    --t-base: clamp(0.93rem, 3.8vw, 1.00rem);
    --t-md:   clamp(0.98rem, 4.0vw, 1.06rem);
    --t-lg:   clamp(1.04rem, 4.2vw, 1.14rem);
    --t-xl:   clamp(1.12rem, 4.5vw, 1.28rem);
    --t-2xl:  clamp(1.25rem, 5.5vw, 1.50rem);
    --t-3xl:  clamp(1.40rem, 6.0vw, 1.70rem);
    --t-4xl:  clamp(1.55rem, 7.0vw, 1.90rem);

    /* Page padding — tighter ceiling preserves reading width */
    --page-pad-x: clamp(0.85rem, 3.5vw, 1.4rem);
    --page-pad-y: clamp(0.50rem, 1.5vh, 0.95rem);

    /* Spacing — moderate compression, preserves "calm book" rhythm */
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

- [ ] **Step 2: Replace the `≤480px` token block**

Find:
```css
/* ── Small-phone token overrides (≤ 480px) ────────────── */
@media (max-width: 480px) {
  :root {
    --page-pad-x: clamp(1rem, 4vw, 1.5rem);
    --page-pad-y: clamp(0.55rem, 1.4vh, 0.95rem);
    --r-xl:       12px;
    --r-2xl:      18px;
    --sp-8:       1.5rem;
    --sp-10:      2rem;
    --sp-12:      2.5rem;
  }
}
```

Replace with:
```css
/* ── Small-phone token overrides (≤ 480px) ────────────── */
@media (max-width: 480px) {
  :root {
    /* Type — hard floors, no clamp needed at this size */
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

- [ ] **Step 3: Verify in browser at 390px**

Navigate to WelcomePage. Check:
- Title proportionate, not too large or tiny
- Subtitle comfortably readable (at least 14px effective)
- Side margins feel like a comfortable reading margin, not too wide or cramped

Navigate to InfancyPage. Check:
- Card text legible, cards have breathing room
- No horizontal scroll

Navigate to TraitsPage. Check:
- Trait cards stack cleanly with balanced spacing between them

- [ ] **Step 4: Commit**

```bash
git add src/styles/index.css
git commit -m "fix(mobile): raise type-scale floors and tighten spacing tokens"
```

---

### Task 3: BookPage — touch-action and scrollbar

**Files:**
- Modify: `src/components/BookPage.module.css`

**Why:** `touch-action: pan-y` tells iOS that vertical scrolling is the primary gesture on this element. Horizontal swipes still bubble up to `Book.jsx`'s swipe handler (which requires `≥50px` and `1.5×` horizontal dominance). Hiding the scrollbar cleans up the 4px visual chrome on narrow screens — momentum scroll still works.

- [ ] **Step 1: Extend the `≤768px` block**

Find this exact block in `src/components/BookPage.module.css`:
```css
/* ── Mobile: lighter shadow, tighter bottom clearance ───── */
@media (max-width: 768px) {
  .page {
    box-shadow:
      inset 0  1px 0 rgba(255, 255, 255, 0.90),
      inset 0 -1px 0 rgba(0, 0, 0, 0.03),
      0 0 0 1px rgba(139, 105, 20, 0.05),
      3px 0 14px rgba(0, 0, 0, 0.14),
      -1px 0 4px rgba(0, 0, 0, 0.05);
  }

  /* Hide stacked-pages effect on mobile — reduces visual noise and side overflow */
  .wrapper::before,
  .wrapper::after  { display: none; }
}
```

Replace with:
```css
/* ── Mobile: lighter shadow, tighter bottom clearance ───── */
@media (max-width: 768px) {
  .page {
    box-shadow:
      inset 0  1px 0 rgba(255, 255, 255, 0.90),
      inset 0 -1px 0 rgba(0, 0, 0, 0.03),
      0 0 0 1px rgba(139, 105, 20, 0.05),
      3px 0 14px rgba(0, 0, 0, 0.14),
      -1px 0 4px rgba(0, 0, 0, 0.05);
    touch-action: pan-y;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .page::-webkit-scrollbar { display: none; }

  /* Hide stacked-pages effect on mobile — reduces visual noise and side overflow */
  .wrapper::before,
  .wrapper::after  { display: none; }
}
```

- [ ] **Step 2: Verify at 390px**

Open a content-heavy page (e.g. FamilyNameResearchPage). Check:
- No visible scrollbar on the right edge of the page
- Vertical scrolling feels smooth
- Swiping left/right still navigates between pages

- [ ] **Step 3: Commit**

```bash
git add src/components/BookPage.module.css
git commit -m "fix(mobile): suppress scrollbar and set touch-action pan-y on BookPage"
```

---

### Task 4: PageLayout — hide ornament on smallest phones

**Files:**
- Modify: `src/components/PageLayout.module.css`

**Why:** The decorative `✦ ✦ ✦` star ornament line in every page header consumes a full line of vertical space (≈1.2rem + gap). On 480px phones with content-heavy pages this pushes content below the fold. The chapter label, title, and subtitle remain untouched. Only the stars are hidden at the smallest breakpoint.

- [ ] **Step 1: Update the `≤480px` block**

Find this rule in the `@media (max-width: 480px)` block:
```css
  .ornament {
    letter-spacing: 0.28rem;
  }
```

Replace with:
```css
  .ornament {
    display: none;
  }
```

Also find the `.header` rule in the same `≤480px` block:
```css
  .header {
    gap: 0.20rem;
    padding-top: 0.40rem;
    padding-bottom: 0.22rem;
  }
```

Replace with:
```css
  .header {
    gap: 0.18rem;
    padding-top: 0.35rem;
    padding-bottom: 0.20rem;
  }
```

- [ ] **Step 2: Verify at 390px**

Navigate to WelcomePage. The `✦ ✦ ✦` ornament should be gone. The title, chapter label, subtitle, and bottom separator line should all still show. The header should feel compact but not cramped.

Navigate to a second page (e.g. TraitDefinitionPage). Confirm the ornament is hidden and the header content still has breathing room.

At 769px width, confirm the ornament returns (it's only hidden at ≤480px).

- [ ] **Step 3: Commit**

```bash
git add src/components/PageLayout.module.css
git commit -m "fix(mobile): hide decorative ornament on ≤480px to save vertical space"
```

---

### Task 5: ContentBlock — tighten line-height and padding

**Files:**
- Modify: `src/components/ContentBlock.module.css`

**Why:** `.body` line-height was `2.0` on desktop, reduced to `1.85` on mobile. Still loose for a phone. `1.72` is comfortable for Hebrew body text on mobile — readable without feeling compressed. The `.highlight` block's generous left padding and `.quote` padding also shrink proportionally.

- [ ] **Step 1: Replace the `≤768px` block**

Find this block in `src/components/ContentBlock.module.css`:
```css
/* ── Mobile ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .block {
    max-width: 100%;
  }

  .highlight {
    padding: var(--sp-3) var(--sp-4) var(--sp-3) var(--sp-5);
    font-size: var(--t-sm);
  }

  .body {
    line-height: 1.85;
  }
}
```

Replace with:
```css
/* ── Mobile ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .block {
    max-width: 100%;
  }

  .body {
    line-height: 1.72;
  }

  .highlight {
    padding: var(--sp-3) var(--sp-3) var(--sp-3) var(--sp-4);
    font-size: var(--t-sm);
  }

  .quote {
    padding: var(--sp-3) var(--sp-2);
  }
}
```

- [ ] **Step 2: Verify at 390px**

Navigate to a page that uses ContentBlock (e.g. any insight page, or BelongingPage). Check:
- Body text reads comfortably — not too tight, not overly spacious
- Highlight blocks have balanced padding on all sides
- Quote blocks have tighter vertical padding without looking cramped

- [ ] **Step 3: Commit**

```bash
git add src/components/ContentBlock.module.css
git commit -m "fix(mobile): tighten ContentBlock line-height and padding for mobile reading"
```

---

### Task 6: ImageBlock — height constraint and hover guard

**Files:**
- Modify: `src/components/ImageBlock.module.css`

**Why:** ImageBlock has no `@media` block at all. On mobile, images with no height constraint can consume 70–80% of the screen. The `max-height` on mobile ensures images never dominate vertical space. The `@media (hover: hover)` guard prevents the `translateY` lift from sticking on touch devices (on iOS, `:hover` fires on tap and can stay applied).

- [ ] **Step 1: Guard the hover rules**

Find this rule in `src/components/ImageBlock.module.css`:
```css
.frame:hover {
  box-shadow:
    inset 0 0 0 5px rgba(255, 255, 255, 0.80),
    inset 0 0 0 6px var(--c-page-accent-border),
    0 14px 44px rgba(0, 0, 0, 0.15),
    0 5px 14px  rgba(0, 0, 0, 0.09),
    0 2px 5px   rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}
```

Replace with:
```css
@media (hover: hover) {
  .frame:hover {
    box-shadow:
      inset 0 0 0 5px rgba(255, 255, 255, 0.80),
      inset 0 0 0 6px var(--c-page-accent-border),
      0 14px 44px rgba(0, 0, 0, 0.15),
      0 5px 14px  rgba(0, 0, 0, 0.09),
      0 2px 5px   rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
}
```

Find the `.frame:hover .img` rule:
```css
.frame:hover .img {
  filter: sepia(0.04) contrast(1.03) brightness(1.02);
}
```

Replace with:
```css
@media (hover: hover) {
  .frame:hover .img {
    filter: sepia(0.04) contrast(1.03) brightness(1.02);
  }
}
```

- [ ] **Step 2: Add the mobile `max-height` block**

At the end of `src/components/ImageBlock.module.css`, add:
```css
/* ── Mobile: constrain image height, images must not dominate the page ── */
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

- [ ] **Step 3: Verify**

At 390px, navigate to a page with an ImageBlock (e.g. BelongingPage which uses a photo frame). Check:
- Image does not consume more than ~40% of the viewport height
- Photo is still clearly visible and well-framed
- No hover lift visible when tapping the image

On desktop (1280px), verify the image frames still lift on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/ImageBlock.module.css
git commit -m "fix(mobile): constrain ImageBlock height and guard hover with (hover: hover)"
```

---

### Task 7: InfoCard — guard hover transforms

**Files:**
- Modify: `src/components/InfoCard.module.css`

**Why:** `card:hover { transform: translateY(-5px) }` fires on tap on iOS and can stay in the lifted state until another element is tapped. This makes the card look accidentally selected. Wrapping in `@media (hover: hover)` ensures it only activates on pointer-capable (non-touch) devices.

- [ ] **Step 1: Guard the card hover rule**

Find:
```css
.card:hover {
  transform: translateY(-5px);
  border-color: var(--c-page-accent);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.11),
    0 4px 10px  rgba(0, 0, 0, 0.07);
}
```

Replace with:
```css
@media (hover: hover) {
  .card:hover {
    transform: translateY(-5px);
    border-color: var(--c-page-accent);
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.11),
      0 4px 10px  rgba(0, 0, 0, 0.07);
  }
}
```

- [ ] **Step 2: Guard the icon hover rule**

Find:
```css
.card:hover .icon {
  transform: scale(1.10) translateY(-2px);
}
```

Replace with:
```css
@media (hover: hover) {
  .card:hover .icon {
    transform: scale(1.10) translateY(-2px);
  }
}
```

- [ ] **Step 3: Verify**

At 390px, tap on an InfoCard (e.g. on a page with facts or info cards). The card should not lift or stay elevated. On desktop, hover over a card — it should still lift smoothly.

- [ ] **Step 4: Commit**

```bash
git add src/components/InfoCard.module.css
git commit -m "fix(mobile): guard InfoCard hover transforms with (hover: hover)"
```

---

### Task 8: TraitCard — guard hover transforms

**Files:**
- Modify: `src/components/TraitCard.module.css`

**Why:** Same sticky-hover problem as InfoCard. TraitCard has five separate hover rules scattered through the file — consolidate all five into a single `@media (hover: hover)` block at the end of the file.

- [ ] **Step 1: Remove `.card:hover` and `.card:hover::after`**

Find:
```css
.card:hover {
  box-shadow:
    0 8px 28px rgba(0, 0, 0, 0.12),
    0 3px 8px  rgba(0, 0, 0, 0.07);
  transform: translateY(-3px);
  border-color: var(--tc);
}

.card:hover::after {
  right: 120%;
}
```

Replace with (remove both — they'll be added in the guard block in Step 5):
```css
```

(Delete these two rules entirely — leave a blank line in their place.)

- [ ] **Step 2: Remove `.card:hover .rule`**

Find:
```css
.card:hover .rule {
  width: 2.8rem;
  opacity: 0.92;
}
```

Replace with (delete):
```css
```

- [ ] **Step 3: Remove `.card:hover .illustration`**

Find:
```css
.card:hover .illustration {
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
  transform: scale(1.04);
}
```

Replace with (delete):
```css
```

- [ ] **Step 4: Remove `.card:hover .mainEmoji`**

Find:
```css
.card:hover .mainEmoji {
  transform: scale(1.08) rotate(3deg);
}
```

Replace with (delete):
```css
```

- [ ] **Step 5: Add consolidated hover guard block at end of file**

At the very end of `src/components/TraitCard.module.css`, after the `@media (max-width: 768px)` block, add:
```css
/* ── Hover effects — pointer devices only (not touch) ───── */
@media (hover: hover) {
  .card:hover {
    box-shadow:
      0 8px 28px rgba(0, 0, 0, 0.12),
      0 3px 8px  rgba(0, 0, 0, 0.07);
    transform: translateY(-3px);
    border-color: var(--tc);
  }

  .card:hover::after {
    right: 120%;
  }

  .card:hover .rule {
    width: 2.8rem;
    opacity: 0.92;
  }

  .card:hover .illustration {
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.45);
    transform: scale(1.04);
  }

  .card:hover .mainEmoji {
    transform: scale(1.08) rotate(3deg);
  }
}
```

- [ ] **Step 6: Verify**

At 390px, navigate to TraitsPage. Tap a trait card — it should not lift or change visually. On desktop at 1280px, hover over a trait card — the lift, border color, illustration scale, and emoji rotation should all still work.

- [ ] **Step 7: Commit**

```bash
git add src/components/TraitCard.module.css
git commit -m "fix(mobile): consolidate TraitCard hover effects into (hover: hover) guard"
```

---

### Task 9: FloatingMenu and HamburgerButton — touch target and animation

**Files:**
- Modify: `src/components/FloatingMenu.module.css`
- Modify: `src/components/HamburgerButton.module.css`

**Why:** The PDF download button in FloatingMenu lacks an explicit minimum touch height. The HamburgerButton's `backdrop-filter: blur(14px)` is expensive on mobile GPU — reducing it to `blur(10px)` is visually imperceptible but meaningfully cheaper.

- [ ] **Step 1: Add `min-height` to `.downloadBtn`**

In `src/components/FloatingMenu.module.css`, find the `.downloadBtn` rule and add `min-height: 44px;` to it:

Find:
```css
.downloadBtn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.65rem 0.80rem;
  border: 1px solid transparent;
```

Replace with:
```css
.downloadBtn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 44px;
  padding: 0.65rem 0.80rem;
  border: 1px solid transparent;
```

- [ ] **Step 2: Reduce backdrop blur on HamburgerButton for mobile**

At the end of `src/components/HamburgerButton.module.css`, add:
```css
/* ── Mobile: reduce backdrop-filter cost ────────────────── */
@media (max-width: 768px) {
  .btn {
    backdrop-filter: blur(10px) saturate(1.1);
    -webkit-backdrop-filter: blur(10px) saturate(1.1);
  }
}
```

- [ ] **Step 3: Add global video and iframe overflow safety to `src/styles/index.css`**

At the end of the `src/styles/index.css` file, after the `::selection` block, add:
```css
/* ── Mobile: media overflow safety ───────────────────────── */
@media (max-width: 768px) {
  video,
  audio,
  iframe,
  embed,
  object {
    max-width: 100%;
  }

  video {
    height: auto;
  }

  iframe {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
}
```

This is a global safety net — it ensures any video, audio player, or iframe embedded in any page can never overflow the narrow screen.

- [ ] **Step 4: Verify**

Open the floating menu on mobile. Tap the PDF download button — the tap target should be comfortably large. The hamburger button should still look sharp and blurred-glass. Any video or iframe on a page should not overflow the viewport.

- [ ] **Step 5: Commit**

```bash
git add src/components/FloatingMenu.module.css src/components/HamburgerButton.module.css src/styles/index.css
git commit -m "fix(mobile): 44px touch target, reduce backdrop-filter blur, global media safety"
```

---

### Task 10: Per-page audit — FamilyTreePage and FamilyComicPage

**Files:**
- Possibly modify: `src/pages/FamilyTreePage.module.css`
- Possibly modify: `src/pages/FamilyComicPage.module.css`

**Audit methodology for every page in Tasks 10–13:**
1. Navigate to the page in Chrome at 390px width
2. Check the 7 criteria below
3. If a criterion fails, apply the fix pattern shown. If all pass, no edit needed.

**7 audit criteria:**
1. No horizontal scrollbar (check `document.documentElement.scrollWidth > 390`)
2. No content clipped at screen edges
3. Body text ≥14px, comfortable line-height
4. All `flex-direction: row` layouts have collapsed to column
5. No giant empty regions (whitespace ≥ 40% of viewport height with no content)
6. Images/media fit within the page without dominating (< 45% of screen height)
7. All interactive elements have adequate tap size (visually ≥ 44px)

---

#### FamilyTreePage

- [ ] **Step 1: Check at 390px**

Navigate to the FamilyTreePage (family roots tree visualization). The `.wrap` container has `aspect-ratio: 1000/900` and `min-height: 540px` on mobile. Nodes are absolutely positioned using percentage-based `left` values.

Check criterion 1 specifically: open DevTools console and run:
```js
document.documentElement.scrollWidth > document.documentElement.clientWidth
```
If `true`, horizontal overflow exists.

- [ ] **Step 2: Fix if overflow found**

If horizontal overflow is present, add to the `@media (max-width: 768px)` block in `FamilyTreePage.module.css`:
```css
  .wrap {
    min-height: 540px;
    overflow-x: hidden;  /* add this */
  }
```

If nodes are being clipped by the hidden overflow, change to `overflow-x: auto` instead to allow horizontal scroll within the tree container.

- [ ] **Step 3: Check whitespace**

The `.wrap` uses `aspect-ratio: 1000/900`. At 390px wide, this makes the container 390 × (900/1000) = 351px tall — but `min-height: 540px` overrides this, making it 540px. Verify the tree fills the 540px container without large empty areas at the bottom. If the tree nodes are clustered at the top with a large empty bottom, reduce `min-height` in the `≤768px` block:
```css
@media (max-width: 768px) {
  .wrap {
    min-height: 460px;  /* reduce from 540px if tree doesn't fill the space */
  }
  ...
}
```

#### FamilyComicPage

- [ ] **Step 4: Check at 390px**

Navigate to FamilyComicPage. The existing `≤768px` block sets `.stage { max-width: 100% }` and `.bubble { max-width: 92% }`. Check all 7 criteria.

- [ ] **Step 5: Fix if needed**

The comic stage is a single-column vertical layout — this should already work. If the comic image/panel overflows or looks cramped, check whether the `.panel` or image element inside has a fixed `width` or `min-width`. If so, add inside the `≤768px` block:
```css
  .panel {
    width: 100%;
    max-width: 100%;
  }
  .panel img {
    width: 100%;
    height: auto;
  }
```

- [ ] **Step 6: Commit if any changes made**

```bash
git add src/pages/FamilyTreePage.module.css src/pages/FamilyComicPage.module.css
git commit -m "fix(mobile): audit and fix FamilyTreePage and FamilyComicPage"
```

If no changes were needed, skip the commit.

---

### Task 11: Per-page audit — NationalSymbolsPage, ThiyaRevivalPage, FamilyObjectPage

**Files:**
- Possibly modify: `src/pages/NationalSymbolsPage.module.css`
- Possibly modify: `src/pages/ThiyaRevivalPage.module.css`
- Possibly modify: `src/pages/FamilyObjectPage.module.css`

- [ ] **Step 1: NationalSymbolsPage at 390px**

Navigate to NationalSymbolsPage. The existing `≤768px` block covers wrapper padding, answer font-size, and icon opacity. Check all 7 criteria. Look specifically for:
- Anthem text lines wrapping correctly (not overflowing due to `white-space: nowrap`)
- Flag/symbol elements not overflowing their container

If any anthem or section has `white-space: nowrap`, add to the `≤768px` block:
```css
  .answer {
    white-space: normal;
    word-break: break-word;
  }
```

- [ ] **Step 2: ThiyaRevivalPage at 390px**

Navigate to ThiyaRevivalPage. This page has a `mediaRow` (`.mediaRow { flex-direction: column }` in mobile), card max-widths, and a rotated arrow. Check all 7 criteria. Pay attention to:
- The three media cards stacking cleanly in a column
- Arrow rotating to ↓ orientation (already coded)
- No horizontal overflow from fixed card widths

If cards overflow horizontally, adjust `max-width` in the existing `≤768px` block:
```css
  .card {
    max-width: min(280px, 90vw);  /* change from min(240px, 82%) if needed */
  }
```

- [ ] **Step 3: FamilyObjectPage at 390px**

Navigate to FamilyObjectPage (guitar/instrument page). The existing `≤768px` block sets `.layout { flex-direction: column }` and `.guitarCol { width: clamp(110px, 46vw, 170px) }`. Check all 7 criteria. This page stacks the image above the text — verify the guitar image appears above the text sections and the text is readable below.

The `.para` rule in the mobile block has `line-height: 2.0` — this is intentional (generous reading for this page). Leave it as-is unless the whitespace feels excessive.

- [ ] **Step 4: Commit if any changes made**

```bash
git add src/pages/NationalSymbolsPage.module.css src/pages/ThiyaRevivalPage.module.css src/pages/FamilyObjectPage.module.css
git commit -m "fix(mobile): audit NationalSymbolsPage, ThiyaRevivalPage, FamilyObjectPage"
```

---

### Task 12: Per-page audit — WhoIsMyFamilyPage, PersonalPoemPage, FamilyGenerationsPage

**Files:**
- Possibly modify: `src/pages/WhoIsMyFamilyPage.module.css`
- Possibly modify: `src/pages/PersonalPoemPage.module.css`
- Possibly modify: `src/pages/FamilyGenerationsPage.module.css`

- [ ] **Step 1: WhoIsMyFamilyPage at 390px**

Navigate to WhoIsMyFamilyPage. The `≤768px` block sets wrapper padding to `clamp(1.2rem, 4vh, 2.2rem) clamp(1.0rem, 4vw, 1.6rem)`. At 390px, `4vw = 15.6px`, so horizontal padding is `clamp(1.0rem, 4vw, 1.6rem) = 16px`. Check all 7 criteria. Specifically check `para` and `memoryText` sizes — they have mobile overrides that use large `clamp()` values (`clamp(0.98rem, 4.0vw, 1.12rem)` = 16px at 390px). This is intentional generous sizing — leave as-is.

If any decorative icons (`.iconFamily`, `.iconMom`, `.iconGrowth`) overflow the viewport, add to the `≤768px` block:
```css
  .iconFamily,
  .iconMom,
  .iconGrowth {
    font-size: clamp(3rem, 10vw, 5rem);
  }
```

- [ ] **Step 2: PersonalPoemPage at 390px**

Navigate to PersonalPoemPage. The `≤768px` block sets `.line { white-space: normal; line-height: 1.65 }`. Check:
- Poem lines wrap naturally (no `white-space: nowrap` causing overflow)
- The audio player (`.playerWrap { max-width: 94% }`) fits within the screen
- Letter-spacing on poem lines doesn't cause overflow (Hebrew poetry may have wide character spacing)

If any `.line` has explicit `letter-spacing` that causes horizontal overflow, add to the `≤768px` block:
```css
  .line {
    letter-spacing: normal;
  }
```

- [ ] **Step 3: FamilyGenerationsPage at 390px**

Navigate to FamilyGenerationsPage. This is a complex genealogy tree. The `≤768px` block already handles most cases. Specifically check:
- Gen 3 cards side-by-side within their subgroup (expected: 2 cards per row at `clamp(108px, 40vw, 145px)` each)
- Gen 4 cards in 2×2 grid (expected: `clamp(172px, 72vw, 210px)` width)
- No horizontal scroll at the page level

If the Gen 3 subgroup pairs are overflowing, reduce the min-width in the `≤768px` block:
```css
  .gen3 .card { min-width: clamp(90px, 36vw, 130px); }
```

- [ ] **Step 4: Commit if any changes made**

```bash
git add src/pages/WhoIsMyFamilyPage.module.css src/pages/PersonalPoemPage.module.css src/pages/FamilyGenerationsPage.module.css
git commit -m "fix(mobile): audit WhoIsMyFamilyPage, PersonalPoemPage, FamilyGenerationsPage"
```

---

### Task 13: Per-page audit — all remaining 46 book pages

**Files:**
- Possibly modify: any of the remaining `src/pages/*.module.css` files

Navigate through every remaining book page at 390px. Apply the 7 audit criteria to each. The pages below are organized by risk category. Most will pass all criteria after the Phase 1 token cascade.

**Group A — pages with existing full `flex-direction: column` mobile handling (verify only):**
`BusinessCardPage`, `MyStoryPage`, `FutureAspirationsPage`, `EarlyChildhoodPage`, `NameResearchPage`, `BelongingPage`, `PersonalInsightPage`, `ChildhoodPage`, `FamilyMapPage`, `FamilyRolePage`, `CommunityPage`, `AboutMePage`, `InfancyPage`, `FamilyTreeInsightPage`

For each: check all 7 criteria. If all pass, move on. No edit needed.

**Group B — insight/story/summary pages (low risk):**
`GrowthIdentityPage`, `FamilyNameInsightPage`, `FamilyNamePersonalInsightPage`, `FamilyPastInsightPage`, `FamilyJourneyInsightPage`, `FamilyJourneyPage`, `FamilyMasaPage`, `FamilyMigrationNarrativePage`, `LifeStoryInsightPage`, `PeopleIdentityInsightPage`, `JourneySummaryPage`, `CommunitySummaryPage`, `CommunityInsightPage`, `CommunityPersonalInsightPage`, `CommunityVentureIdeaPage`, `CommunityVisitPage`, `CommunityContributionPage`, `CitizenshipInsightPage`, `MemorialDayInsightPage`, `SensitivityInsightPage`, `ImprovementPage`, `OthersViewPage`, `FamilyNameStoryPage`, `FamilyNamePersonalPage`, `FamilyNameFactsPage`, `FamilyNameResearchPage`, `NameFactsPage`, `NameMeaningPage`, `NameSummaryPage`, `TraitSelectionPage`, `TraitDefinitionPage`, `LogoPage`, `WelcomePage`, `BatMitzvahPage`, `MyNamePage`

For each: verify criteria 1 (no horizontal scroll) and 3 (readable text). If those pass, do a quick visual check of the layout. Only investigate further if something looks clearly off.

**Common fix pattern for any remaining issues:**

If a page has a `flex-direction: row` section that didn't get a mobile override, add to its `≤768px` block:
```css
  .theRowClass {
    flex-direction: column;
  }
```

If a page has excessive whitespace (criterion 5 fails), check if it has a hard-coded `gap`, `margin`, or `padding` in rem that doesn't use the CSS token. Replace with the equivalent token or reduce with a mobile override:
```css
  .theSection {
    gap: var(--sp-4);   /* replaces a hard-coded gap that's too large */
  }
```

If a page has an element with a fixed pixel `width` causing overflow:
```css
  .theElement {
    width: 100%;
    max-width: 100%;
  }
```

- [ ] **Step 1: Audit Group A pages**

Navigate to each Group A page at 390px. Check criteria 1, 2, 4. Mark any that fail.

- [ ] **Step 2: Audit Group B pages**

Navigate to each Group B page at 390px. Check criteria 1 and 3. Mark any that fail.

- [ ] **Step 3: Apply fixes for any failures found**

For each failing page, apply the appropriate fix pattern above.

- [ ] **Step 4: Commit all per-page fixes together**

```bash
git add src/pages/
git commit -m "fix(mobile): per-page audit fixes for remaining book pages"
```

---

### Task 14: AIChatPage and MiznePage audit

**Files:**
- Possibly modify: `src/pages/AIChatPage.module.css`
- Possibly modify: `src/pages/MiznePage.jsx` or related CSS

**Important:** `AIChatPage` and `MiznePage` are standalone fullscreen sections rendered outside `BookLayout`. They manage their own viewport. `height: 100dvh` in `AIChatPage` is correct — it's the full dynamic viewport height.

- [ ] **Step 1: AIChatPage keyboard test on iOS**

Open AIChatPage (hamburger → "צ׳אט AI"). In Chrome DevTools, enable mobile device emulation at 390×844. Click into the chat input. Verify:
- The input field scrolls into view when the keyboard opens (the `100dvh` contracts)
- The chat message area shrinks upward, keeping the input bar visible
- Messages are still scrollable in the contracted space

If the input is hidden behind the keyboard, the fix is to add `padding-bottom` to `.inputBar`:
```css
@media (max-width: 768px) {
  .inputBar {
    padding-bottom: max(0.85rem, env(safe-area-inset-bottom, 0px));
  }
}
```
(The existing rule already has `calc(0.85rem + env(safe-area-inset-bottom, 0px))` — verify it's working.)

- [ ] **Step 2: AIChatPage at 390px visual check**

Check all 7 audit criteria. Specifically:
- Chat bubbles at `max-width: 85%` — verify they don't overflow
- Suggestion chips at the top — verify they wrap or scroll without overflow
- Input bar height — verify `height: 46px` is a comfortable tap target
- Send button — verify it's ≥44px

- [ ] **Step 3: MiznePage at 390px**

Navigate to MiznePage (hamburger → "המיזם שלי"). Apply all 7 audit criteria. This is a standalone page so it manages its own layout entirely. Look for:
- Any fixed-width containers that overflow at 390px
- Images or media that don't scale
- Text that's too small (check against the ≥14px criterion)

Apply fixes as needed using the same patterns from Task 13.

- [ ] **Step 4: AIChatPage 430px and 768px**

Resize to 430px, check no regressions. Resize to 768px, check no regressions. Verify the chat UI looks proportionate at all three widths.

- [ ] **Step 5: Commit if changes made**

```bash
git add src/pages/AIChatPage.module.css src/pages/MiznePage.jsx
git commit -m "fix(mobile): audit and fix AIChatPage and MiznePage"
```

---

### Task 15: Final QA pass — 390px, 430px, 768px + desktop regression

**Files:**
- No changes (read-only verification)

This task has no code changes. It's a systematic pass through the entire app verifying the complete checklist from the spec.

- [ ] **Step 1: Full check at 390px (iPhone SE / older iPhones)**

Navigate every page at 390px. Verify:
- [ ] No horizontal scroll on any page (check via DevTools console: `document.documentElement.scrollWidth > 390`)
- [ ] No clipped content at screen edges
- [ ] No desktop layout leakage (no side-by-side columns)
- [ ] Body text comfortable (≥14px, good line-height)
- [ ] Titles proportionate
- [ ] Cards and sections feel "calm digital book", not "dense dashboard"
- [ ] Images within comfortable proportions
- [ ] Swipe left/right still navigates book pages
- [ ] FloatingMenu opens and PDF download button tappable
- [ ] AIChatPage: input visible, keyboard safe

- [ ] **Step 2: Full check at 430px (iPhone 14 Pro Max)**

Resize to 430px. Spot-check 10 representative pages (WelcomePage, InfancyPage, TraitsPage, FamilyTreePage, BusinessCardPage, PersonalPoemPage, FamilyGenerationsPage, NationalSymbolsPage, AIChatPage, MiznePage). Verify no regressions from the 390px pass.

- [ ] **Step 3: Full check at 768px (tablet / large phone)**

Resize to 768px. Check that:
- Book pages show the desktop layout (Navigation pill visible again)
- Grid layouts use their 2-column variants (not single column)
- Type scale is at its ceiling values (not mobile floors)
- Ornament (`✦ ✦ ✦`) is visible again (it's only hidden at ≤480px)

- [ ] **Step 4: Desktop regression check at 1280px**

Resize to 1280px. Spot-check 5 pages. Verify:
- Visual appearance is identical to before this work
- Navigation pill visible and functional
- All two-column layouts present
- All hover effects working (lift on card hover, trait card animations)
- No unexpected spacing changes

- [ ] **Step 5: Fix any regressions found**

Apply targeted fixes. Commit:
```bash
git add -p   # stage only the specific regression fixes
git commit -m "fix(mobile): final QA regression fixes"
```

- [ ] **Step 6: Final commit confirming QA passed**

```bash
git commit --allow-empty -m "chore: mobile UX recovery QA complete — 390/430/768px verified"
```

---

## Summary

| Phase | Tasks | Files touched |
|-------|-------|---------------|
| 1. Token cascade | 2 | `src/styles/index.css` |
| 2. Shared components | 3–9 | 7 component CSS files |
| 3. Per-page audit | 10–14 | Subset of page CSS files |
| 4. Final QA | 15 | None (verification only) |

**Desktop changes:** Zero. Every rule is inside `@media (max-width: 768px)`, `@media (max-width: 480px)`, or `@media (hover: hover)`.

# Page 23 Desktop Image Sizing — Design Spec

**Date:** 2026-05-11
**Page:** 23 — MyStoryPage ("הסיפור שלי – עבר, הווה ועתיד")
**File:** `src/pages/MyStoryPage.module.css`

---

## Problem

On desktop, the image on page 23 is too small. The layout allocates a full-height left column for the image, but the image is constrained by a fixed `aspect-ratio: 4/5` applied to `.imageFrame`, and `.imageCol` uses `align-items: center` — so the frame only grows as tall as its width allows (~337px at max-width 270px). The content area is ~500–600px tall on a typical desktop, leaving large empty gaps above and below the photo.

---

## Solution: Full-height fill (desktop only)

Make the image fill the entire available height of its column, using `object-fit: cover` to crop gracefully.

### Changes to `MyStoryPage.module.css`

**`.imageCol`**
- Change `align-items: center` → `align-items: stretch`
- Optionally bump max-width from `270px` → `300px` for slightly more presence
- Everything else stays

**`.imageFrame`**
- Remove `aspect-ratio: 4/5`
- Add `height: 100%`
- `overflow: hidden` and `border-radius` stay unchanged

**`.photo`**
- No changes. `width: 100%; height: 100%; object-fit: cover; object-position: top center` already fills any frame correctly.

### What does NOT change
- Mobile `@media (max-width: 768px)` already overrides `.imageCol` and `.imageFrame` with a fixed-height horizontal strip — completely untouched.
- No content, data, or other page files are modified.
- The content column (`.contentCol`) and the three section cards are unchanged.

---

## Expected result

On desktop, the photo stretches from near the top to the bottom of the content area (~500–600px tall vs ~337px today), while keeping the same column width. The image becomes the dominant visual anchor on the right side of the page, balanced against the three timeline cards on the left.

---

## Constraints

- Desktop only — mobile must not change
- No cropping of the subject (ensured by `object-position: top center`)
- No layout breakage on other pages (change is scoped to `MyStoryPage.module.css`)

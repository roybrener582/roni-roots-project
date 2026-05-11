# Mobile Header Hamburger Clearance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add vertical and horizontal clearance to the `PageLayout` header on mobile so the floating hamburger button never overlaps the page title or ornamental stars on any of the 60+ book pages.

**Architecture:** Single CSS file change — `PageLayout.module.css`. Both mobile media query blocks (`≤768px` and `≤480px`) get updated `.header` padding values plus a `.compact .header` specificity override. No JSX, no new files, no desktop impact.

**Tech Stack:** CSS Modules, `max()` / `env(safe-area-inset-*)` for safe-area-aware spacing.

---

## Files

- **Modify:** `src/components/PageLayout.module.css`
  - Lines 175–184: `@media (max-width: 768px)` `.header` rule
  - Lines 221–231: `@media (max-width: 480px)` `.header` rule
  - Add `.compact .header` overrides inside both media query blocks

---

## Reference: clearance values

These values are derived from `HamburgerButton.module.css` and match the pattern already used in `AIChatPage.module.css` and `HomeScreen.module.css`:

| Property | Value |
|---|---|
| `padding-top` | `max(70px, calc(env(safe-area-inset-top, 0px) + 62px))` |
| `padding-right` | `max(68px, calc(env(safe-area-inset-right, 0px) + 60px))` |

Derivation:
- Vertical: button `top` 18px + button `height` 44px + 8px gap = 70px baseline; `env(safe-area-inset-top)` scales it for notched iPhones
- Horizontal: button `right` 16px + button `width` 44px + 8px gap = 68px baseline; uses physical `padding-right` because the button uses physical `right`

---

## Task 1: Fix `.header` clearance in the ≤768px media query

**Files:**
- Modify: `src/components/PageLayout.module.css` (lines 175–184 and end of the `@media (max-width: 768px)` block)

- [ ] **Step 1: Update `.header` padding-top and add padding-right**

In `src/components/PageLayout.module.css`, find the `@media (max-width: 768px)` block (around line 175). Replace the `.header` rule:

```css
/* BEFORE */
.header {
  gap: 0.25rem;
  padding-top: 0.50rem;
  padding-bottom: 0.28rem;
}
```

With:

```css
/* AFTER */
.header {
  gap: 0.25rem;
  padding-top: max(70px, calc(env(safe-area-inset-top, 0px) + 62px));
  padding-bottom: 0.28rem;
  padding-right: max(68px, calc(env(safe-area-inset-right, 0px) + 60px));
}
```

- [ ] **Step 2: Add `.compact .header` override inside the same media query block**

The `.compact .header` rule defined outside the media query (around line 143) has higher CSS specificity (two classes vs one) and will override the `.header` rule above on compact-variant pages. Add this rule at the end of the `@media (max-width: 768px)` block, just before its closing `}`:

```css
  /* Compact pages need the same hamburger clearance — higher specificity requires explicit override */
  .compact .header {
    padding-top: max(70px, calc(env(safe-area-inset-top, 0px) + 62px));
    padding-right: max(68px, calc(env(safe-area-inset-right, 0px) + 60px));
  }
```

- [ ] **Step 3: Verify in browser at 375px width**

Start the dev server (`npm run dev`) and open any standard page (e.g., `/` welcome page). In browser devtools, set viewport to 375×812 (iPhone SE / 14 dimensions).

Expected: page title and ornamental stars sit entirely below the hamburger button with visible breathing room. The hamburger button is fully visible at top-right with no text behind it.

Also open a compact-variant page (e.g., MyNamePage). Expected: same clearance.

- [ ] **Step 4: Commit**

```bash
git add src/components/PageLayout.module.css
git commit -m "fix(mobile): clear hamburger button overlap in PageLayout ≤768px"
```

---

## Task 2: Fix `.header` clearance in the ≤480px media query

**Files:**
- Modify: `src/components/PageLayout.module.css` (lines 221–231 and end of the `@media (max-width: 480px)` block)

- [ ] **Step 1: Update `.header` padding-top and add padding-right**

In `src/components/PageLayout.module.css`, find the `@media (max-width: 480px)` block (around line 221). Replace the `.header` rule:

```css
/* BEFORE */
.header {
  gap: 0.18rem;
  padding-top: 0.35rem;
  padding-bottom: 0.20rem;
}
```

With:

```css
/* AFTER */
.header {
  gap: 0.18rem;
  padding-top: max(70px, calc(env(safe-area-inset-top, 0px) + 62px));
  padding-bottom: 0.20rem;
  padding-right: max(68px, calc(env(safe-area-inset-right, 0px) + 60px));
}
```

- [ ] **Step 2: Add `.compact .header` override inside the same media query block**

Add this rule at the end of the `@media (max-width: 480px)` block, just before its closing `}`:

```css
  /* Compact pages need the same hamburger clearance — higher specificity requires explicit override */
  .compact .header {
    padding-top: max(70px, calc(env(safe-area-inset-top, 0px) + 62px));
    padding-right: max(68px, calc(env(safe-area-inset-right, 0px) + 60px));
  }
```

- [ ] **Step 3: Verify in browser at 360px width**

In devtools, set viewport to 360×780 (small Android / iPhone SE small). Check a standard page and a compact page.

Expected: same clean clearance — title and stars below the button, no overlap. Also verify that 768px+ viewports are completely unaffected (desktop layout unchanged).

- [ ] **Step 4: Commit**

```bash
git add src/components/PageLayout.module.css
git commit -m "fix(mobile): clear hamburger button overlap in PageLayout ≤480px"
```

---

## Self-review

**Spec coverage:**
- ✅ `≤768px` `.header` — Task 1, Steps 1–2
- ✅ `≤480px` `.header` — Task 2, Steps 1–2
- ✅ `.compact .header` specificity override — Task 1 Step 2, Task 2 Step 2
- ✅ Safe-area-aware values — both tasks use `env(safe-area-inset-*)` in `max()`
- ✅ Desktop untouched — all changes inside mobile media queries
- ✅ AIChatPage / MiznePage excluded — out of scope, already correct

**Placeholder scan:** No TBDs, no vague steps. All code is complete and exact.

**Type consistency:** CSS only — no type mismatches possible. Property names are identical in both tasks.

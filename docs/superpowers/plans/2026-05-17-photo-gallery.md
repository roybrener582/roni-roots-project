# Photo Gallery Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Insert a standalone "גלריית תמונות" gallery page as page 41 in the digital book, displaying all images from `public/pic/` via a Vite virtual module, with CSS masonry layout, lazy loading, and a lightbox.

**Architecture:** A Vite build-time plugin scans `public/pic/` and exposes `virtual:gallery-images` — an array of encoded public URLs. `PhotoGalleryPage.jsx` imports that array and renders a CSS `column-count` masonry grid with per-image fade-in and a fullscreen lightbox. The page is wired into `pagesConfig.js` as the new page 41; the 19 pages formerly numbered 41–59 shift to 42–60.

**Tech Stack:** React 18, Vite 4+, CSS Modules, Node `fs.readdirSync` (build-time only)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `vite.config.js` | Add `galleryImagesPlugin()` — build-time image discovery |
| Create | `src/pages/PhotoGalleryPage.module.css` | All gallery styles: grid, items, fade-in, lightbox |
| Create | `src/pages/PhotoGalleryPage.jsx` | Gallery page component + GalleryItem + Lightbox |
| Modify | `src/data/pagesConfig.js` | Register page, shift hebrewNumbers 41–59 → 42–60 |

> ⚠️ **Order matters:** Tasks 1–4 must run in sequence. Task 3 imports from `virtual:gallery-images` (registered in Task 1). Task 4 imports `PhotoGalleryPage` (created in Task 3).

---

## Task 1: Vite virtual module plugin

**Files:**
- Modify: `vite.config.js`

This plugin runs at build time (and dev server start). It reads `public/pic/`, filters to image files, encodes filenames, and exposes the list as the virtual module `virtual:gallery-images`. It also watches the directory for HMR.

> The project has `"type": "module"` in `package.json`, so `__dirname` is not available — use `fileURLToPath` instead.

- [ ] **Step 1: Replace `vite.config.js` with the following**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;
const VIRTUAL_ID = 'virtual:gallery-images';
const RESOLVED_ID = '\0virtual:gallery-images';

function galleryImagesPlugin() {
  return {
    name: 'gallery-images',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const dir = resolve(__dirname, 'public/pic');
      const urls = readdirSync(dir)
        .filter(f => IMAGE_EXT.test(f))
        .map(f => encodeURI('/pic/' + f));
      return `export default ${JSON.stringify(urls)};`;
    },
    configureServer(server) {
      const dir = resolve(__dirname, 'public/pic');
      server.watcher.add(dir);
      server.watcher.on('all', (event, file) => {
        if (file.startsWith(dir)) {
          const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
          if (mod) server.moduleGraph.invalidateModule(mod);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [galleryImagesPlugin(), react()],
  test: {
    environment: 'node',
    include: ['api/__tests__/**/*.test.js'],
  },
});
```

- [ ] **Step 2: Verify the plugin resolves at dev server start**

Run:
```bash
npm run dev
```

Open browser DevTools → Console. No errors about `virtual:gallery-images` should appear at this stage (the import is in a page not yet registered — just confirming the server starts without crashing).

Expected: Dev server starts on `http://localhost:5173` with no errors.

- [ ] **Step 3: Commit**

```bash
git add vite.config.js
git commit -m "feat: add galleryImagesPlugin virtual module for public/pic discovery"
```

---

## Task 2: Gallery page styles

**Files:**
- Create: `src/pages/PhotoGalleryPage.module.css`

**Scroll model context:**
- Desktop (≥769px): `BookPage .page` scrolls with `overflow-y: auto` — the gallery grid just flows naturally
- Mobile (≤768px): `BookPage .page` is `overflow: hidden`; `PageLayout .main` is the scroll container (`overflow-y: auto`, `min-height: 0`) — the grid scrolls via `.main`
- The gallery grid needs only `width: 100%` — no custom scroll wrapper

- [ ] **Step 1: Create `src/pages/PhotoGalleryPage.module.css`**

```css
/* ── Masonry grid ───────────────────────────────────────── */
.grid {
  width: 100%;
  column-count: 3;
  column-gap: 10px;
  padding: 0 2px 16px;
  box-sizing: border-box;
}

@media (max-width: 1023px) {
  .grid {
    column-count: 2;
    column-gap: 8px;
  }
}

@media (max-width: 399px) {
  .grid {
    column-count: 1;
  }
}

/* ── Image card ─────────────────────────────────────────── */
.item {
  break-inside: avoid;
  display: block;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(44, 31, 14, 0.13);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.item:hover,
.item:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(44, 31, 14, 0.20);
  outline: none;
}

@media (max-width: 1023px) {
  .item {
    margin-bottom: 8px;
  }
}

@media (max-width: 399px) {
  .item {
    margin-bottom: 6px;
  }
}

/* ── Image (fades in on load) ───────────────────────────── */
.img {
  width: 100%;
  display: block;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.imgLoaded {
  opacity: 1;
}

/* ── Lightbox backdrop ──────────────────────────────────── */
.lbBackdrop {
  position: fixed;
  inset: 0;
  background: rgba(20, 12, 4, 0.90);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* ── Lightbox image box ─────────────────────────────────── */
.lbBox {
  position: relative;
  max-width: 92vw;
  max-height: 88vh;
}

.lbImg {
  display: block;
  max-width: 100%;
  max-height: 88vh;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.50);
}

/* ── Lightbox close button ──────────────────────────────── */
.lbClose {
  position: absolute;
  top: -14px;
  right: -14px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;
  font-size: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background 0.15s ease;
}

.lbClose:hover {
  background: rgba(255, 255, 255, 0.32);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/PhotoGalleryPage.module.css
git commit -m "feat: add PhotoGalleryPage styles (masonry grid, lightbox)"
```

---

## Task 3: Gallery page component

**Files:**
- Create: `src/pages/PhotoGalleryPage.jsx`

**Dependencies:** Task 1 (virtual module) and Task 2 (CSS) must be complete.

Three local components in one file:
- `Lightbox` — fullscreen overlay, closes on backdrop click or ESC
- `GalleryItem` — single image card with fade-in on load
- `PhotoGalleryPage` — page root, holds lightbox state, renders grid

- [ ] **Step 1: Create `src/pages/PhotoGalleryPage.jsx`**

```jsx
import { useState, useEffect, useCallback } from 'react';
import PageLayout from '../components/PageLayout';
import images from 'virtual:gallery-images';
import styles from './PhotoGalleryPage.module.css';

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className={styles.lbBackdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="תמונה מוגדלת"
    >
      <div className={styles.lbBox} onClick={(e) => e.stopPropagation()}>
        <img src={src} alt="" className={styles.lbImg} />
        <button className={styles.lbClose} onClick={onClose} aria-label="סגור">✕</button>
      </div>
    </div>
  );
}

function GalleryItem({ src, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={styles.item}
      onClick={() => onOpen(src)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(src)}
      aria-label="הצג תמונה"
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className={`${styles.img}${loaded ? ` ${styles.imgLoaded}` : ''}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function PhotoGalleryPage() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const handleClose = useCallback(() => setLightboxSrc(null), []);

  return (
    <PageLayout
      accent="rose"
      title="גלריית תמונות"
      subtitle="רגעים מהחיים"
    >
      <div className={styles.grid}>
        {images.map((src) => (
          <GalleryItem key={src} src={src} onOpen={setLightboxSrc} />
        ))}
      </div>
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={handleClose} />
      )}
    </PageLayout>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/PhotoGalleryPage.jsx
git commit -m "feat: add PhotoGalleryPage component with masonry grid and lightbox"
```

---

## Task 4: Register the gallery page in pagesConfig.js

**Files:**
- Modify: `src/data/pagesConfig.js`

**Dependency:** Task 3 must be complete (the import must resolve).

Two changes:
1. Add the import at the top of the file
2. Insert the gallery entry at array index 40 and increment `hebrewNumber` for the 19 displaced pages

- [ ] **Step 1: Add the import**

At the end of the import block (after line 59, the `JourneySummaryPage` import), add:

```js
import PhotoGalleryPage from '../pages/PhotoGalleryPage';
```

- [ ] **Step 2: Insert the gallery entry**

After the `family-tree` entry (currently ends at the `},` before `family-object`), insert:

```js
  {
    id: 'photo-gallery',
    component: PhotoGalleryPage,
    title: 'גלריית תמונות',
    hebrewNumber: 41,
  },
```

The array order should be: `…family-tree (hebrewNumber:40)`, then the new `photo-gallery (41)`, then `family-object`.

- [ ] **Step 3: Increment hebrewNumber for the 19 displaced pages**

Change each `hebrewNumber` as follows (find each `id` and update the number on the line below it):

| id | change |
|----|--------|
| `family-object` | `41` → `42` |
| `family-journey` | `42` → `43` |
| `family-masa` | `43` → `44` |
| `family-migration-narrative` | `44` → `45` |
| `family-journey-insight` | `45` → `46` |
| `community-insight` | `46` → `47` |
| `community` | `47` → `48` |
| `community-visit` | `48` → `49` |
| `community-contribution` | `49` → `50` |
| `community-venture-idea` | `50` → `51` |
| `community-summary` | `51` → `52` |
| `community-personal-insight` | `52` → `53` |
| `people-identity-insight` | `53` → `54` |
| `citizenship-insight` | `54` → `55` |
| `national-symbols` | `55` → `56` |
| `memorial-day-insight` | `56` → `57` |
| `bat-mitzvah` | `57` → `58` |
| `personal-poem` | `58` → `59` |
| `journey-summary` | `59` → `60` |

- [ ] **Step 4: Verify in dev server**

```bash
npm run dev
```

1. Open `http://localhost:5173`
2. Navigate to page 41 using the navigation arrows or page jump
3. Confirm: gallery page renders with "גלריית תמונות" title and "רגעים מהחיים" subtitle
4. Confirm: images appear progressively (lazy load) as you scroll
5. Click an image — lightbox should open fullscreen
6. Press ESC or click backdrop — lightbox should close
7. Navigate to page 40 (Family Tree) and page 42 (Family Object, formerly 41) — confirm they still work
8. Check total page count in navigation — should now show 60 pages

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: build completes with no errors. `dist/` is populated.

- [ ] **Step 6: Commit**

```bash
git add src/data/pagesConfig.js
git commit -m "feat: register PhotoGalleryPage as page 41, shift displaced pages to 42-60"
```

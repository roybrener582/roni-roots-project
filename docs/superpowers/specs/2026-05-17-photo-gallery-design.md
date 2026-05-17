# Photo Gallery Page — Design Spec
**Date:** 2026-05-17  
**Status:** Approved

---

## Goal

Add a standalone Photos Gallery page to the digital book (Roni Roots), inserted between the current page 40 (Family Tree) and page 41 (Family Object). The gallery displays all images from `public/pic/`, feels warm and emotional, and works well on all devices.

---

## Constraints

- Do NOT break or change any existing page, layout, navigation, swipe, or AI/chat behavior.
- Implementation must be isolated: new files only, plus two minimal changes to existing files (`pagesConfig.js`, `vite.config.js`).
- Must work on Vercel (static build).
- Must support filenames with spaces, parentheses, and WhatsApp-style naming patterns.

---

## New Files

| File | Purpose |
|------|---------|
| `src/pages/PhotoGalleryPage.jsx` | Gallery page component |
| `src/pages/PhotoGalleryPage.module.css` | Gallery page styles |

---

## Modified Files

| File | Change |
|------|--------|
| `vite.config.js` | Add isolated `galleryImagesPlugin()` |
| `src/data/pagesConfig.js` | Add import + array entry, increment hebrewNumbers 41→60 |

---

## 1. Image Discovery — Vite Virtual Module

### Plugin (`vite.config.js`)

Add a self-contained `galleryImagesPlugin()` function before the existing `react()` plugin. The plugin:

1. Registers virtual module ID `virtual:gallery-images`
2. On `load`: reads `public/pic/` with `fs.readdirSync()`, filters to image extensions (`.jpg`, `.jpeg`, `.png`, `.webp`, case-insensitive), maps each to `encodeURI('/pic/' + filename)`, returns `export default ["/pic/...", ...]`
3. Adds `configureServer` that watches `public/pic/` and invalidates the virtual module on file changes (HMR support)

### URL encoding

`encodeURI('/pic/' + filename)` handles spaces → `%20`, parentheses → `%28`/`%29`, and all other special characters. Browsers and Vercel's static CDN decode these correctly when serving.

### Build-time behavior

The image list is computed once at `vite build` time on Vercel's build server, where `public/pic/` is present. The resulting array is a string literal baked into the JS bundle. Zero runtime cost.

### Component import

```js
import images from 'virtual:gallery-images';
// images: string[]  e.g. ["/pic/WhatsApp%20Image%202026-05-14...jpeg", ...]
```

---

## 2. Page Placement (`pagesConfig.js`)

Insert at array index 40 (after `family-tree` at index 39):

```js
import PhotoGalleryPage from '../pages/PhotoGalleryPage';

{
  id: 'photo-gallery',
  component: PhotoGalleryPage,
  title: 'גלריית תמונות',
  hebrewNumber: 41,
}
```

Increment `hebrewNumber` for the 19 displaced pages:

| ID | Old # | New # |
|----|-------|-------|
| family-object | 41 | 42 |
| family-journey | 42 | 43 |
| family-masa | 43 | 44 |
| family-migration-narrative | 44 | 45 |
| family-journey-insight | 45 | 46 |
| community-insight | 46 | 47 |
| community | 47 | 48 |
| community-visit | 48 | 49 |
| community-contribution | 49 | 50 |
| community-venture-idea | 50 | 51 |
| community-summary | 51 | 52 |
| community-personal-insight | 52 | 53 |
| people-identity-insight | 53 | 54 |
| citizenship-insight | 54 | 55 |
| national-symbols | 55 | 56 |
| memorial-day-insight | 56 | 57 |
| bat-mitzvah | 57 | 58 |
| personal-poem | 58 | 59 |
| journey-summary | 59 | 60 |

Navigation, page-turn animation, and the floating menu all derive from `pages.length` dynamically — no other code changes needed.

---

## 3. Gallery Page Component

### Component tree

```
PhotoGalleryPage
  └── PageLayout
        accent="rose"
        title="גלריית תמונות"
        subtitle="רגעים מהחיים"
        └── GalleryGrid (local, same file)
              └── GalleryItem × N
                    └── <img loading="lazy" decoding="async" />
  + Lightbox (local, same file) — rendered when an image is clicked
```

### GalleryGrid

Renders a CSS `column-count` masonry container. Receives `images: string[]`, passes each to `GalleryItem`.

### GalleryItem

- Renders `<img src={url} alt="" loading="lazy" decoding="async" />`
- Starts at `opacity: 0`; React `onLoad` adds `.loaded` CSS class → `opacity: 1` with `transition: opacity 0.35s ease`
- Click handler calls parent `onOpen(url)`

### Lightbox

Local component (same pattern as `FamilyTreePage`):
- Triggered by `useState(null)` / `useState(url)`
- Full-viewport backdrop (`position: fixed`, semi-transparent)
- Centered `<img>` with `max-width: 92vw`, `max-height: 88vh`, `object-fit: contain`
- Close on backdrop click, close button (✕), ESC key listener
- `role="dialog" aria-modal="true"`

### State

```
const [lightboxSrc, setLightboxSrc] = useState(null);
```

All state is local. No global context, no props from parent.

---

## 4. Responsive Layout

Defined in `PhotoGalleryPage.module.css`:

| Breakpoint | Columns | Gap |
|-----------|---------|-----|
| ≥ 1024px (desktop) | 3 | 10px |
| 640–1023px (tablet) | 2 | 8px |
| < 640px (mobile) | 2 | 6px |
| < 400px (very small) | 1 | 6px |

Each image card:
- `break-inside: avoid` (prevents column breaks mid-image)
- `margin-bottom` matching the column gap
- `border-radius: 8px`, `overflow: hidden`
- Subtle `box-shadow` for depth
- Natural height (no fixed height — images preserve aspect ratio)

RTL: CSS `column-count` flows top-to-bottom within each column, unaffected by RTL direction. Text in `PageLayout` header inherits RTL from the app root.

---

## 5. Performance

- Native `loading="lazy"` — browser only loads images near/in viewport. Zero JS overhead.
- `decoding="async"` — image decode on background thread, no main-thread blocking.
- CSS opacity fade-in — GPU-composited, no layout reflow.
- No `IntersectionObserver` needed (native lazy loading handles it).
- No image library dependencies.
- 85 images × ~200KB average = ~17MB total. With lazy loading, only ~6–9 images load on initial paint.

---

## 6. Accent & Tone

- `accent="rose"` — warm dusty-pink from PageLayout's existing palette, fits the emotional/personal tone
- Matches the "roots book" feel: premium, warm, personal
- No generic file-browser aesthetics

---

## Out of Scope

- Image sorting/grouping (all images display in filesystem order)
- Captions or metadata per image
- Pagination (single scrollable grid, lazy loading handles performance)
- Zoom controls beyond lightbox fullscreen

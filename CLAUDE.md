# Crumble - CLAUDE.md

## Project Overview

**Crumble** is an artisan marketplace and design collective website — a single-page application (SPA) built with **vanilla HTML, CSS, and JavaScript** (no frameworks, no build tools, no external dependencies).

The site showcases handcrafted goods from master artisans across ceramics, jewelry, and accessories categories.

---

## Repository Structure

```
crumble/
├── index.html                  # All page markup (single HTML file, all sections)
├── app.js                      # Application logic, state, event handling
├── style.css                   # All styles: design tokens, components, responsive
└── crumble-premium-design/     # Mirror/reference copy of the three root files
    ├── index.html
    ├── app.js
    └── style.css
```

There is no build step, package manager, or compilation required. Open `index.html` in a browser directly.

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styles | CSS3 with Custom Properties (no preprocessor) |
| Logic | Vanilla JavaScript (ES6+) |
| Fonts | FKGroteskNeue / Geist / Inter (body), Berkeley Mono (mono), Cinzel (accent) |
| Dependencies | None |
| Build tools | None |

---

## Architecture

### Single-Page Application Pattern

All page sections exist in the DOM simultaneously inside `index.html`. Navigation is handled by toggling the `active` CSS class on `<section>` elements via `showSection(sectionId)` in `app.js`.

```
Section IDs: home | ceramics | jewelry | accessories | creators |
             creator-elena | creator-marcus | creator-sofia | creator-james |
             about | contact
```

### Application State (`app.js`)

A single top-level `state` object holds all runtime data:

```js
const state = {
  isMobileMenuOpen: false,     // Mobile nav drawer open/closed
  openDropdowns: new Set(),    // Currently open dropdown menus
  currentSection: 'home',      // Active page section
  currentFilter: 'all',        // Active product subcategory filter
  products: [...],             // In-memory product catalogue (14 items)
  creators: {...}              // Creator profile data (4 creators)
};
```

Product data and creator data are hardcoded in `state` — there is no backend or API.

### Navigation Flow

1. User clicks a nav link, category card, creator CTA, or back button
2. Event listener calls `showSection(sectionId)`
3. `showSection` removes `active` from all sections, adds it to the target
4. `loadSectionContent(sectionId)` is called to populate dynamic product grids

### Product Rendering

Products are rendered dynamically into grid containers via `innerHTML` with `createProductCard()`. Grid containers are identified by ID:

- `#featured-products-grid` — home page (first 6 products)
- `#ceramics-grid`, `#jewelry-grid`, `#accessories-grid` — category pages
- `#elena-products`, `#marcus-products`, `#sofia-products`, `#james-products` — creator detail pages

---

## CSS Conventions

### Design Token System

CSS Custom Properties are defined in `:root` and follow a **two-tier token system**:

**Tier 1 — Primitive tokens** (raw values):
```css
--color-teal-500: rgba(33, 128, 141, 1);
--space-16: 16px;
```

**Tier 2 — Semantic tokens** (reference primitives):
```css
--color-primary: var(--color-teal-500);
--color-background: var(--color-cream-50);
```

Always use semantic tokens in component styles, not primitive tokens directly.

### Dark Mode

Dark mode is implemented via `@media (prefers-color-scheme: dark)` which overrides semantic token values. Component styles do not need dark-mode-specific rules — they inherit via semantic tokens.

### BEM Naming

CSS classes use **BEM methodology**:
- Block: `.product-card`
- Element: `.product-card__title`, `.product-card__image`
- Modifier: `.btn--primary`, `.section--home`, `.nav__link.active`

Follow this pattern for any new components.

### Typography Variables

```css
--font-family-base: "FKGroteskNeue", "Geist", "Inter", -apple-system, ...
--font-family-mono: "Berkeley Mono", ui-monospace, ...
/* Accent (headings/logo): Cinzel */

--font-size-xs: 11px   --font-size-sm: 12px   --font-size-base: 14px
--font-size-lg: 16px   --font-size-xl: 18px   --font-size-2xl: 20px
--font-size-3xl: 24px  --font-size-4xl: 30px
```

### Spacing Scale

Use `--space-{n}` variables instead of raw pixel values:
`--space-4` → `--space-6` → `--space-8` → `--space-10` → `--space-12` → `--space-16` → `--space-20` → `--space-24` → `--space-32`

### Border Radius

```css
--radius-sm: 6px   --radius-base: 8px   --radius-md: 10px
--radius-lg: 12px  --radius-full: 9999px
```

### Animation Tokens

```css
--duration-fast: 150ms
--duration-normal: 250ms
--ease-standard: cubic-bezier(0.16, 1, 0.3, 1)
```

---

## JavaScript Conventions

### DOM Utilities

Two shorthand helpers are defined at the top of `app.js`:

```js
function $(selector)  { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }
```

Use these throughout — not raw `document.querySelector`.

### Mobile Breakpoint

Mobile/desktop logic is gated at **768px**:

```js
function isMobileDevice() { return window.innerWidth < 768; }
```

### Throttle for Performance

Use the `throttle(func, limit)` utility for scroll/resize listeners.

### Event Registration

All event listeners are registered inside `init()`, which is called on `DOMContentLoaded`. Do not attach listeners in the global scope or inline in HTML (except `onclick` in dynamically generated product cards via `createProductCard()`).

### "Add to Collection" Interaction

`handleAddToCollection(productId)` shows a toast notification with CSS animation. It uses `navigator.vibrate()` for haptic feedback on mobile. No actual cart persistence exists.

### Form Handling

Forms use different feedback patterns by device:
- **Desktop**: `alert()` dialogs
- **Mobile**: Button text/color changes inline

---

## Content Data

### Products (14 items)

Each product has: `id`, `name`, `price` (EUR), `category`, `subcategory`, `creator`, `emoji`

| Category | Subcategories |
|----------|--------------|
| ceramics | vases, bowls, dinnerware, decorative |
| jewelry | earrings, bracelets, necklaces, rings |
| accessories | homedecor, glassware, textiles |

### Creators (4)

| ID | Name | Specialty |
|----|------|-----------|
| `elena` | Elena Torres | Master Ceramicist |
| `marcus` | Marcus Weber | Glass Sculptor |
| `sofia` | Sofia Marino | Fine Jewelry Artisan |
| `james` | James Chen | Wood & Fiber Artist |

---

## Responsive / Mobile Behavior

- **Mobile menu**: Hamburger toggle (`.mobile-menu-toggle`) opens a slide-in nav drawer
- **Dropdowns**: Accordion-style on mobile (toggle `+`/`−`), hover-based on desktop
- **Touch feedback**: `touchstart`/`touchend` scale transforms on interactive elements
- **Scroll lock**: `body.style.overflow = 'hidden'` applied when mobile menu is open
- **Double-tap zoom prevention**: Blocked via `touchend` timing check
- **Keyboard accessibility**: Escape closes mobile menu; Tab focus is trapped inside open nav

---

## Key Functions Reference

| Function | Location | Purpose |
|----------|----------|---------|
| `init()` | `app.js:512` | Wire all event listeners, load initial content |
| `showSection(id)` | `app.js:248` | Navigate to a section by ID |
| `loadSectionContent(id)` | `app.js:286` | Dispatch content loading for a section |
| `createProductCard(product)` | `app.js:307` | Return product card HTML string |
| `loadFeaturedProducts()` | `app.js:322` | Populate home page grid (first 6 products) |
| `loadCategoryProducts(cat)` | `app.js:330` | Populate category grid with filter support |
| `loadCreatorProducts(id)` | `app.js:343` | Populate creator detail page grid |
| `setFilter(cat, filter)` | `app.js:358` | Update active filter and reload grid |
| `toggleMobileMenu()` | `app.js:192` | Open/close mobile nav drawer |
| `handleAddToCollection(id)` | `app.js:376` | Show toast notification for product add |
| `throttle(func, limit)` | `app.js:178` | Performance utility for event handlers |

---

## Development Workflow

Since there is no build system:

1. **Edit** `index.html`, `app.js`, or `style.css` directly
2. **Reload** the browser — no compilation step needed
3. **Test** by opening `index.html` in any modern browser

The `crumble-premium-design/` directory is a reference/backup copy. Changes should be made to the root-level files (`index.html`, `app.js`, `style.css`).

---

## Important Conventions to Follow

1. **No external dependencies** — Do not add npm packages, CDN scripts, or external libraries.
2. **Use CSS variables** — Never hardcode colors, spacing, or radii. Always reference the token system.
3. **BEM for CSS classes** — Follow `block__element--modifier` naming.
4. **Semantic tokens over primitive tokens** — Use `--color-primary` not `--color-teal-500` in components.
5. **State management through `state` object** — Don't create new global variables; extend `state`.
6. **Use `$()` and `$$()` helpers** — Not raw `document.querySelector`.
7. **Mobile-first interactions** — Consider touch, haptics, and viewport below 768px for any new interactive element.
8. **Dark mode** — Any new color introduced must have both light and dark mode semantic token entries.
9. **Product data is in-memory** — `state.products` is the source of truth; there is no API or persistence layer.
10. **No inline event handlers in static HTML** — Register listeners in `init()`. (Exception: dynamically generated cards may use `onclick` attributes.)

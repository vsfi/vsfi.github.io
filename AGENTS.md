# VSFI.org — Project Documentation

## Overview

Static landing page for VSFI (system administration competitions), hosted on GitHub Pages. Built with Vite, Nunjucks templates, Embla Carousel, and GLightbox.

**URL**: https://vsfi.org

## Project structure

```
index.html              — main page (Nunjucks template)
vite.config.js          — Vite build config
package.json            — npm scripts and dependencies
data/site.json          — editable image config (gallery + rules)
src/
  js/main.js            — JS entry (Embla, GLightbox, scroll animations)
  css/style.css         — main styles (design tokens, all sections)
  css/responsive.css    — breakpoints (768px, 480px)
public/                 — static assets copied verbatim to dist/
  bashwars/index.html   — Bashwars page
  reg/index.html        — Google Forms redirect
  css/                  — styles for static pages
  img/                  — images, gallery photos, partners, favicons
  fonts/                — "FE The Professional" woff2
  *.png, *.ico, *.xml, *.txt, CNAME — favicons, manifest, robots, etc.
```

## Build

```
npm run dev           # dev server with hot reload
npm run build         # production build → dist/
npm run preview       # preview built dist/
npm run format        # auto-format all files with Prettier
npm run format:check  # check formatting without writing
```

## Main page blocks

1. **Announcement banner** — sticky blue bar, links to /reg/
2. **Navbar** — sticky white, nav links, Bashwars link
3. **Hero** (`#home`) — VSFI logo (SVG inline), tagline, two CTA buttons
4. **Rules** (`#features_1`) — two-column: gallery photo + text
5. **Application** (`#features_2`) — centered text + signup link
6. **How it works** (`#features_3`) — text, YouTube videos, partners logos
7. **Gallery** (`#gallery`) — Embla carousel + GLightbox, populated from `data/site.json`
8. **Footer** (`#footer`) — three-column: about, contacts, social links

## Design tokens

```css
--color-accent: #3b82f6; /* steel blue */
--color-bg: #ffffff;
--color-bg-alt: #f8fafc;
--color-footer: #1e293b;
--font-heading: 'FE The Professional', sans-serif;
```

## Image config

Edit `data/site.json` to change gallery images or the rules section image. No code changes needed. Rebuild after editing.

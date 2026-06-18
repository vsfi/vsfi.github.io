# VSFI.org — Project Documentation

## Overview

Static landing page for VSFI (system administration competitions), hosted on GitHub Pages. Built with Vite, Nunjucks templates, Embla Carousel, and GLightbox.

**URL**: https://vsfi.org

## Project structure

```
index.html              — main page (Nunjucks template)
vite.config.js          — Vite build config
package.json            — npm scripts and dependencies
data/site.json          — editable site config
src/
  js/main.js            — JS entry (Embla, GLightbox, scroll animations)
  css/style.css         — main styles (design tokens, all sections)
  css/responsive.css    — breakpoints (768px, 480px)
bashwars/index.html     — Bashwars page (Nunjucks template)
reg/index.html          — Google Forms redirect (Nunjucks template)
public/                 — static assets copied verbatim to dist/
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

## Announcement banner

The sticky "registration open" banner on the main page and /bashwars/ is controlled by the `SIGN_UP_OPENED` env var:

```bash
SIGN_UP_OPENED=true npm run build   # banner shown
npm run build                        # banner hidden (default)
```

Set `SIGN_UP_OPENED` in the repository variables: **Settings → Secrets and variables → Actions → Variables**. The workflow reads it from `vars.SIGN_UP_OPENED`.

## data/site.json

All editable content lives here. No code changes needed when editing.

```jsonc
{
    "signUpFormUrl": "https://forms.gle/...",  // Google Forms URL for /reg/ redirect
    "rulesImage": "img/rules.webp",            // image for Rules section
    // ...videos, testimonials, partners, gallery
}
```

## Image config

Edit `data/site.json` to change gallery images or the rules section image. No code changes needed. Rebuild after editing.

### Gallery images

`public/img/gallery/` — WebP format, metadata stripped:

```
gallery/
  NNN.webp          — full-size: 1600px wide, quality 90
  thumbs/NNN.webp   — thumbnail: 200px wide, quality 80
```

NNN is a zero-padded sequence number (001, 002, …). Full images are used in the GLightbox overlay; thumbnails in the Embla carousel.

**Processing recipe:**

```bash
# Full version
magick input.jpg -resize 1600x -quality 90 -strip gallery/NNN.webp

# Thumbnail
magick input.jpg -resize 200x -quality 80 -strip gallery/thumbs/NNN.webp
```

**Important:** The `-strip` flag removes all EXIF, XMP, ICC profiles, GPS coordinates, camera serial numbers, and other metadata. Gallery images must be anonymous. Verify with `exiftool file.webp` — it should produce no output.

### Rules image

`public/img/rules.webp` — 600px wide WebP, displayed inline in the Rules section (not a lightbox, no thumbnail needed). Process the same way, just at 600px.

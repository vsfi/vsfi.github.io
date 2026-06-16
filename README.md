# VSFI

Landing page for https://vsfi.org. Built with Vite + Nunjucks + Embla Carousel + GLightbox.

## Setup

```bash
npm ci
npm run dev       # dev server at localhost:5173
npm run build     # production build → dist/
npm run format    # auto-format with Prettier
```

## Project structure

```
index.html          — main page (Nunjucks template)
vite.config.js      — Vite config
data/site.json      — editable content
src/
  js/main.js        — JS entry (carousel, lightbox, nav, animations)
  css/style.css     — design tokens + all section styles
  css/responsive.css— 768px and 480px breakpoints
public/             — static assets (copied verbatim to dist/)
  img/              — images, gallery photos, partners
  fonts/            — FE The Professional woff2
  bashwars/         — Bashwars sub-page
  reg/              — registration redirect
```

## data/site.json

All editable content lives here. No code changes needed when editing.

```jsonc
{
    "rulesImage": "img/fgal/001big.jpg", // hero image for Rules section
    "videos": [
        "gEtFDT5maLg", // YouTube video IDs
        "sk7-xs2rEyI"
    ],
    "testimonials": {
        "hero": "...", // text under the logo
        "participantQuote": "...", // quoted in Apply section
        "orgQuote": "..." // quoted in How it works
    },
    "partners": [
        [
            { "img": "img/partners/ssau.png", "alt": "SSAU", "url": "https://ssau.ru" },
            { "img": "img/partners/ctech.svg", "alt": "CTech" }
        ]
    ],
    "gallery": [{ "thumb": "img/fgal02/025sm.jpg", "full": "img/fgal02/025big.jpg" }]
}
```

- **videos** — array of YouTube IDs. Add more, they auto-grid.
- **partners** — nested arrays. One inner array = one row. `url` is optional (omit for a plain logo).
- **gallery** — `thumb` for the carousel, `full` for lightbox. Reorder, add, or remove.
- **testimonials** — three text blocks used across the page.

## Deploy

Push to `master` — GitHub Actions builds and deploys `dist/` to GitHub Pages.

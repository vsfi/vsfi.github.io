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
bashwars/index.html — Bashwars page (Nunjucks template)
reg/index.html      — Google Forms redirect (Nunjucks template)
vite.config.js      — Vite config
data/site.json      — editable content
src/
  js/main.js        — JS entry (carousel, lightbox, nav, animations)
  css/style.css     — design tokens + all section styles
  css/responsive.css— 768px and 480px breakpoints
public/             — static assets (copied verbatim to dist/)
  img/              — images, gallery photos, partners
  fonts/            — FE The Professional woff2
```

## data/site.json

All editable content lives here. No code changes needed when editing.

```jsonc
{
    "signUpFormUrl": "https://forms.gle/...",  // Google Forms URL for /reg/ redirect
    "rulesImage": "img/rules.webp",            // image for Rules section (600px wide WebP)
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
    "gallery": [{ "thumb": "img/gallery/thumbs/036.webp", "full": "img/gallery/036.webp" }]
}
```

- **signUpFormUrl** — Google Forms destination for the /reg/ redirect page.
- **videos** — array of YouTube IDs. Add more, they auto-grid.
- **partners** — nested arrays. One inner array = one row. `url` is optional (omit for a plain logo).
- **gallery** — `thumb` for the carousel, `full` for lightbox. Reorder, add, or remove.
- **testimonials** — three text blocks used across the page.

## Announcement banner

The sticky "registration open" banner on the main page and /bashwars/ is controlled by the `SIGN_UP_OPENED` env var:

```bash
SIGN_UP_OPENED=true npm run build   # banner shown
npm run build                        # banner hidden (default)
```

In the [deploy workflow](.github/workflows/deploy.yml), the build step reads it from `vars.SIGN_UP_OPENED`. Set this variable in the repository variables: **Settings → Secrets and variables → Actions → Variables**.

## Gallery images

Gallery photos are WebP format in `public/img/gallery/`:

```
public/img/gallery/
  001.webp          — full-size (1600px wide, quality 90)
  002.webp
  ...
  thumbs/
    001.webp        — thumbnail (200px wide, quality 80)
    002.webp
    ...
```

### Processing new photos

Use ImageMagick to resize and strip metadata:

```bash
# Full version: 1600px wide
magick input.jpg -resize 1600x -quality 90 -strip public/img/gallery/NNN.webp

# Thumbnail: 200px wide
magick input.jpg -resize 200x -quality 80 -strip public/img/gallery/thumbs/NNN.webp
```

The `-strip` flag removes all EXIF, XMP, ICC profiles, GPS, camera serial numbers, and other metadata. Always strip — gallery images must be anonymous.

Verify metadata is gone:

```bash
exiftool public/img/gallery/NNN.webp  # should produce no output
```

### Rules image

The rules section image (`rulesImage` in site.json) is 600px wide WebP in `public/img/rules.webp`. Process the same way but at 600px — it's displayed inline, not in a lightbox, so it doesn't need a thumbnail.

## Deploy

Push to `master` — GitHub Actions builds and deploys `dist/` to GitHub Pages.

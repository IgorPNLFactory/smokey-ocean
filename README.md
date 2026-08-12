# Smoky Ocean — Hookah Lounge & Bar

A reworked, modern one-page website for [Smoky Ocean](https://smokyocean.cy/), a shisha lounge and bar in Limassol, Cyprus.

## Tech

Pure static site — no build step or dependencies required.

- `index.html` — all page sections (hero, about, experience, hookah menu, catering, reservation, footer)
- `menu.html` — standalone full menu page (hookah, cocktails, teas, coffee, wine, beer, spirits, desserts) designed to be opened from a QR code; mobile-first with a sticky category bar
- `css/styles.css` — dark theme matched to the original site (electric cyan / teal), fully responsive
- `css/menu.css` — menu-page specific styles
- `js/main.js` — sticky nav, mobile menu, scrollspy, menu tabs, booking modal (WhatsApp), tilt cards, scroll-reveal, stat counters, smoke & ember particles
- `js/menu.js` — category chip scrollspy and back-to-top for the menu page

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy

Deployable as-is to any static host (Netlify, Vercel, GitHub Pages, Render static site, etc.).

## QR code for the menu

Point your QR code at `https://<your-domain>/menu.html`. The page is mobile-first, loads with no build step, and has a sticky category bar (Hookah, Seasonal, Cocktails, Coffee & Soft, Tea, Wine, Beer, Spirits, Desserts) for fast navigation at the table.

## Notes

- The "Call Us" and WhatsApp booking links use placeholder numbers (`tel:+357`, `wa.me/357`) — replace them with the real phone number.
- Menu items and prices are transcribed from the current physical menu (including the updated hookah prices and the "New" items).

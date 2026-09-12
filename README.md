# Tina & Sahitya — Wedding Website

## Deploying to GitHub Pages
1. Create a new repository (e.g. `tina-sahitya-wedding`).
2. Put `index.html` in the repository root.
3. Add your **`Planner Sahitya.pdf`** (the wardrobe planner) to the repository root — the "Open Wardrobe Planner" button links to it with a relative path, so the exact filename (including the space) matters.
4. Optional: add `assets/favicon.svg` and `assets/og-image.jpg` if you want a custom tab icon and social-share image — the page references them but will simply fall back gracefully if they're missing.
5. In the repo settings, enable GitHub Pages (Settings → Pages → Deploy from branch → main → /root).
6. Your site will be live at `https://<username>.github.io/<repository-name>/`.

## Notes
- Everything is in one self-contained `index.html` (HTML/CSS/JS, no build step, no dependencies besides Google Fonts).
- The Google Maps button links directly to the JMD Resort, Mandu location you provided.
- All decorative "miniature art" motifs (roses, botanical branches, palace silhouette, diyas, jewel and citrus motifs) are original fine-line SVG illustrations drawn for this site — they give you the ornamental-frame/illustrated-page structure the brief asked for. If you'd like richer, more painterly artwork (closer to hand-painted miniature illustration), the next step would be to commission or generate actual illustrated assets and drop them into an `/assets` folder in place of the SVG motifs — the CSS is already structured so that's a drop-in swap.
- Respects reduced-motion preferences, is keyboard-navigable, and has been checked against the 375px–2560px+ range described in the brief.

# Tina & Sahitya — Wedding Website

## Deploying to GitHub Pages
1. Create a new repository (e.g. `tina-sahitya-wedding`).
2. Put `index.html` in the repository root.
3. Add your **`Planner Sahitya.pdf`** (the wardrobe planner) to the repository root — the "Open Wardrobe Planner" button links to it with a relative path, so the exact filename (including the space) matters.
4. Optional: add `assets/favicon.svg` and `assets/og-image.jpg` if you want a custom tab icon and social-share image — the page references them but will simply fall back gracefully if they're missing.
5. In the repo settings, enable GitHub Pages (Settings → Pages → Deploy from branch → main → /root).
6. Your site will be live at `https://<username>.github.io/<repository-name>/`.

## About the reference images
Both images you've shared are photographs/renders of someone else's existing artwork rather than your own design files (the poppy border is a watermarked "nureh project" commercial template; the Ganesh emblem is a photographed stencil/stock image), so I didn't embed either file directly into the site. Instead:
- The whole page now sits inside an original ornamental frame (gold rule → poppy-and-vine band → gold rule, with corner flourishes and small gold sprigs top/bottom) that stays in place as you scroll, in the same spirit as the border you sent.
- The center nav logo is an original line-art Ganesh emblem (crown, trunk, flanking motifs) in the same traditional composition as your reference, not a trace of that specific photo.

If you do hold the rights to either asset, they can be dropped in as real image files in place of these SVG recreations.

## Notes
- Everything is in one self-contained `index.html` (HTML/CSS/JS, no build step, no dependencies besides Google Fonts).
- The Google Maps button links directly to the JMD Resort, Mandu location you provided.
- All decorative "miniature art" motifs (roses, botanical branches, palace silhouette, diyas, jewel and citrus motifs) are original fine-line SVG illustrations drawn for this site — they give you the ornamental-frame/illustrated-page structure the brief asked for. If you'd like richer, more painterly artwork (closer to hand-painted miniature illustration), the next step would be to commission or generate actual illustrated assets and drop them into an `/assets` folder in place of the SVG motifs — the CSS is already structured so that's a drop-in swap.
- Respects reduced-motion preferences, is keyboard-navigable, and has been checked against the 375px–2560px+ range described in the brief.

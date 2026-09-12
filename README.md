# Tina ❤️ Sahitya — Wedding Invitation Website

A single self-contained page (`index.html`) — no build step, no dependencies beyond Google Fonts.

## Deploying to GitHub Pages

1. Create a repository (or use an existing one) and add `index.html` to its root.
2. Add your wardrobe planner PDF to the **same folder as `index.html`**, named exactly:
   `Planner Sahitya.pdf`
   The site already links to it as `Planner%20Sahitya.pdf` (URL-encoded space), which works
   correctly whether the site is deployed at the root of `username.github.io` or inside a
   repository subpath like `username.github.io/repository-name/`, since the link is relative.
3. In the repo settings, enable **GitHub Pages** → deploy from the `main` branch, root folder.
4. Your site will be live at `https://username.github.io/repository-name/`.

## Connecting the RSVP form to a real backend

Right now the RSVP form works with **zero backend**: on submit it shows the thank-you message
and opens a pre-filled email as a fallback. To wire it to a real service, open `index.html`,
find the `<form id="rsvp-form">` and the matching `<script>` block, and:

- **Formspree** — set `action="https://formspree.io/f/yourFormId"` and `method="POST"` on the
  form, and remove the `e.preventDefault()` / mailto logic in the script (Formspree handles
  the redirect and confirmation itself, or you can keep the success message and use `fetch()`).
- **Google Forms** — point the form to the form's `formResponse` URL and make sure each field's
  `name` attribute matches the corresponding `entry.xxxxx` field from the Google Form.
- **Any serverless endpoint** (Netlify Forms, a Cloud Function, etc.) — swap the mailto logic
  for a `fetch()` call to your endpoint.

## Optional background music

The site includes a music toggle button that never autoplays. To enable it, add an audio file
to an `assets/` folder in the repo and uncomment/add a `<source>` line inside the `<audio id="bgMusic">`
element in `index.html`, e.g.:

```html
<audio id="bgMusic" loop preload="none">
  <source src="assets/music.mp3" type="audio/mpeg">
</audio>
```

## Editable placeholders

The "Good to Know" section has bracketed placeholders (dress code notes, accommodation,
transportation, parking, contact info, hashtag) — search `index.html` for `[` to find and
replace them with real details.

## Customizing content

All text (dates, venue, attire, copy) lives directly in the HTML in clearly labeled sections,
in the same order as the design brief: Hero → Story → Celebrations → Venue → Wardrobe → RSVP →
Good to Know → Closing.

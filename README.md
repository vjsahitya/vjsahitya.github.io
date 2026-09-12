# Tina & Sahitya — Wedding Website

## Important note on what changed technically
Your uploaded zip was a **compiled/production build** (Vite + React +
Tailwind + Supabase, bundled into one minified `assets/index-*.js`
file). There was no editable source code in it — just the final
output the browser runs. Minified bundles like that can't be safely
hand-edited (no readable component structure, no separated text/CSS).

So instead of patching that bundle, I rebuilt the site as **plain
HTML + CSS + JavaScript** — same wedding, same content, same colour
theme and fonts, but now something you (or anyone) can open and edit
directly, with every one of your requested changes applied. It no
longer needs a build step, Node, or a backend.

## What's included
- `index.html` — all page content
- `css/style.css` — all styling (organized by section, commented)
- `js/main.js` — sidebar nav, scroll-spy, photo carousel, music toggle
- `envelope-intro.css` / `envelope-intro.js` — your original "tap to
  open the invitation" envelope animation, kept as-is
- `fonts/` — your original local fonts (Cormorant Garamond, Great
  Vibes, Montserrat)
- `hero-video.mp4`, `background-music.mp3`, `favicon.ico`,
  `Planner Sahitya.pdf`, `og/` — carried over from your upload

## Latest update (round 2)
- **Countdown** — a new section right under the hero counts down
  live to 26 January 2027 (days / hours / minutes / seconds).
- **Photos are back to simple names**: `Photo1.jpg` … `Photo5.jpg` in
  the root folder (no more HEIC/mixed-case naming). They now live in
  a full-width, auto-scrolling "Glimpse of Us" marquee of its own,
  right after Our Story (which is back to plain centred text).
- **Background music** now starts the moment the envelope is tapped
  open, instead of trying to autoplay before that.
- **Butterflies** — reduced to 3 and redesigned with softer two-tone
  gradient wings, a proper body/antennae, and wedding-palette colours.
  Tapping one still bursts it into a small firework and it drifts
  back in elsewhere after a while.
- **The Celebrations** is now a vertical timeline — alternating
  left/right on desktop, single column on phones, connected by a
  gold line with a dot per event, inside a soft glass-effect panel.

## Previous update
- **Our Story** is now a two-column layout: the story text on one
  side, a photo gallery on the other (stacks to one column on
  phones). Drop `Photo0.jpg`, `Photo1.HEIC`, `Photo2.HEIC`,
  `Photo3.JPG`, `Photo4.jpg` into the **root folder**. HEIC files
  can't be shown directly by browsers — until you convert them to
  JPG/PNG, that slide shows a note instead of a broken image. The
  gallery cross-fades automatically and has tap-able dots.
- **Wardrobe Planner** is now styled as its own "chapter of paper" —
  a soft parchment background inside a nested gold-line frame with
  corner flourishes, a row of colour swatches, and the button to the
  PDF planner.
- **Wedding Venue** now shows an icon, the dates, the address, an
  embedded Google Map (no API key needed), and two buttons: "Open in
  Maps" and "Add to Calendar" (downloads a two-day `.ics` file that
  works with any calendar app).
- **Butterflies** — five small butterflies now drift around the
  whole site (`js/butterflies.js`). Tap one and it bursts into a
  little firework of colour and flies off; it reappears elsewhere
  after a little while. Automatically turned off for anyone with
  "reduce motion" enabled on their device.

## Your requested changes — where to find them
1. **Our Story font + paragraph form** — `css/style.css`, look for
   `OUR STORY`. Font is now Playfair Display (headings) + Lora (body).
3. **Celebrations section**
   - New font: Cinzel (headings) + Poppins (body).
   - Each of the 5 event cards has its own colour (sage, blush, gold,
     haldi-yellow, terracotta).
   - Venue text removed from every card — venue now lives only in the
     new **Venue** section.
4. **Gifts section** — removed.
5. **RSVP section** — removed (this also means the Supabase form
   backend is no longer needed).
6. **Travel & Accommodation / Where to Stay / Getting There** —
   removed entirely.
7. **Things to Do in Mandu** — kept, as its own section.
8. **Questions/FAQ section** — removed.
9. **Left-hand navigation bar** — see `.sidenav` in `index.html` /
   `style.css`. On phones and tablets it becomes a hamburger-triggered
   slide-out drawer (`.topbar`, `.hamburger`).
10. **Responsive** — fluid type (`clamp()`), a mobile-first grid that
    stacks on phones, a capped content width plus a font-size bump for
    very large TVs (`min-width: 2200px`), and `100dvh` used instead of
    `100vh` so mobile browser address bars don't cut off the hero.

## To publish
Upload the whole folder (keeping the same file/folder names) to your
host exactly as-is — it's a static site, so any static host (Netlify,
Vercel, GitHub Pages, or your current host) will work with no build
step required. Just remember to add `Photo1.jpg` – `Photo5.jpg` to the
root folder before you publish.

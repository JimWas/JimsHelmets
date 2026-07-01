# Changelog

All notable changes to jimshelmets.org are recorded here.

---

## 2026-06-30

- Fix newsletter API fully working — emails now logging to Neon PostgreSQL
- Fix Vercel deployment config — clear Root Directory, set Output Directory to `website`, simplify vercel.json rewrites so cleanUrls handles page routing and api/ functions are recognized
- Fix Vercel function deployment — add `package-lock.json` and explicit `functions` config so `/api/subscribe` is recognized and `pg` is installed
- Fix about page photo grid — remove photos Jim is not in, restructure into two clean balanced grids (3×3 + 2×2)
- Add four more Jim photos to about page (hilltop group, Cambodian flag, reclining Buddha, Siem Reap airport mural)
- Add Jim-with-Cambodian-family selfie to about page photo grid

## 2026-06-29

- Fix newsletter form page-refresh bug — smart/curly quotes in `main.js` caused a SyntaxError that prevented `e.preventDefault()` from running
- Add success/error toast popup for newsletter signup — slides up from bottom, auto-dismisses on success
- Fix newsletter CORS — was apex-only, changed to `*` to allow both domains
- Fix newsletter routing — explicit `/api/:path*` passthrough in `vercel.json`
- Add podcast page (`/podcast`) with four embedded audio episodes and HTML5 players
- Organize podcast MP3s into `docs/Podcasts/` subfolder
- Add `/beliefs` research page — translates PDF research into web content covering the Cambodian helmet paradox, compliance data, myths vs. evidence, five barrier categories, legislative history, and a CTA
- Add `media-split.reverse` CSS utility for alternating photo/text layout

## 2026-06-28

- Fix JS syntax error breaking newsletter form handler
- Fix API routing blocked by catch-all rewrite in `vercel.json`
- Add newsletter email collection — Vercel serverless function (`api/subscribe.js`), Neon PostgreSQL database, "Stay updated" form in footer of all pages

## 2026-06-27

- Replace duplicate child-helmet photos on homepage with unique images
- Remove pre-launch disclaimer note from homepage footer
- Update sitemap — fix URLs, add about/press pages, remove dead pages
- Update footer tagline across all pages
- Rewrite donate page as "Why Donate" with direct Givebutter link in nav
- Add prominent Donate Now CTA button to donate page
- Fix Givebutter embed URL
- Fix page hero background images across all pages
- Add background images to all page hero sections
- Add classroom videos to intervention page
- Add 20 new photos across crisis, technology, about, and homepage
- Add press page with launch press release
- Add Cambodia photos throughout the site (June 27 batch)
- Wire Givebutter campaign to donate page
- Replace CSS helmet diagram with real photos

## 2026-06-25

- Add lightbox for full-size image viewing on photo grids
- Fix EXIF rotation on all converted photos
- Add Cambodia photos throughout the site
- Replace favicon with SVG brand mark
- Add Vercel Analytics to all pages
- Add About page
- Fix nav colors and metric number clipping
- Fix section layout bugs (margin overrides, grid formatting)

## 2026-06-18

- Expand crisis page content
- Fix clean URL links across all pages
- Add helmet campaign audio files
- Add investment pages (impact, partners, governance)
- Fix site routing

## 2026-06-17

- Initial site launch
- Full redesign with modern CSS design system
- Add core pages: homepage, crisis, technology, barriers, intervention, research, governance, donate
- Add sitemap.xml
- Add logo, favicon, and brand mark
- Standardize navigation across all pages

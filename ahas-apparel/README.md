# Ahas Apparel — Website (Frontend + Backend)

A B2B wholesale apparel website: animated hero slider, a signature-products showcase, stats,
a category grid across **4 categories / 20 product lines**, a landing page per product line,
process steps, testimonials, working contact + free-sample forms, and floating WhatsApp/sample
buttons.

**Stack:** Node.js + Express (backend) rendering EJS templates (frontend), styled with **Tailwind
CSS** (compiled to a static file — no CDN, production-ready) plus a small amount of custom CSS for
the brand's signature look and scroll animations. One app, one command to run. No database required
— product data lives in a JSON file you can edit directly.

**What changed in this version:**
- **Full navigation mega-menu** — hover "Catalog" in the header to see all 4 categories and all 20 subcategories, each directly clickable. On mobile, tap "Catalog" to expand the same full list.
- **Softer, more professional typography** — headings switched from a bold condensed all-caps font to Poppins in normal sentence case, for a warmer, more premium feel. Small accent labels (eyebrows, SKU codes, spec tags) keep a light uppercase/monospace treatment for contrast.
- **New logo lockup** — a bold rounded "A" badge in the brand orange, paired with a bold "Ahas." wordmark and a small "Apparel Co." subline, used in both the header and footer.
- Animated hero image slider on the homepage — crossfades between 4 real product photos with a slow zoom
- New **Signature Products Showcase** section — large alternating image/copy blocks for flagship styles
- Scroll-reveal animations (cards, sections fade+rise into view as you scroll) site-wide
- Catalog expanded to **20 subcategories** (5 per category)
- Real product photos wired in across 6 lines — see "Which photos are still missing" below
- Rewritten, more polished marketing copy throughout

**Which product photos are still missing:**
Of the 20 subcategories, **6 have your real photos** and **14 are still using placeholder icon sketches**, waiting on your photography:

| Category | Has real photos | Still needs photos |
|---|---|---|
| Outerwear | Leather Jackets, Motorcycle & Riding Jackets | Fashion Jackets, Denim Jackets, Puffer & Padded Jackets |
| Casual & Fashion Wear | T-Shirts & Polos, Hoodies & Sweatshirts, Pants & Trousers | Casual & Formal Shirts, Shorts |
| Uniforms & Workwear | School Uniforms | Corporate Uniforms, Industrial Workwear, Hospitality Uniforms, Medical Scrubs |
| Sports & Performance Wear | — | Sportswear, Teamwear & Jerseys, Gym/Training Wear, Compression Wear, Tracksuits |

Send photos for any of the 14 missing lines and I'll wire them in the same way as the first batch —
just tell me which subcategory each photo belongs to.

---

## 1. What's inside

```
ahas-apparel/
├── server.js              # App entry point
├── package.json
├── tailwind.config.js      # Brand colors, fonts, animation keyframes
├── src/input.css           # Tailwind source file (edit this, not public/css/style.css directly)
├── .env.example            # Copy to .env and fill in your real details
├── data/
│   ├── categories.json     # ALL your products live here — 4 categories, 20 subcategories
│   └── submissions/        # Contact + sample-request form entries land here as JSON
├── routes/
│   ├── pages.js            # Renders every page (home, catalog, category landing pages, etc.)
│   └── api.js              # /api/contact, /api/sample-request, /api/categories
├── views/                  # EJS templates (the pages themselves)
│   ├── partials/           # Shared header, footer, icon, media (photo-or-icon), floating widgets
│   ├── home.ejs             # Hero slider, marquee, showcase, featured products, etc.
│   ├── catalog.ejs         # Full catalog overview (all 20 lines)
│   ├── category.ejs        # ONE template that renders all 20 landing pages, driven by data
│   ├── about.ejs
│   ├── contact.ejs
│   └── sample-request.ejs
└── public/
    ├── css/style.css       # COMPILED Tailwind output — do not edit by hand, it gets overwritten
    ├── js/main.js          # Mobile menu, scroll-reveal animation, hero slider, form submission
    └── images/
        ├── products/        # Your real uploaded photos, organized by subcategory slug
        └── icon-*.svg        # Placeholder garment icons — used automatically where no photo exists yet

```

**Important:** you do NOT need 20 separate HTML files. `category.ejs` is one reusable template —
every landing page (`/catalog/leather-jackets`, `/catalog/tracksuits`, etc.) is generated from it
using the matching entry in `data/categories.json`. Add a 21st subcategory to that file and its
landing page exists automatically at `/catalog/your-new-slug`.

**Editing styles:** because the CSS is now compiled by Tailwind, don't edit `public/css/style.css`
directly — your changes will be overwritten next build. Instead:
- Change colors/fonts/animation timing in `tailwind.config.js`
- Change reusable component classes (buttons, cards, etc.) in `src/input.css`
- Run `npm run build:css` after any change (or use `npm run watch:css` while actively editing, see below)

---

## 2. Run it on your own computer

You need **Node.js 18+** installed (download from nodejs.org if you don't have it).

```bash
cd ahas-apparel
npm install          # installs Express, EJS, Tailwind, dotenv (one-time) — also builds the CSS automatically
cp .env.example .env # then open .env and fill in your real email/phone/address
npm start             # starts the site
```

Open **http://localhost:3000** — the whole site is live. Every page you built is real, not a mockup.

For active development:
```bash
npm run dev           # auto-restarts the server when you edit .ejs/.js files
npm run watch:css      # in a second terminal — rebuilds Tailwind CSS instantly as you edit src/input.css
```

---

## 3. Add your real product photos (replace placeholders)

Right now every product/category uses a simple SVG line-sketch icon so the site looks complete
without real photos. To swap them for your real images:

1. Put your photos in `public/images/` (e.g. `leather-jacket-01.jpg`).
2. Open `views/category.ejs` and `views/home.ejs`, find this line:
   ```
   <div class="product-media"><%- include('partials/icon', { name: sub.icon }) %></div>
   ```
3. Replace it with a real `<img>` tag, e.g.:
   ```
   <div class="product-media"><img src="/images/leather-jacket-01.jpg" alt="<%= p.name %>"></div>
   ```
   Easiest long-term approach: add an `"image"` field to each product in `data/categories.json`
   (e.g. `"image": "/images/leather-jacket-01.jpg"`), then reference `p.image` in the template.
   This keeps every image swap to a one-line edit in the JSON file — no template editing after
   the first setup.

---

## 4. Edit your product catalog (categories, subcategories, products)

Everything is in **`data/categories.json`**. It's plain, readable JSON — no code required:

- To add a product to an existing line: copy one `{ "sku": ..., "name": ..., "desc": ..., "moq": ... }`
  block inside that subcategory's `"products"` array and change the values.
- To add a whole new subcategory (a 13th landing page): copy one subcategory block, give it a new
  unique `"slug"` (this becomes the URL), and it will automatically get its own landing page,
  show up in the catalog page, footer, and home page category grid.
- To rename anything shown on the site (category names, taglines, specs), just edit the text — no
  need to touch any `.ejs` file.

**Restart the server** after editing this file (`Ctrl+C` then `npm start`), unless you're running
`npm run dev`, which restarts automatically.

---

## 5. Customize branding, colors and text

- **Colors, fonts, spacing:** all in `public/css/style.css` under `:root { ... }` near the top —
  change the hex values (`--denim`, `--orange`, `--paper`, etc.) and the whole site updates.
- **Logo:** currently text-based ("AHAS."). To use a logo image, edit `views/partials/header.ejs`
  and replace the `<a class="logo">` content with an `<img>` tag pointing to a file in `public/images/`.
- **Company details (email, phone, WhatsApp, address):** edit your `.env` file — these feed every
  page automatically (footer, WhatsApp button, contact page).
- **Homepage copy** (hero headline, stats numbers, testimonials): edit directly in `views/home.ejs`.

---

## 6. Make the contact/sample forms actually email you

Right now, form submissions are saved to `data/submissions/contact.json` and
`data/submissions/sample-requests.json` — so nothing is lost, but nothing emails you yet.
Two ways to complete this, from simplest to most robust:

**Option A — check the JSON files periodically** (already working, zero setup).

**Option B — get real emails.** Install `nodemailer`:
```bash
npm install nodemailer
```
Then in `routes/api.js`, inside the `/contact` and `/sample-request` handlers, after `appendEntry(...)`,
add a call to send an email via your SMTP provider (Gmail, SendGrid, Zoho Mail, etc.) using the
`SMTP_*` variables already stubbed out in `.env.example`. I can write this integration for you if
you tell me which email provider you want to send through.

---

## 7. Deploy it live (put it on a real domain)

Any Node.js host works. Two easy, low-cost options:

1. **Render.com** (simplest): push this folder to a GitHub repo → New Web Service on Render →
   connect the repo → Build command `npm install`, Start command `npm start` → add your `.env`
   variables in Render's dashboard → deploy. You get a live URL in a few minutes.
2. **A VPS (DigitalOcean, Hostinger VPS, etc.)**: upload the folder, run `npm install`, then keep
   it running permanently with `pm2` (`npm install -g pm2 && pm2 start server.js`).

Once deployed, point your domain's DNS to the host (they'll give you exact instructions), and buy
an SSL certificate (most hosts, including Render, do this free and automatically).

---

## 8. What you should do, step by step (checklist)

1. [ ] Install Node.js on your computer.
2. [ ] Run `npm install`, then `npm start`, confirm the site loads at localhost:3000.
3. [ ] Copy `.env.example` to `.env`, fill in your real email, phone, WhatsApp number, address.
4. [ ] Read through `data/categories.json` and correct any product names/specs you want changed.
5. [ ] Gather real product photos and swap them in (Section 3 above).
6. [ ] Decide on your final brand colors if you want to move off the current denim/orange palette
       (Section 5 above) — send me your preferred colors/logo and I can apply them for you.
7. [ ] Tell me your email provider if you want real email delivery wired up (Section 6).
8. [ ] Buy a domain (e.g. ahasapparel.com) and choose a host (Render is the easiest — Section 7).
9. [ ] Deploy, point the domain, done.

If any step is unclear or you'd rather I do it directly (swap in your photos, wire up email,
prepare the deployment), just send me what's needed and I'll do it in this same project.

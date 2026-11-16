# Shabka Group project instructions

## Adding or changing a business division

When the user asks to add a new business, division, or company brand, read and follow this checklist before editing. Treat the request as a full-site addition: the new business should be discoverable and consistent across every relevant part of the app, not only have a detail page.

### 1. Content and central data

- Add one complete item to `lib.json` under `divisions.items` with a unique `id` and URL-safe `slug`, `name`, `heading`, concise `summary`, full `paragraphs`, `linkLabel`, `href`, `theme`, `icon`, and meaningful `iconAlt`.
- Use the supplied copy and facts. Do not invent services, locations, credentials, or claims. Correct obvious typos only when the intended wording is clear.
- Update group-wide descriptions and About Us copy in `lib.json` when they list the businesses or would otherwise become inaccurate. Keep the hero subtitle, `divisions.description`, metadata description, and About Us narrative consistent where needed.
- Keep contact enquiry choices current. `components/contact-section.tsx` derives its division choices from `divisions.items`; verify that the new division appears there.

### 2. Navigation and discovery

- Add a link to the new business in `lib.json` under both `header.navigation` and the footer's `Divisions` links.
- The homepage business cards are generated from `divisions.items` by `components/divisions-section.tsx`; confirm the new item has the fields and icon it needs to render correctly.
- The About Us business cards are a separate list in `components/about-page-content.tsx`. Add the new business there too, with a short accurate description and a working link.
- Keep the homepage and About Us business grids at three columns on desktop, two on tablet, and one on narrow mobile screens. Do not leave an unbalanced partially filled row when the business count changes.

### 3. Division detail page

- The route `app/divisions/[slug]/page.tsx` creates pages and page metadata from `lib.json`. Preserve the slug and metadata behavior.
- `components/division-page.tsx` owns the shared hero, heading, summary, and copy. For a photo-led business page, add its desktop and mobile hero images, useful alt text, and heading line breaks to `divisionVisuals`.
- If the business needs a gallery, create a gallery component under `components/` using the shared `BusinessGallery` component. Add the component import and slug-specific render in `components/division-page.tsx`. Include every supplied image with correct dimensions and descriptive alt text.
- Check the detail page on desktop and mobile widths. Keep its layout, spacing, back link, motion behavior, and gallery interactions consistent with the existing division pages.

### 4. Assets and visual consistency

- Use supplied assets from `public/` when available. Organize new assets under `public/<slug>/hero/` and `public/<slug>/gallery/`; use `desktop` and `mobile` hero images when both are provided.
- Business icons live in `public/business sectioon icon/` (keep this existing directory spelling). Reference paths in `lib.json` with URL-encoded spaces, such as `/business%20sectioon%20icon/example.png`.
- Give every icon a useful alt label. Keep business icons visually consistent: preserve their aspect ratios and use the shared icon sizing rules in `app/globals.css` for both `.div-card .div-icon img` and `.about-business-icon`. Do not enlarge square icons relative to the existing wide logos.
- Verify every referenced asset exists and that image dimensions match the values passed to Next/Image or the gallery.

### 5. Completion checks

- Search for the business name and old business counts/copy to find stale references across the app.
- Confirm the new business appears in the homepage cards, header, footer, About Us cards, contact enquiry choices, and its `/divisions/<slug>` page.
- Check `git diff` for unrelated changes. Run the production build when dependencies are installed; do not claim a build passed if it could not run.
- Push to GitHub when the user asks to publish or when that instruction is part of the active task.

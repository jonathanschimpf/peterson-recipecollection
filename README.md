# 🥘 Peterson Recipe Collection

The **Peterson Recipe Collection** is a lovingly crafted digital archive of over 200+ handwritten family recipes — scanned, transcribed, and organized using SvelteKit.

Built as a nostalgic, front-end experience for browsing, zooming, and reading verbatim family recipes (dating back to the 1980s), this project is powered by modern web tech while honoring the charm of vintage 3x5 recipe cards.

---

## 🔧 Tech Stack

- **Framework:** [SvelteKit](https://kit.svelte.dev/)
- **Hosting:** [Netlify](https://netlify.com/)
- **Styling:** Tailwind CSS
- **Image Zoom Modal:** Custom-built, mobile-friendly, with smooth scroll/pinch zooming
- **Search:** Real-time global search powered by a writable Svelte store
- **Routing:** Dynamic category and slug-based routing (`/categories/Desserts` → `/recipes/chocolate-chip-cookies`)
- **Data Source:** Recipes stored as `.md` files, with metadata mapped via `recipe_data.json`

---

## 📁 Project Structure

```bash
.
├── src
│   ├── routes
│   │   ├── recipes/[slug]      # Dynamic recipe pages
│   │   ├── categories          # Category-based routes
│   │   └── +layout.svelte      # Shared layout + search injection
│   ├── lib/components
│   │   └── ScanModal.svelte    # Custom modal w/ zoomable scan images
│   └── lib/data
│       └── recipe_data.json    # Category + path metadata
├── static
│   └── scan-content            # All `.jpg` scans and `.md` transcriptions
└── app.css                     # Tailwind + base styles


A GPT helped write this 'README.md' for me because it's 2025 😃✨
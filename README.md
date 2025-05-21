# 🥘 Peterson Recipe Collection 🥘

A nostalgic archive of handwritten and printed recipes, continuously collected and preserved by the Peterson family since the 1980s. Digitized by scanning & OCR-GPT-transcribed in 2024–2025. Built with SvelteKit to preserve the charm of the originals in a clean, modern interface.

Carefully organized for fast browsing, smooth zooming, and paired scans and transcriptions — this project blends nostalgia with responsive, mobile-first design to honor decades of meals and memories.

An 'About' section with more backstory is coming soon.

---

## 🛠️ Tech Stack

- **Framework:** SvelteKit  
- **Hosting:** Netlify  
- **Styling:** Tailwind CSS (mobile-first, minimal, and intuitive)  
- **Image Modal:** Custom `<ScanModal.svelte>` with zoom, scroll lock, SSR checks, and pinch support  
- **Search:** Real-time global search powered by a writable Svelte store  
- **Content Loading:** Raw HTML transcriptions imported via `import.meta.glob()` for SSR safety

---

## 🗂️ Routing

- `/categories/[category]` — explore recipes by category (e.g., Appetizers, Desserts)  
- `/recipes/[slug]` — dynamic recipe pages with scan + transcription

---

## 💾 Data Source

- Recipes stored as raw `.html` files (converted from markdown)  
- Metadata mapped in `recipe_data.json` for category, name, and file paths

---

## ✅ Key Features

- 🧠 **Accessible by design:** semantic structure, keyboard-friendly modal  
- 🧲 **Fast image loads:** lightweight thumbnails with optional full-zoom  
- 🧵 **Verbatim transcriptions:** exactly as written — quirks, typos, and all  
- 🔍 **Instant global search:** returns results as you type, inline on any page  
- ⚙️ **Fully deployable on Netlify:** no runtime config or database required

---

## ✍️ README co-authored by a GPT — just like the recipe transcriptions.

✨ A GPT helped write this README — because it’s 2025.  
🔗 [petersonrecipecollection.netlify.app](https://petersonrecipecollection.netlify.app)


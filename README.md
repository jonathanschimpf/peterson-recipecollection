# Peterson Recipe Collection

🥘 A handcrafted digital archive of 226+ handwritten and printed family recipes — collected since the mid-1980s, then scanned and GPT-OCR-transcribed in 2024–2025. Built with SvelteKit to preserve the charm of the originals in a clean, modern interface.

Carefully organized for fast browsing, smooth zooming, and reading verbatim text — this project blends nostalgia with responsive design to honor decades of meals and memories.

The 'About' section will be updated to include some backstory soon.

## 🛠️ Tech Stack

- **Framework**: SvelteKit  
- **Hosting**: Netlify  
- **Styling**: Tailwind CSS (mobile-first, minimal, and intuitive)  
- **Image Modal**: Custom `<ScanModal.svelte>` with zoom, scroll lock, and pinch support  
- **Search**: Real-time global search powered by a writable Svelte store  

## 🗂️ Routing

- `/categories/[category]` — explore recipes by category (e.g., Appetizers, Desserts)  
- `/recipes/[slug]` — dynamic recipe pages with scan + transcription  

## 💾 Data Source

- Recipes stored as raw `.html` files (converted from markdown)  
- Metadata mapped in `recipe_data.json` for category, name, and file paths  

## ✅ Key Features

- 🧠 **Accessible by design**: semantic structure, keyboard-friendly modal  
- 🧲 **Fast image loads**: lightweight thumbnails with optional full-zoom  
- 🧵 **Verbatim transcriptions**: exactly as written — quirks, typos, and all  
- 🔍 **Instant global search**: returns results as you type, inline on any page  

---

✨ A GPT helped write this README — because it’s 2025.  
🔗 [petersonrecipecollection.netlify.app](https://petersonrecipecollection.netlify.app)

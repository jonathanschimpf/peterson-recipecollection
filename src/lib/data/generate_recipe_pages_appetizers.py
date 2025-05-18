import os

# === Config ===
TARGET_CATEGORY = "Appetizers"
text_dir = "../../../static/scan-content/text"
output_dir = "../../../src/routes/recipes"
image_path_prefix = "/scan-content/images"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

for filename in os.listdir(text_dir):
    if filename.endswith(".md") and filename.startswith(f"{TARGET_CATEGORY} - "):
        base_name = filename[:-3]
        parts = base_name.split(" - ")

        if len(parts) < 2:
            print(f"⚠️ Skipping invalid filename: {filename}")
            continue

        category = parts[0].strip().lower().replace(" ", "-")
        recipe_name = parts[1].strip()
        recipe_slug = recipe_name.lower().replace(" ", "-").split("---")[0].strip()

        recipe_dir = os.path.join(output_dir, recipe_slug)
        os.makedirs(recipe_dir, exist_ok=True)

        # Read markdown
        with open(os.path.join(text_dir, filename), "r", encoding="utf-8") as f:
            content = f.read().replace("\\", "\\\\").replace("`", "\\`")

        image_filename = filename.replace(".md", ".jpg")
        image_url = f"{image_path_prefix}/{image_filename}"

        # === Write +page.svelte ===
        with open(os.path.join(recipe_dir, "+page.svelte"), "w", encoding="utf-8") as f:
            f.write(f"""<script>
  import {{ marked }} from 'marked';
  export let title;
  export let content;
</script>

<a href="/categories/{category}" class="back-arrow">←</a>
<h1 class="recipe-title">{{title}}</h1>

<div class="recipe-container">
  <img src="{image_url}" alt="{{title}}" class="recipe-image" />
</div>

<div class="recipe-text">
  {{@html marked(content)}}
</div>

<style>
  .back-arrow {{
    text-decoration: none;
    font-size: 24px;
    font-weight: bold;
    color: black;
    display: inline-block;
    margin: 1rem;
    transition: color 0.2s ease-in-out;
  }}

  .back-arrow:hover,
  .back-arrow:active {{
    color: lightgrey;
  }}

  .recipe-title {{
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 20px;
  }}

  .recipe-container {{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 80%;
    padding-bottom: 40px;
  }}

  .recipe-image {{
    max-width: 100%;
    height: auto;
    display: block;
  }}

  .recipe-text {{
    text-align: center;
    padding: 20px;
    font-size: 1.2em;
    line-height: 1.5;
  }}
</style>
""")

        # === Write +page.js ===
        with open(os.path.join(recipe_dir, "+page.js"), "w", encoding="utf-8") as f:
            f.write(f"""export async function load() {{
  return {{
    title: "{recipe_name}",
    content: `{content}`
  }};
}}
""")

        print(f"✅ Created route: /recipes/{recipe_slug}")

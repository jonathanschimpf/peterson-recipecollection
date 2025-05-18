import os

# Define the directories
text_dir = "static/scan-content/text"
output_dir = "src/routes/recipes"

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

# Loop through all .md files and generate recipe pages
for filename in os.listdir(text_dir):
    if filename.endswith(".md"):  # Now looking for .md instead of .txt
        md_path = os.path.join(text_dir, filename)
        recipe_name = filename.replace(".md", "")  # Remove .md extension
        recipe_slug = recipe_name.lower().replace(" ", "-")  # Convert name to URL-friendly slug
        recipe_page_path = os.path.join(output_dir, f"{recipe_slug}.svelte")

        # Read the markdown content
        with open(md_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Svelte template for displaying the recipe
        svelte_template = f"""<script>
    export let data;
</script>

<h1>{recipe_name}</h1>

<pre>{{`{content}`}}</pre>
"""

        # Write the Svelte file
        with open(recipe_page_path, "w", encoding="utf-8") as f:
            f.write(svelte_template)

        print(f"✅ Created: {recipe_page_path}")

print("🎉 Recipe pages generated successfully!")

import os
import json

# Get absolute path to the project root
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))

# Define correct paths based on your folder structure
SCAN_DIR = os.path.join(BASE_DIR, "static/scan-content")
IMG_DIR = os.path.join(SCAN_DIR, "scans")  # JPG files
TXT_DIR = os.path.join(SCAN_DIR, "text")  # TXT files
OUTPUT_JSON = os.path.join(os.path.dirname(__file__), "recipe_data.json")

# Ensure directories exist
if not os.path.exists(IMG_DIR):
    print(f"❌ Error: Image directory not found: {IMG_DIR}")
    exit(1)

if not os.path.exists(TXT_DIR):
    print(f"⚠️ Warning: Text directory not found: {TXT_DIR} (Skipping text files)")

# List to store all recipes in a flat structure
recipes_list = []

# Process image files
for filename in sorted(os.listdir(IMG_DIR)):  # Sort filenames for consistency
    if filename.endswith(".jpg"):
        parts = filename.rsplit(".", 1)[0].split(" - ")  # Split by " - " to match real naming convention
        
        if len(parts) >= 2:
            category = parts[0].strip()
            recipe_name = parts[1].strip()

            # Check for a matching text file
            txt_filename = f"{filename.rsplit('.', 1)[0]}.txt"
            txt_path = os.path.join(TXT_DIR, txt_filename)
            has_text = os.path.exists(txt_path)

            # Append recipe as a flat entry
            recipes_list.append({
                "category": category,
                "recipe_name": recipe_name,
                "image_path": f"/scan-content/scans/{filename}",
                "text_path": f"/scan-content/text/{txt_filename}" if has_text else None
            })

# Sort final list by category, then by recipe name
recipes_list = sorted(recipes_list, key=lambda x: (x["category"], x["recipe_name"]))

# Save to JSON with proper UTF-8 encoding
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(recipes_list, f, indent=4, ensure_ascii=False)  # Fixes Unicode escaping issue

print(f"✅ JSON file generated: {OUTPUT_JSON}")

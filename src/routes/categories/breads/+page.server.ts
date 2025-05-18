import fs from "fs";
import path from "path";
import type { PageServerLoad } from "./$types";

type Recipe = {
    category: string;
    recipe_name: string;
    image_path: string;
    text_path: string;
};

// Path to JSON file
const filePath = path.join(process.cwd(), "src/lib/data/recipe_data.json");

export const load: PageServerLoad = async () => {
    try {
        // Read and parse JSON file
        const rawData = fs.readFileSync(filePath, "utf8");
        console.log("Raw JSON Data:", rawData); // DEBUG

        const data: Recipe[] = JSON.parse(rawData);
        console.log("Parsed JSON Data:", data); // DEBUG

        // Extract all categories to check for mismatches
        const categoriesFound = data.map(recipe => recipe.category);
        console.log("Categories Found:", [...new Set(categoriesFound)]); // DEBUG

        // FILTER FOR "Breads" CATEGORY
        const breads: Recipe[] = data.filter(
            (recipe) => recipe.category.trim() === "Breads"
        );

        console.log("Filtered Breads Data:", breads); // DEBUG

        // RETURN OBJECT WITH BREADS
        return { breads };  // ✅ This ensures `breads` is available in +page.svelte
    } catch (error) {
        console.error("ERROR LOADING RECIPE DATA:", error);
        return { breads: [] }; // ✅ Also return empty array in case of failure
    }
};

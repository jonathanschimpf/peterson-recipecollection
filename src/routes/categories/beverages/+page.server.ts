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

        const data: Recipe[] = JSON.parse(rawData);

        // Extract all categories to check for mismatches
        const categoriesFound = data.map(recipe => recipe.category);

        // Filter only "Beverages" category
        const beverages: Recipe[] = data.filter(
            (recipe) => recipe.category.trim() === "Beverages"
        );


        return { beverages };
    } catch (error) {
        console.error("ERROR LOADING RECIPE DATA:", error);
        return { beverages: [] }; // Return empty array if JSON load fails
    }
};

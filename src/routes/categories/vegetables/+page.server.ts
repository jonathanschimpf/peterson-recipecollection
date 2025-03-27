import fs from "fs";
import path from "path";
import type { PageServerLoad } from "./$types";

type Recipe = {
    category: string;
    recipe_name: string;
    image_path: string;
    text_path: string | null;
};

// PATH TO JSON FILE
const filePath = path.join(process.cwd(), "src/lib/data/recipe_data.json");

export const load: PageServerLoad = async () => {
    try {
        // READ AND PARSE JSON FILE
        const rawData = fs.readFileSync(filePath, "utf8");
        console.log("Raw JSON Data:", rawData); // DEBUG

        const data: Recipe[] = JSON.parse(rawData);
        console.log("Parsed JSON Data:", data); // DEBUG

        // EXTRACT ALL CATEGORIES TO CHECK FOR MISMATCHES
        const categoriesFound = data.map(recipe => recipe.category);
        console.log("Categories Found:", [...new Set(categoriesFound)]); // DEBUG

        // FILTER ONLY "VEGETABLES" CATEGORY
        const vegetables: Recipe[] = data.filter(
            (recipe) => recipe.category.trim() === "Vegetables"
        );

        console.log("Filtered Vegetables Data:", vegetables); // DEBUG

        return { vegetables };
    } catch (error) {
        console.error("ERROR LOADING RECIPE DATA:", error);
        return { vegetables: [] }; // RETURN EMPTY ARRAY IF JSON LOAD FAILS
    }
};

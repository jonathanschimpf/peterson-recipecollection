import fs from "fs";
import path from "path";
import type { PageServerLoad } from "./$types"; // Ensure correct type import

type Recipe = {
    category: string;
    recipe_name: string;
    image_path: string;
    text_path: string;
};

// UPDATE FILE PATH TO POINT TO `lib/data/`
const filePath = path.join(process.cwd(), "src/lib/data/recipe_data.json");

export const load: PageServerLoad = async () => {
    try {
        // READ AND PARSE JSON FILE
        const rawData = fs.readFileSync(filePath, "utf8");

        const data = JSON.parse(rawData);

        // EXTRACT "Appetizers" CATEGORY
        const appetizers: Recipe[] = data.filter(
            (recipe: Recipe) => recipe.category.trim() === "Appetizers"
        );

        return { appetizers };
    } catch (error) {
        console.error("ERROR LOADING RECIPE DATA:", error);
        return { appetizers: [] }; // RETURN EMPTY ARRAY IF JSON FILE FAILS TO LOAD
    }
};

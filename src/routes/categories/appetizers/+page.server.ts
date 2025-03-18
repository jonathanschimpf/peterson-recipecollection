import fs from "fs";
import path from "path";

type Recipe = {
    category: string;
    recipe_name: string;
    image_path: string;
    text_path: string;
};

// UPDATE FILE PATH TO POINT TO `lib/data/`
const filePath = path.join(process.cwd(), "src/lib/data/recipe_data.json");

export async function load() {
    try {
        // READ AND PARSE JSON FILE
        const rawData = fs.readFileSync(filePath, "utf8");
        console.log("Raw JSON Data:", rawData); // 🔍 DEBUG: Ensure JSON is read correctly

        const data: Recipe[] = JSON.parse(rawData);
        console.log("Parsed JSON Data:", data); // 🔍 DEBUG: Ensure JSON parses correctly

        // FILTER ONLY RECIPES UNDER THE "Appetizers" CATEGORY
        const appetizers = data.filter((recipe) => recipe.category.trim() === "Appetizers");
        console.log("Filtered Appetizers Data:", appetizers); // 🔍 DEBUG: Check filtering

        return { appetizers };
    } catch (error) {
        console.error("ERROR LOADING RECIPE DATA:", error);
        return { appetizers: [] }; // RETURN EMPTY ARRAY IF JSON FILE FAILS TO LOAD
    }
}

import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import recipeData from '$lib/data/recipe_data.json';

export async function load({ params }) {
    const slug = params.slug.toLowerCase();

    const matchedRecipe = recipeData.find((recipe) => {
        const recipeSlug = recipe.recipe_name.toLowerCase().replace(/\s+/g, '-');
        return recipeSlug === slug;
    });

    if (!matchedRecipe) {
        console.error(`❌ No recipe matched slug: ${slug}`);
        throw error(404, 'Recipe not found');
    }

    const htmlPath = path.resolve(matchedRecipe.text_path);

    console.log(`📄 Attempting to read HTML from: ${htmlPath}`);

    try {
        const text = fs.readFileSync(htmlPath, 'utf-8');
        return {
            recipe: matchedRecipe,
            text
        };
    } catch (err) {
        console.error(`❌ Failed to read HTML: ${err.message}`);
        throw error(500, 'Error loading recipe HTML content');
    }
}

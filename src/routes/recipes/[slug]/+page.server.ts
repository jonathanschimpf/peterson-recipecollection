// +page.server.ts
import type { PageServerLoad } from './$types';
import recipeData from '$lib/data/recipe_data.json';

// GLOB ALL HTML FILES UNDER src/lib/data/html/ and bundle them at build time.
const htmlFiles = import.meta.glob('/src/lib/data/html/*.html', { as: 'raw', eager: true });

export const load: PageServerLoad = async ({ params }) => {
    const slug = params.slug.toLowerCase();

    // Find the recipe by normalizing the recipe name to match the slug.
    const recipe = recipeData.find((r) => {
        const normalized = r.recipe_name.toLowerCase().replace(/\s+/g, '-');
        return normalized === slug;
    });

    if (!recipe) {
        throw new Error(`Recipe not found for slug: ${slug}`);
    }

    // Use the text_path to locate the bundled HTML content.
    const htmlPath = recipe.text_path;
    const htmlContent = htmlFiles[`/${htmlPath}`];

    if (!htmlContent) {
        throw new Error(`Error loading recipe HTML content from path: ${htmlPath}`);
    }

    return {
        recipe,        // Return the full recipe object (includes category, name, image_path, etc.)
        htmlContent    // The raw HTML content that you'll render in the client.
    };
};

// +page.server.ts
import type { PageServerLoad } from './$types';
import recipeData from '$lib/data/recipe_data.json';

// GLOB ALL HTML FILES UNDER DATA
const htmlFiles = import.meta.glob('/src/lib/data/html/*.html', { as: 'raw', eager: true });

export const load: PageServerLoad = async ({ params }) => {
    const slug = params.slug;

    // FIND RECIPE OBJECT BY SLUG
    const recipe = recipeData.find((r) => {
        const normalized = r.recipe_name.toLowerCase().replace(/\s+/g, '-');
        return normalized === slug;
    });

    if (!recipe) {
        throw new Error(`Recipe not found for slug: ${slug}`);
    }

    // LOOKUP GLOB-MATCHED HTML USING FULL PATH
    const htmlPath = recipe.text_path;
    const htmlContent = htmlFiles[`/${htmlPath}`];

    if (!htmlContent) {
        throw new Error(`Error loading recipe HTML content from path: ${htmlPath}`);
    }

    return {
        title: recipe.recipe_name,
        image: recipe.image_path,
        htmlContent
    };
};

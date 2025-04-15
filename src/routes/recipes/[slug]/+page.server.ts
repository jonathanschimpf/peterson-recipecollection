import { error } from '@sveltejs/kit';
import recipeData from '$lib/data/recipe_data.json';
import type { Recipe } from '../../../types/json';
import { marked } from 'marked';

// SLUGIFY FUNCTION TO MATCH ROUTE PARAM
function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export async function load({ params, fetch }) {
    const requestedSlug = slugify(params.slug);
    console.log('📦 Requested slug:', requestedSlug);

    const recipe: Recipe | undefined = recipeData.find(
        (r) => slugify(r.recipe_name) === requestedSlug
    );

    if (!recipe) {
        console.warn('❌ Recipe not found for slug:', requestedSlug);
        throw error(404, 'Recipe not found');
    }

    console.log('✅ Matched recipe:', recipe.recipe_name);

    let text = '';

    try {
        const res = await fetch(`/${recipe.text_path}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = await res.text();
        console.log('📖 Markdown file fetched successfully.');
        text = await marked.parse(raw);
        console.log('✅ Markdown parsed successfully.');
    } catch (err) {
        console.error(`⚠️ Error fetching markdown for ${recipe.recipe_name}:`, err);
        text = '<p><em>No text transcription available.</em></p>';
    }

    return {
        recipe,
        text
    };
}

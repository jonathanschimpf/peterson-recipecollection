import { error } from '@sveltejs/kit';
import recipeData from '$lib/data/recipe_data.json';
import type { Recipe } from '../../../types/json';
import { marked } from 'marked';
import fs from 'fs/promises';
import path from 'path';

// SLUGIFY FUNCTION TO MATCH ROUTE PARAM
function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export async function load({ params }) {
    const requestedSlug = slugify(params.slug);
    console.log('📦 Requested slug:', requestedSlug);

    // FIND MATCHING RECIPE BASED ON SLUG
    const recipe: Recipe | undefined = recipeData.find(
        (r) => slugify(r.recipe_name) === requestedSlug
    );

    if (!recipe) {
        console.warn('❌ Recipe not found for slug:', requestedSlug);
        throw error(404, 'Recipe not found');
    }

    console.log('✅ Matched recipe:', recipe.recipe_name);

    // CONSTRUCT FULL FILE PATH FROM FILENAME FIELD
    const fullPath = path.join('src/lib/data/recipes', `${recipe.filename}.md`);
    console.log('📄 Attempting to load markdown from:', fullPath);

    let text = '';

    try {
        const raw = await fs.readFile(fullPath, 'utf-8');
        console.log('📖 Raw markdown loaded successfully.');
        text = await marked.parse(raw);
        console.log('✅ Markdown parsed successfully.');
    } catch (err) {
        console.error(`⚠️ Error reading markdown for ${recipe.recipe_name}:`, err);
        text = '<p><em>No text transcription available.</em></p>';
    }

    return {
        recipe,
        text
    };
}

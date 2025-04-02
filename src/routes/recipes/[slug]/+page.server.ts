import { error } from '@sveltejs/kit';
import recipeData from '$lib/data/recipe_data.json';
import type { Recipe } from '../../../types/json';
import { marked } from 'marked';
import fs from 'fs/promises';
import path from 'path';

// SLUGIFY FUNCTION
function slugify(str: string): string {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export async function load({ params }) {
    const requestedSlug = slugify(params.slug);

    const recipe: Recipe | undefined = recipeData.find((r) =>
        slugify(r.recipe_name) === requestedSlug
    );

    if (!recipe) {
        throw error(404, 'Recipe not found');
    }

    // ✅ READ AND PARSE THE MARKDOWN FILE
    const fullPath = path.join('static', recipe.text_path); // markdown path starts from /scan-content/
    let text = '';
    try {
        const raw = await fs.readFile(fullPath, 'utf-8');
        text = await marked.parse(raw); // ✅ AWAIT HERE
    } catch (err) {
        console.error(`Error reading markdown for ${recipe.recipe_name}:`, err);
        text = '<p><em>No text transcription available.</em></p>';
    }

    return {
        recipe,
        text
    };
}

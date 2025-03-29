import fs from 'fs';
import path from 'path';
import type { PageServerLoad } from './$types';
import recipeData from '../../../lib/data/recipe_data.json'; // ✅ RELATIVE FS-SAFE PATH

export const load: PageServerLoad = async ({ params }) => {
    const slug = params.slug;
    console.log('🟣 Incoming slug:', slug);

    // MATCH RECIPE
    const match = recipeData.find((r: any) =>
        r.recipe_name.toLowerCase().replace(/\s+/g, '-') === slug
    );

    if (!match || !match.text_path || !match.image_path) {
        console.warn(`🔴 No valid recipe match or paths for slug: ${slug}`);
        return {
            status: 404,
            body: { error: `No recipe or paths found for slug: ${slug}` }
        };
    }

    // FILE PATHS
    const basePath = 'static';
    const mdFile = path.join(basePath, match.text_path);
    const jpgFile = path.join(basePath, match.image_path);
    const imageUrl = match.image_path;

    if (!fs.existsSync(mdFile)) {
        console.warn(`⚠️ Missing markdown: ${mdFile}`);
        return {
            status: 404,
            body: { error: `Missing markdown for: ${slug}` }
        };
    }

    if (!fs.existsSync(jpgFile)) {
        console.warn(`⚠️ Missing JPG scan: ${jpgFile}`);
        return {
            status: 404,
            body: { error: `Missing JPG scan for: ${slug}` }
        };
    }

    const markdown = fs.readFileSync(mdFile, 'utf-8');

    console.log('✅ Matched:', {
        slug,
        recipe_name: match.recipe_name,
        imageUrl,
        mdFile
    });

    return {
        slug,
        recipeName: match.recipe_name,
        imageUrl,
        markdown
    };
};

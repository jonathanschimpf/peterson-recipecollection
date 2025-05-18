/// <reference types="vite/client" />

import recipeData from '$lib/data/recipe_data.json';

// ✅ Proper glob import
const htmlFiles = import.meta.glob('$lib/data/html/*.html', {
  query: '?raw',
  import: 'default',
  eager: true
});

export const load = async ({ params }: { params: { slug: string } }) => {
  console.log('--- [slug] PAGE SERVER LOAD INIT ---');
  const slug = params.slug.toLowerCase();
  console.log('Slug:', slug);

  const recipe = recipeData.find((r) => {
    const normalized = r.recipe_name.toLowerCase().replace(/\s+/g, '-');
    return normalized === slug;
  });

  if (!recipe) {
    console.error('❌ Recipe not found for slug:', slug);
    throw new Error(`Recipe not found for slug: ${slug}`);
  }
  console.log('✅ Recipe found:', recipe.recipe_name);

  const matchingKey = Object.keys(htmlFiles).find((key) =>
    key.endsWith(recipe.text_path.split('/html/')[1])
  );

  if (!matchingKey) {
    console.error('❌ No matching HTML key found for:', recipe.text_path);
    throw new Error(`HTML content missing for: ${recipe.text_path}`);
  }
  console.log('✅ Matching HTML key:', matchingKey);

  const htmlContent = htmlFiles[matchingKey];

  return {
    recipe,
    htmlContent,
    credit: recipe.credit ?? null  // 🆕 passing credit
  };
};

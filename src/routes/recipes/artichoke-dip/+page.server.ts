// src/routes/recipes/artichoke-dip/+page.server.ts
import fs from 'node:fs';
import path from 'node:path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const markdownPath = path.join(
    process.cwd(),
    'static/scan-content',
    'Appetizers - Artichoke Dip - Betsy Pearson.md'
  );

  const imagePath = '/scan-content/Appetizers - Artichoke Dip - Betsy Pearson.jpg';

  let content = '';
  try {
    content = fs.readFileSync(markdownPath, 'utf-8');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
  }

  const title = 'Artichoke Dip';

  return {
    title,
    content,
    image: imagePath
  };
};

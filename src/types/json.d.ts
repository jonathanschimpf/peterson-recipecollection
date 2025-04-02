declare module '*.json' {
    const value: any;
    export default value;
}

// src/types/json.d.ts

export type Recipe = {
    category: string;
    recipe_name: string;
    image_path: string;
    text_path: string;
    slug?: string; // OPTIONAL — will be derived at runtime
};



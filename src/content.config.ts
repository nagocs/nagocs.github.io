// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // A modern Content Layer Loader

const blog = defineCollection({
  // A loader beolvassa az összes md és mdx fájlt a megadott báziskönyvtárból
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // Biztonságos dátum konverzió
    category: z.string().default('blog-post'),
    lang: z.enum(['hu', 'en']), // i18n nyelvi azonosító kötelezővé tétele
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };

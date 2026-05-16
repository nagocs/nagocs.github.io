// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.string().default('blog-post'),
    lang: z.enum(['hu', 'en']),
    tags: z.array(z.string()).default([]),
  }),
});

// Új kollekció a Rólam (About me) szekció számára
const about = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/about' }),
  schema: z.object({
    // Egyszerű séma, mivel a tartalom a lényeg, de frontmatter metaadatok is adhatók hozzá, ha szükséges
    title: z.string().optional(),
  }),
});

export const collections = { blog, about };

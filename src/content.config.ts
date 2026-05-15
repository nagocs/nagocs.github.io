import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders"; // Importáld a modern loadert

const blog = defineCollection({
  // Az új API-hoz meg kell adni a loader-t
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(), // A coerce segít, ha a YAML-ben stringként van a dátum
    description: z.string(),
    category: z.string().default("blog-post"),
  }),
});

export const collections = { blog };

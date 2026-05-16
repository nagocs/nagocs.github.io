// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import astroMermaid from 'astro-mermaid';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Az Astro integrációk listája
  integrations: [
    mdx(),
    astroMermaid(), // Feldolgozza a ```mermaid kódblokkokat a Markdown fájlokban
  ],

  // Markdown és MDX processzor konfigurálása a matematikai képletekhez
  markdown: {
    remarkPlugins: [remarkMath], // Felismeri a $ és $$ jelöléseket
    rehypePlugins: [
      [
        rehypeKatex,
        {
          // Szigorú beállítások kikapcsolása, hogy ne álljon le a build kisebb szintaktikai hibákért
          strict: false,
          macros: {
            '\\R': '\\mathbb{R}',
          },
        },
      ],
    ],
  },

  // A meglévő Vite konfigurációd a Tailwind v4-gyel
  vite: {
    plugins: [tailwindcss()],
  },

  output: 'static', // <--- Kényszerített statikus generálás
});

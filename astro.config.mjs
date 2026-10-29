// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import astroMermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://nagocs.github.io',
  // Az Astro integrációk listája
  integrations: [mdx(), astroMermaid({ enableLog: false })],

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
    build: {
      rollupOptions: {
        output: {
          // Keep shared diagram utilities cacheable without loading Mermaid on ordinary pages.
          onlyExplicitManualChunks: true,
          manualChunks(id) {
            const modulePath = id.replaceAll('\\', '/');
            // CommonJS helpers must not live in a chunk that imports their consumers.
            if (modulePath.includes('commonjsHelpers.js')) {
              return 'diagram-compat';
            }
            if (/\/node_modules\/(d3[^/]*|internmap)\//.test(modulePath)) {
              return 'diagram-d3';
            }
            if (
              modulePath.includes('/node_modules/dompurify/') ||
              modulePath.includes('/node_modules/@braintree/sanitize-url/')
            ) {
              return 'diagram-sanitize';
            }
            if (modulePath.includes('/node_modules/khroma/')) {
              return 'diagram-colors';
            }
            if (modulePath.includes('/node_modules/@iconify/')) {
              return 'diagram-icons';
            }
            if (modulePath.includes('/node_modules/dayjs/')) {
              return 'diagram-dates';
            }
            if (modulePath.includes('/node_modules/es-toolkit/')) {
              return 'diagram-utils';
            }
          },
        },
      },
    },
  },

  output: 'static',
});

import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.ekp.hr',
  trailingSlash: 'never',
  build: {
    format: 'file',
    // CSS manji od ~6 KB ide inline u <head>, ostalo kao jedna cache-abilna datoteka
    inlineStylesheets: 'auto',
  },
  // Stranice se učitavaju unaprijed kad je link vidljiv, pa je klik trenutan
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  image: {
    responsiveStyles: false,
  },
  compressHTML: true,
});

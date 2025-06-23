// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import storyblok from '@storyblok/astro';

export default defineConfig({
  site: 'http://dayonetalent.com',

  integrations: [
    react(),
    sitemap(),
    storyblok({
      accessToken: process.env.STORYBLOK_TOKEN,
      bridge: process.env.NODE_ENV === 'development', // Enable Visual Editor in development
      apiOptions: {
        region: 'us', // Change to 'eu' if your space is in Europe
      },
      components: {
        page: 'storyblok/Page',
        article: 'storyblok/Article',
        teaser: 'storyblok/Teaser',
      },
    }),
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';
import mkcert from 'vite-plugin-mkcert';

// Load environment variables using Astro's method
const env = loadEnv('', process.cwd(), 'STORYBLOK');
const { STORYBLOK_TOKEN } = loadEnv(
	import.meta.env.MODE,
	process.cwd(),
	'',
);

// Debug: Log the token to make sure it's being read
console.log('STORYBLOK_TOKEN:', env.STORYBLOK_TOKEN ? 'Token is set' : 'Token is missing');
console.log('Token length:', env.STORYBLOK_TOKEN?.length || 0);
console.log('NODE_ENV:', process.env.NODE_ENV);

export default defineConfig({
  site: 'http://dayonetalent.com',

  integrations: [
    react(),
    sitemap(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: process.env.NODE_ENV === 'development',
      apiOptions: {
        region: 'eu', // Change to 'eu' if your space is in Europe
      },
      components: {
        page: 'storyblok/Page',
        article: 'storyblok/Article',
        teaser: 'storyblok/Teaser',
      },
    }),
  ],
  server: {
    https: true
  },
  output: 'server',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: {
      prefixDefaultLocale: false
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
      mkcert()
    ]
  }
});
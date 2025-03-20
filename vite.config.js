import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import createSitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSitemap({
      hostname: 'https://maellecamissogo.com', // Ton URL
      dynamicRoutes: [
        '/projets',
        '/contact',
        '/projet/1',
        '/projet/2',
        '/projet/3',
        '/projet/4',
        '/projet/5',
        '/projet/6',
        '/projet/7',
        '/projet/8',
        '/projet/9',
        '/projet/10',
        '/projet/11',
        '/mentions-legales',

      ],
    })
  ],
})

import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub project pages URL: https://<user>.github.io/<repo>/
// Must match your repository name (see npm script `build:gh`).
const GH_PAGES_BASE = '/DatingChatApp/'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Production builds target GitHub Pages; `vite dev` keeps "/" for local dev.
  base: mode === 'production' ? GH_PAGES_BASE : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))

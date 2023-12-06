import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import VitePluginReact from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePluginReact(),
  ],
})


import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/proyectoReactDL/', // Ruta base para GitHub Pages
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Use '/' for dev, '/MealPlanner/' for production (GitHub Pages)
  // Change '/MealPlanner/' to '/' if using a custom domain
  const base = command === 'serve' ? '/' : '/MealPlanner/'
  
  return {
    plugins: [react()],
    base,
    server: {
      port: 3000
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  }
})


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
        hmr: true,
  },
  define: {
    'process.env.VITE_API_URL':JSON.stringify(process.env.VITE_API_URL)
  }
})

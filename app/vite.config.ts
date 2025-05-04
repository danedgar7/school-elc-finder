import { fileURLToPath, URL } from 'node:url'; // Use node:url for ESM path handling
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL('./src', import.meta.url)),
          },
  },
  plugins: [react()],
})


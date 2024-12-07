import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000, // Default to 3000 if PORT is not set
    host: '0.0.0.0', // Bind to 0.0.0.0 for Render
  },
});

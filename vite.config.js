import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import glsl from 'vite-plugin-glsl';
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: {
      // Force a single three.js instance to avoid duplicate import warnings
      three: resolve(__dirname, 'node_modules/three')
    }
  },
  optimizeDeps: {
    include: ['three']
  }
})

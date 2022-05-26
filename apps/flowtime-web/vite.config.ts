import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import atImport from 'postcss-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [atImport()],
    },
  },
});

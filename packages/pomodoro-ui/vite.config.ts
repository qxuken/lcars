import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// @ts-ignore
import packageJson from './package.json'

let capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);
let name = packageJson.name.split('/')[1].split('-').map(capitalize).join('');
let capitalizedName = packageJson.name.split('/')[1].split('-').map(capitalize).join('');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name,
      fileName: (format) => `main.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: Object.keys(packageJson.peerDependencies),
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: Object.keys(packageJson.peerDependencies).reduce((acc, x) => {
          acc[x] = x;
          return acc;
        },{}),
      }
    }
  }
})

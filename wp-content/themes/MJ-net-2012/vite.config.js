import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'build',
    sourcemap: true,
    emptyOutDir: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        theme: resolve(__dirname, 'assets/js/theme.js'),
        admin: resolve(__dirname, 'assets/js/admin.js'),
        portfolioFeed: resolve(__dirname, 'assets/js/portfolioFeed.js')
      },
      output: {
        entryFileNames: 'js/[name].min.js',
        chunkFileNames: 'js/[name].min.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name].min.css';
          }

          return 'assets/[name][extname]';
        }
      }
    }
  }
});

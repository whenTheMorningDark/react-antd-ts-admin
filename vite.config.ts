import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';


export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      layouts: path.resolve(__dirname, './src/layouts'),
      router: path.resolve(__dirname, './src/router'),
      pages: path.resolve(__dirname, './src/pages'),
      utils: path.resolve(__dirname, './src/utils'),
      modules: path.resolve(__dirname, './src/modules'),
    }
  },
  server: {
    host: '0.0.0.0',
    port: 4000,
    proxy: {},
  }
});

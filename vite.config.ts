/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : undefined,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__test__/setupTests.ts'],
    coverage: {
      exclude: [
        'tailwind.config.js',
        '.prettierrc.cjs',
        'postcss.config.js',
        'src/App.tsx',
        'src/main.tsx',
        'src/components/dashBoard/Admin.tsx',
        'src/components/dashBoard/Table.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['src/App.tsx'],
    },
  },
});

import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
  },
  plugins: [react(), !process.env.CODESANDBOX_HOST && mkcert()],
  define: {
    'process.env.NODE_ENV': '"development"',
    'process.version': '"v16.0.0"',
  },
});

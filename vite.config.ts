import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { devApiPlugin } from './devApiPlugin.js';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Vite only loads .env into import.meta.env for client code by default.
  // The /api handlers read process.env directly (server-only), so load it here too.
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
  };
});

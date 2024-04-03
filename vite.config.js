import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";

// Cargar variables de entorno dependiendo de NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? 'production.env' : 'development.env';
dotenv.config({ path: envFile });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

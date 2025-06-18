import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Host padrão do Vite
    port: 3000, // Porta padrão do Vite
    open: true,
  },
});

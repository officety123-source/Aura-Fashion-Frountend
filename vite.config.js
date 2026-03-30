import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Isse Vite bahar ki files ko touch nahi karega
      allow: ["."],
    },
  },
});

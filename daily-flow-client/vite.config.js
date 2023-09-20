import react from "@vitejs/plugin-react"; //removed swc
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

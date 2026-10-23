import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// React + Vite, with Tailwind CSS added through its official Vite plugin.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

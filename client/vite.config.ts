import { defineConfig } from "vite";
import * as path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      views: path.resolve(__dirname, "./src/views/"),
      components: path.resolve(__dirname, "./src/components/"),
      state: path.resolve(__dirname, "./src/state/"),
      theme: path.resolve(__dirname, "./src/theme/"),
      utils: path.resolve(__dirname, "./src/utils/"),
      types: path.resolve(__dirname, "./src/types/"),
    }
  },
});

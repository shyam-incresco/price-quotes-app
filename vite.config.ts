import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://price-quote.camped.academy/", // Your Frappe backend URL
        changeOrigin: true, // Ensures the origin of the host header is changed to target
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' prefix before forwarding the request
      },
    },
  },
});

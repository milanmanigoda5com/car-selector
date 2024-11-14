import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "https://rateengine.ship.cars",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // Configure different API URL based on production or development
  define: {
    "process.env.API_URL": JSON.stringify(
      process.env.NODE_ENV === "production"
        ? "https://rateengine.ship.cars/api/v2" // Production API URL
        : "/api" // Proxy URL for development
    ),
  },
});

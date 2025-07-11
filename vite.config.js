import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
  plugins: [react(), tailwindcss()],
 server: {
  host: "0.0.0.0",
  proxy: {
    '/api': {
      target: env.VITE_API_URL,
      changeOrigin: true,
      secure: env.VITE_NODE_ENV === "production",
      ws: true,
    }
  }
},
}
})


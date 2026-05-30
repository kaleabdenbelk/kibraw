// @ts-nocheck
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "react-native-reanimated": path.resolve(__dirname, "./src/shims/react-native-reanimated-shim.tsx"),
      "react-native": path.resolve(__dirname, "./src/shims/react-native-shim.tsx"),
      "@rn-primitives/accordion": path.resolve(__dirname, "./src/shims/rn-primitives-accordion-shim.tsx"),
      "lucide-react-native": "lucide-react",
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

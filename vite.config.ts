import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({ base: "/aws-certification-simulation-demo/", plugins: [react()], build: { outDir: "dist" } });

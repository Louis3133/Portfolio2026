import { resolve } from "node:path";
import "./lib/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: false },

  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@tresjs/nuxt",
  ],

  css: ["~/assets/scss/main.scss"],

  eslint: {
    config: {
      standalone: false,
    },
  },

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },

  vite: {
    assetsInclude: ["**/*.svg"],

    resolve: {
      alias: {
        "@scss": resolve(__dirname, "assets/scss"),
        "@fonts": resolve(__dirname, "assets/fonts"),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ["import"],
          additionalData: `
          @use "~/assets/scss/functions" as *;
          @use "~/assets/scss/variables" as *;
        `,
        },
      },
    },
  },
});

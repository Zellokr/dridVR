// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-mdi",
    "nuxt-svgo",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/device",
    "@nuxtjs/google-analytics",
  ],
  googleAnalytics: {
    id: "G-814JQT6YBZ",
  },
  svgo: {
    defaultImports: "component",
  },
  ssr: false,
  app: {
    head: {
      link: [
        { rel: "preload", href: "/img/banner_image_1.webp", as: "image" },
        { rel: "preload", href: "/img/banner_image_2.webp", as: "image" },
        { rel: "preload", href: "/img/Behemoth.webp", as: "image" },
      ],
    },
  },
});

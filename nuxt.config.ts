// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: "2025-06-07",
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    // Private keys (only available server-side)
    brevoApiKey: process.env.BREVO_API_KEY,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "nuxt-mdi",
    "nuxt-svgo",
    "@nuxtjs/color-mode",
    "@nuxtjs/device",
    "nuxt-gtag",
    "@nuxtjs/sitemap"
  ],
  build: {
    analyze: {
      gzipSize: true,
      enabled: true,
      brotliSize: true,
    },
  },
  sitemap: {
    hostname: "https://juegosquestbaratos.com", // Asegúrate de cambiar esto a tu dominio real
    routes: ["/", "/accessories", "games"], // Solo la ruta de la página principal
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      "/": {
        swr: true,
        cache: {
          maxAge: 60,
        },
      },
      "/games": {
        swr: 3600,
      },
      "/accessories": {
        swr: 3600,
      },
    },
  },
  ssr: true,
  gtag: {
    enabled: process.env.NODE_ENV === "production",
    id: "G-814JQT6YBZ",
    initCommands: [
      [
        "consent",
        "default",
        {
          ad_user_data: "denied",
          ad_personalization: "denied",
          ad_storage: "denied",
          analytics_storage: "denied",
          wait_for_update: 500,
        },
      ],
    ],
  },
  svgo: {
    defaultImports: "component",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "es",
      },
      meta: [
        {
          name: "juegos baratos",
          content: "Los juegos más baratos de internet",
        },
        {
          name: "juegos VR",
          content: "Videojuegos de realidad virtual",
        },
        {
          name: "Meta Quest",
          content: "Dispositivos de realidad virtual Meta",
        },
        {
          name: "Meta Quest Store",
          content: "Compra dispositivos Meta Quest",
        },
        {
          name: "Accesorios realidad virtual",
          content: "Compra accesorios Meta Quest de realidad virtual",
        },
        {
          name: "Compra videojuegos de realidad virtual",
          content: "Compra videojuegos Meta Quest de realidad virtual",
        },
        {
          name: "Compra videojuegos baratos de realidad virtual",
          content: "Compra videojuegos baratos Meta Quest de realidad virtual",
        },
      ],
      title: "Los mejores juegos de VR baratos",
      link: [
        // {
        //   rel: "preload",
        //   href: "/img/Banner/banner_image_1.webp",
        //   as: "image",
        // },
        // {
        //   rel: "preload",
        //   href: "/img/Banner/banner_image_2.webp",
        //   as: "image",
        // },
        // { rel: "preload", href: "/img/Banner/Behemoth.webp", as: "image" },
      ],
    },
  },
});

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
    "nuxt-gtag",
    "@nuxtjs/sitemap",
    "vue3-carousel-nuxt",
  ],
  sitemap: {
    hostname: "https://juegosquestbaratos.com", // Asegúrate de cambiar esto a tu dominio real
    routes: ["/"], // Solo la ruta de la página principal
    gzip: true,
  },
  gtag: {
    enabled: process.env.NODE_ENV === "production",
    id: "G-814JQT6YBZ",
  },
  svgo: {
    defaultImports: "component",
  },
  ssr: false,
  app: {
    head: {
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
        {
          rel: "preload",
          href: "/img/Banner/banner_image_1.webp",
          as: "image",
        },
        {
          rel: "preload",
          href: "/img/Banner/banner_image_2.webp",
          as: "image",
        },
        { rel: "preload", href: "/img/Banner/Behemoth.webp", as: "image" },
      ],
    },
  },
});

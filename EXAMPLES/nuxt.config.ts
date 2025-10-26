// nuxt.config.ts - Configuración optimizada propuesta
export default defineNuxtConfig({
  // Versión de compatibilidad
  compatibilityDate: '2025-01-26',

  // DevTools
  devtools: {
    enabled: true
  },

  // Características experimentales
  experimental: {
    componentIslands: true,    // Islands Architecture
    payloadExtraction: true,   // Optimización de payload
    viewTransition: true       // View Transitions API
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: true
  },

  // CSS
  css: [
    '~/assets/css/main.css'
  ],

  // Módulos
  modules: [
    '@nuxt/ui',               // ✨ Sistema UI principal
    '@nuxt/image',            // Optimización de imágenes
    '@nuxtjs/sitemap',        // SEO
    '@vueuse/nuxt',           // Utilities
    '@nuxtjs/color-mode'      // Dark mode
  ],

  // Configuración de Nuxt UI
  ui: {
    // Iconos automáticos
    icons: ['lucide'],

    // Colores del tema
    colors: {
      primary: 'blue',
      secondary: 'purple',
      neutral: 'zinc'
    }
  },

  // Configuración de Color Mode
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },

  // Configuración de imágenes
  image: {
    // Formatos modernos
    formats: ['webp', 'avif'],

    // Calidad por defecto
    quality: 80,

    // Responsive breakpoints
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    },

    // Providers
    providers: {
      cloudinary: {
        baseURL: process.env.CLOUDINARY_BASE_URL
      }
    }
  },

  // Sitemap
  sitemap: {
    hostname: 'https://juegosquestbaratos.com',
    routes: [
      '/',
      '/games',
      '/accessories'
    ],
    defaults: {
      changefreq: 'daily',
      priority: 0.8
    }
  },

  // SEO por defecto
  app: {
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'DridVR - Juegos VR para Meta Quest',
      meta: [
        {
          name: 'description',
          content: 'Los mejores juegos de realidad virtual para Meta Quest con descuentos exclusivos'
        },
        {
          name: 'theme-color',
          content: '#0a0a0f'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        }
      ]
    }
  },

  // Nitro (Server)
  nitro: {
    // Compresión de assets
    compressPublicAssets: true,

    // Reglas de caché
    routeRules: {
      // Homepage
      '/': {
        swr: 3600,  // 1 hora
        cache: {
          maxAge: 3600,
          staleMaxAge: 7200
        },
        prerender: true
      },

      // Páginas de contenido
      '/games': {
        swr: 1800,  // 30 minutos
        cache: { maxAge: 1800 },
        prerender: true
      },

      '/accessories': {
        swr: 3600,  // 1 hora
        cache: { maxAge: 3600 },
        prerender: true
      },

      // API endpoints
      '/api/**': {
        cache: {
          maxAge: 300  // 5 minutos
        },
        cors: true
      }
    },

    // Prerender
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/games',
        '/accessories'
      ]
    }
  },

  // Build optimizations
  vite: {
    build: {
      // Code splitting
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks
            'vendor-ui': ['@nuxt/ui'],
            'vendor-vue': ['vue', 'vue-router'],
            'vendor-utils': ['@vueuse/core', 'zod'],
            'vendor-icons': ['lucide-vue-next']
          }
        }
      }
    },

    // CSS code splitting
    css: {
      devSourcemap: true
    },

    // Optimización de dependencias
    optimizeDeps: {
      include: ['@nuxt/ui', '@vueuse/core']
    }
  },

  // SSR
  ssr: true,

  // Runtime config
  runtimeConfig: {
    // Private keys (solo server)
    apiSecret: process.env.API_SECRET,

    // Public keys (client + server)
    public: {
      apiBase: process.env.API_BASE_URL || '/api',
      siteUrl: process.env.SITE_URL || 'https://juegosquestbaratos.com',
      gtagId: process.env.GTAG_ID
    }
  },

  // Tailwind CSS
  tailwindcss: {
    config: {
      darkMode: 'class',
      content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './composables/**/*.{js,ts}',
        './plugins/**/*.{js,ts}',
        './app.vue'
      ]
    }
  }
})

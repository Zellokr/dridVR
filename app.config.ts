export default defineAppConfig({
  ui: {
    // Colores del tema VR
    colors: {
      primary: 'blue',
      secondary: 'purple',
      success: 'green',
      warning: 'yellow',
      error: 'red',
      info: 'cyan',
      neutral: 'zinc'
    },

    // Iconos por defecto (lucide)
    icons: {
      loading: 'i-lucide-loader-circle',
      search: 'i-lucide-search',
      close: 'i-lucide-x',
      check: 'i-lucide-check',
      chevronDown: 'i-lucide-chevron-down',
      external: 'i-lucide-external-link',
      menu: 'i-lucide-menu',
      play: 'i-lucide-play',
      video: 'i-lucide-video',
      heart: 'i-lucide-heart',
      shoppingBag: 'i-lucide-shopping-bag',
      gamepad: 'i-lucide-gamepad-2',
      home: 'i-lucide-home',
      mail: 'i-lucide-mail',
      user: 'i-lucide-user'
    },

    // Configuración de componentes
    button: {
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'md'
      },
      variants: {
        variant: {
          glass: 'bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 text-white shadow-xl'
        }
      }
    },

    card: {
      defaultVariants: {
        variant: 'outline'
      },
      variants: {
        variant: {
          glass: 'bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl'
        }
      }
    },

    input: {
      defaultVariants: {
        color: 'primary',
        variant: 'outline',
        size: 'md'
      }
    },

    modal: {
      defaultVariants: {
        fullscreen: false
      },
      overlay: {
        background: 'bg-black/50 backdrop-blur-sm'
      }
    },

    slideover: {
      defaultVariants: {
        side: 'right'
      },
      overlay: {
        background: 'bg-black/50 backdrop-blur-sm'
      }
    },

    toast: {
      defaultVariants: {
        color: 'primary'
      }
    },

    badge: {
      defaultVariants: {
        color: 'primary',
        variant: 'soft',
        size: 'sm'
      }
    },

    container: {
      constrained: 'max-w-7xl'
    }
  }
})

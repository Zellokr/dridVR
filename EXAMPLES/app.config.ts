// app.config.ts - Configuración de tema Nuxt UI
export default defineAppConfig({
  ui: {
    // Colores del tema
    colors: {
      primary: 'blue',
      secondary: 'purple',
      success: 'green',
      warning: 'yellow',
      error: 'red',
      info: 'cyan',
      neutral: 'zinc'
    },

    // Iconos
    icons: {
      // Icono de carga por defecto
      loading: 'i-lucide-loader-circle',
      // Iconos de estado
      success: 'i-lucide-circle-check',
      error: 'i-lucide-circle-x',
      warning: 'i-lucide-alert-triangle',
      info: 'i-lucide-info'
    },

    // Configuración de Button
    button: {
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'md'
      },

      // Variantes custom
      variants: {
        variant: {
          // Variante glass personalizada
          glass: {
            base: 'bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20'
          }
        }
      }
    },

    // Configuración de Card
    card: {
      defaultVariants: {
        variant: 'outline'
      },

      variants: {
        variant: {
          // Variante glass para cards
          glass: {
            root: 'bg-black/20 backdrop-blur-lg border border-white/10'
          }
        }
      }
    },

    // Configuración de Input
    input: {
      defaultVariants: {
        color: 'primary',
        variant: 'outline',
        size: 'md'
      }
    },

    // Configuración de Modal
    modal: {
      overlay: {
        background: 'bg-black/50 backdrop-blur-sm'
      }
    },

    // Configuración de Toast
    toast: {
      position: 'bottom-right',
      duration: 5000
    },

    // Container
    container: {
      constrained: 'max-w-7xl',
      padding: {
        xs: 'px-4',
        sm: 'sm:px-6',
        lg: 'lg:px-8'
      }
    }
  }
})

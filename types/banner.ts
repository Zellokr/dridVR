/**
 * Interfaz para las imágenes del banner/carousel
 */
export interface BannerImage {
  /** URL de la imagen */
  src: string

  /** Texto alternativo para accesibilidad */
  alt: string

  /** Enlace opcional al hacer clic */
  link?: string

  /** Título opcional del banner */
  title?: string

  /** Descripción opcional */
  description?: string
}

/**
 * Configuración del carousel
 */
export interface CarouselOptions {
  /** Reproducción automática */
  autoplay?: boolean

  /** Intervalo de autoplay en ms */
  interval?: number

  /** Permite loop infinito */
  loop?: boolean

  /** Muestra controles de navegación */
  showControls?: boolean

  /** Muestra indicadores de posición */
  showIndicators?: boolean
}

/**
 * Interfaz principal para representar un juego VR
 */
export interface Game {
  /** Nombre del juego */
  name: string

  /** URL de la imagen del juego */
  imgLink: string

  /** Enlace de afiliado para comprar el juego */
  affiliateLink: string

  /** Enlace opcional al video de YouTube */
  ytLink?: string

  /** Indica si el juego tiene soporte Crossbuy (Quest 2 y 3) */
  crossbuy: boolean

  /** Indica si el juego soporta bHaptics */
  bhaptics: boolean
}

/**
 * Filtros aplicables a la lista de juegos
 */
export interface GameFilters {
  /** Término de búsqueda */
  search: string

  /** Filtrar juegos con video */
  hasVideo: boolean

  /** Filtrar juegos con Crossbuy */
  hasCrossbuy: boolean

  /** Filtrar juegos con soporte bHaptics */
  hasHaptic: boolean
}

/**
 * Opciones para la lista de juegos con paginación
 */
export interface GameListOptions {
  /** Número de juegos por página */
  pageSize?: number

  /** Página inicial */
  initialPage?: number

  /** Filtros activos */
  filters?: Partial<GameFilters>
}

/**
 * Estado de carga de datos
 */
export interface LoadingState {
  /** Indica si está cargando */
  loading: boolean

  /** Mensaje de error si existe */
  error: string | null

  /** Indica si hay más datos por cargar */
  hasMore: boolean
}

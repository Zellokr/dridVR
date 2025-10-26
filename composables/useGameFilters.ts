import type { Game, GameFilters } from '~/types'

/**
 * Composable para manejar filtros de juegos
 *
 * @example
 * ```ts
 * const { filters, resetFilters, hasActiveFilters, filterGames } = useGameFilters()
 *
 * // Aplicar filtros
 * const filtered = filterGames(allGames)
 * ```
 */
export function useGameFilters() {
  // Estado reactivo de filtros
  const filters = reactive<GameFilters>({
    search: '',
    hasVideo: false,
    hasCrossbuy: false,
    hasHaptic: false
  })

  /**
   * Resetea todos los filtros a su estado inicial
   */
  function resetFilters() {
    filters.search = ''
    filters.hasVideo = false
    filters.hasCrossbuy = false
    filters.hasHaptic = false
  }

  /**
   * Verifica si hay algún filtro activo
   */
  const hasActiveFilters = computed(() => {
    return (
      filters.search.length > 0 ||
      filters.hasVideo ||
      filters.hasCrossbuy ||
      filters.hasHaptic
    )
  })

  /**
   * Filtra una lista de juegos según los criterios activos
   *
   * @param games - Array de juegos a filtrar
   * @returns Array filtrado de juegos
   */
  function filterGames(games: Game[]): Game[] {
    let filtered = [...games]

    // Filtro de búsqueda por nombre
    if (filters.search.length >= 3) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(searchLower)
      )
    }

    // Filtro de video
    if (filters.hasVideo) {
      filtered = filtered.filter(game => game.ytLink && game.ytLink.length > 0)
    }

    // Filtro de crossbuy
    if (filters.hasCrossbuy) {
      filtered = filtered.filter(game => game.crossbuy)
    }

    // Filtro de hápticos
    if (filters.hasHaptic) {
      filtered = filtered.filter(game => game.bhaptics)
    }

    return filtered
  }

  /**
   * Cuenta cuántos juegos coinciden con los filtros actuales
   *
   * @param games - Array de juegos a contar
   * @returns Número de juegos filtrados
   */
  function countFilteredGames(games: Game[]): number {
    return filterGames(games).length
  }

  return {
    filters,
    resetFilters,
    hasActiveFilters,
    filterGames,
    countFilteredGames
  }
}

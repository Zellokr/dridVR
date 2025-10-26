// composables/useGameFilters.ts
import type { GameFilters, Game } from '~/types/game'

export function useGameFilters() {
  const filters = reactive<GameFilters>({
    search: '',
    hasVideo: false,
    hasCrossbuy: false,
    hasHaptic: false
  })

  /**
   * Resetea todos los filtros a sus valores por defecto
   */
  const resetFilters = () => {
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
      filters.hasVideo ||
      filters.hasCrossbuy ||
      filters.hasHaptic ||
      filters.search.length >= 3
    )
  })

  /**
   * Filtra una lista de juegos según los filtros activos
   */
  const filterGames = (games: Game[]): Game[] => {
    let filtered = games

    // Filtro de búsqueda por nombre
    if (filters.search.length >= 3) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(game =>
        game.name.toLowerCase().includes(searchLower)
      )
    }

    // Filtro por video
    if (filters.hasVideo) {
      filtered = filtered.filter(game =>
        game.ytLink && game.ytLink.trim() !== ''
      )
    }

    // Filtro por crossbuy
    if (filters.hasCrossbuy) {
      filtered = filtered.filter(game => game.crossbuy)
    }

    // Filtro por soporte háptico
    if (filters.hasHaptic) {
      filtered = filtered.filter(game => game.bhaptics)
    }

    return filtered
  }

  /**
   * Cuenta cuántos juegos coinciden con los filtros
   */
  const countFilteredGames = (games: Game[]): number => {
    return filterGames(games).length
  }

  return {
    filters: readonly(filters),
    resetFilters,
    hasActiveFilters,
    filterGames,
    countFilteredGames
  }
}

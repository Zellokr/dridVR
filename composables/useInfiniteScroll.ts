import type { Ref } from 'vue'

/**
 * Opciones de configuración para infinite scroll
 */
export interface InfiniteScrollOptions {
  /** Número de items por página */
  pageSize?: number

  /** Umbral de intersección (0-1) */
  threshold?: number

  /** Página inicial */
  initialPage?: number
}

/**
 * Composable genérico para implementar infinite scroll
 *
 * @template T - Tipo de los items a paginar
 * @param fetchFn - Función para obtener datos de una página específica
 * @param options - Opciones de configuración
 *
 * @example
 * ```ts
 * const { items, loading, loadMore, reset, hasMore } = useInfiniteScroll(
 *   (page) => fetchGames(page),
 *   { pageSize: 20 }
 * )
 * ```
 */
export function useInfiniteScroll<T>(
  fetchFn: (page: number) => Promise<T[]>,
  options: InfiniteScrollOptions = {}
) {
  const {
    pageSize = 20,
    threshold = 0.5,
    initialPage = 1
  } = options

  // Estado
  const items = ref<T[]>([]) as Ref<T[]>
  const loading = ref(false)
  const currentPage = ref(initialPage)
  const hasMore = ref(true)
  const error = ref<string | null>(null)

  // Elemento centinela para el observer
  const sentinel = ref<HTMLElement | null>(null)

  /**
   * Carga la siguiente página de items
   */
  async function loadMore() {
    if (loading.value || !hasMore.value) return

    loading.value = true
    error.value = null

    try {
      const newItems = await fetchFn(currentPage.value)

      if (newItems.length === 0 || newItems.length < pageSize) {
        hasMore.value = false
      }

      items.value = [...items.value, ...newItems]
      currentPage.value++
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al cargar más items'
      console.error('Error en infinite scroll:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Resetea el estado a la configuración inicial
   */
  function reset() {
    items.value = []
    currentPage.value = initialPage
    hasMore.value = true
    error.value = null
    loading.value = false
  }

  /**
   * Configura el Intersection Observer para detectar scroll
   */
  function setupObserver() {
    if (!sentinel.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && hasMore.value && !loading.value) {
          loadMore()
        }
      },
      {
        threshold,
        rootMargin: '100px'
      }
    )

    observer.observe(sentinel.value)

    // Cleanup
    onUnmounted(() => {
      observer.disconnect()
    })
  }

  // Carga inicial
  onMounted(async () => {
    await loadMore()
    nextTick(() => {
      setupObserver()
    })
  })

  return {
    items,
    loading,
    hasMore,
    error,
    sentinel,
    loadMore,
    reset
  }
}

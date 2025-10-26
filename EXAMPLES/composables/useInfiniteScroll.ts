// composables/useInfiniteScroll.ts
export interface InfiniteScrollOptions {
  pageSize?: number
  initialPage?: number
  threshold?: number
}

/**
 * Composable para implementar infinite scroll
 *
 * @param fetchFn - Función que retorna una promesa con los items a cargar
 * @param options - Opciones de configuración
 * @returns Estado y métodos para manejar el infinite scroll
 *
 * @example
 * const { items, loading, hasMore, sentinel } = useInfiniteScroll(
 *   async (page) => {
 *     const response = await $fetch(`/api/games?page=${page}`)
 *     return response.games
 *   },
 *   { pageSize: 20 }
 * )
 */
export function useInfiniteScroll<T>(
  fetchFn: (page: number) => Promise<T[]>,
  options: InfiniteScrollOptions = {}
) {
  const {
    pageSize = 20,
    initialPage = 0,
    threshold = 200
  } = options

  // Estado
  const items = ref<T[]>([]) as Ref<T[]>
  const loading = ref(false)
  const page = ref(initialPage)
  const hasMore = ref(true)
  const error = ref<Error | null>(null)

  // Referencia al elemento sentinel
  const sentinel = ref<HTMLElement | null>(null)

  /**
   * Carga la siguiente página de items
   */
  const loadMore = async () => {
    if (loading.value || !hasMore.value) return

    loading.value = true
    error.value = null

    try {
      const newItems = await fetchFn(page.value)

      // Si recibimos menos items que el pageSize, no hay más
      if (newItems.length < pageSize) {
        hasMore.value = false
      }

      // Añadimos los nuevos items
      items.value.push(...newItems)

      // Incrementamos la página
      page.value++
    } catch (err) {
      error.value = err as Error
      console.error('Error loading more items:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Reinicia el estado del infinite scroll
   */
  const reset = () => {
    items.value = []
    page.value = initialPage
    hasMore.value = true
    error.value = null
  }

  // Configurar Intersection Observer
  onMounted(() => {
    if (!sentinel.value) {
      console.warn('Sentinel element not found')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading.value && hasMore.value) {
          loadMore()
        }
      },
      {
        rootMargin: `${threshold}px`,
        threshold: 0.1
      }
    )

    observer.observe(sentinel.value)

    // Cargar la primera página
    loadMore()

    // Cleanup
    onUnmounted(() => {
      observer.disconnect()
    })
  })

  return {
    items: readonly(items),
    loading: readonly(loading),
    hasMore: readonly(hasMore),
    error: readonly(error),
    sentinel,
    loadMore,
    reset
  }
}

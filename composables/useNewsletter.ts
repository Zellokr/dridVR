import type { NewsletterFormData, NewsletterState, NewsletterResponse } from '~/types'

/**
 * Composable para manejar la suscripción al newsletter
 *
 * @example
 * ```ts
 * const { state, subscribe, isModalOpen, openModal, closeModal } = useNewsletter()
 *
 * await subscribe({ email: 'user@example.com', acceptsTerms: true })
 * ```
 */
export function useNewsletter() {
  // Estado de la suscripción
  const state = reactive<NewsletterState>({
    loading: false,
    success: null,
    error: null,
    isSubscribed: false
  })

  // Control del modal
  const isModalOpen = ref(false)

  /**
   * Abre el modal de newsletter
   */
  function openModal() {
    isModalOpen.value = true
    // Resetear mensajes al abrir
    state.success = null
    state.error = null
  }

  /**
   * Cierra el modal de newsletter
   */
  function closeModal() {
    isModalOpen.value = false
  }

  /**
   * Suscribe un usuario al newsletter
   *
   * @param formData - Datos del formulario
   * @returns Promise con el resultado de la suscripción
   */
  async function subscribe(formData: NewsletterFormData): Promise<boolean> {
    // Validación básica
    if (!formData.email) {
      state.error = 'El email es requerido'
      return false
    }

    if (!formData.acceptsTerms) {
      state.error = 'Debes aceptar los términos y condiciones'
      return false
    }

    state.loading = true
    state.error = null
    state.success = null

    try {
      // Llamada a la API
      const response = await $fetch<NewsletterResponse>('/api/contacts', {
        method: 'POST',
        body: {
          email: formData.email,
          name: formData.name || '',
          source: 'newsletter_modal'
        }
      })

      if (response.success) {
        state.success = response.message || '¡Suscripción exitosa! Revisa tu email.'
        state.isSubscribed = true

        // Cerrar modal después de 2 segundos
        setTimeout(() => {
          closeModal()
        }, 2000)

        return true
      } else {
        state.error = response.message || 'Error al suscribirse'
        return false
      }
    } catch (err) {
      console.error('Error en suscripción:', err)
      state.error = err instanceof Error
        ? err.message
        : 'Error al procesar la suscripción. Intenta nuevamente.'
      return false
    } finally {
      state.loading = false
    }
  }

  /**
   * Resetea el estado de suscripción
   */
  function resetState() {
    state.loading = false
    state.success = null
    state.error = null
    state.isSubscribed = false
  }

  // Persistir estado de suscripción
  const isSubscribedPersistent = useLocalStorage('newsletter-subscribed', false)

  watch(() => state.isSubscribed, (newValue) => {
    isSubscribedPersistent.value = newValue
  })

  // Cargar estado persistente al montar
  onMounted(() => {
    state.isSubscribed = isSubscribedPersistent.value
  })

  return {
    state,
    isModalOpen,
    subscribe,
    openModal,
    closeModal,
    resetState
  }
}

/**
 * Datos del formulario de newsletter
 */
export interface NewsletterFormData {
  /** Email del usuario */
  email: string

  /** Nombre opcional */
  name?: string

  /** Acepta términos y condiciones */
  acceptsTerms: boolean
}

/**
 * Estado de suscripción al newsletter
 */
export interface NewsletterState {
  /** Indica si está enviando */
  loading: boolean

  /** Mensaje de éxito */
  success: string | null

  /** Mensaje de error */
  error: string | null

  /** Indica si está suscrito */
  isSubscribed: boolean
}

/**
 * Respuesta de la API del newsletter
 */
export interface NewsletterResponse {
  /** Indica si fue exitoso */
  success: boolean

  /** Mensaje de respuesta */
  message: string

  /** Código de estado */
  statusCode: number
}

# 📋 Estrategia de Migración y Mejora - dridVR Project

## 🎯 Resumen Ejecutivo

Este documento detalla la auditoría completa del proyecto actual y propone una estrategia de migración hacia las últimas versiones de **Nuxt 3**, **Tailwind CSS 4** y **Nuxt UI**, siguiendo estrictamente las mejores prácticas y documentación oficial.

---

## 📊 1. AUDITORÍA INICIAL

### 1.1 Estado Tecnológico Actual

#### Stack Tecnológico Detectado:
```json
{
  "nuxt": "3.16",
  "vue": "latest",
  "tailwindcss": "^4.1.8",
  "shadcn-nuxt": "2.2.0",
  "radix-vue": "^1.9.10",
  "reka-ui": "^2.3.0"
}
```

#### Módulos Actuales:
- `nuxt-mdi` (iconos MDI)
- `nuxt-svgo` (componentes SVG)
- `shadcn-nuxt` (componentes UI estilo shadcn)
- `@nuxtjs/color-mode` (modo claro/oscuro)
- `@nuxtjs/device` (detección de dispositivo)
- `nuxt-gtag` (Google Analytics)
- `@nuxtjs/sitemap` (generación de sitemap)
- `vue3-carousel-nuxt` (carrusel)
- `@nuxt/image` (optimización de imágenes)

### 1.2 Problemas y Deuda Técnica Identificados

#### 🔴 Críticos:
1. **Mezcla de Sistemas UI**: Uso simultáneo de `shadcn-nuxt`, `radix-vue` y `reka-ui` → conflictos de estilos
2. **CSS Redundante**: Estilos de scrollbar personalizados en layout que no aprovechan Tailwind
3. **Tailwind 4**: Ya está en uso pero sin configuración optimizada según guías oficiales
4. **Componentes no optimizados**: Muchos componentes custom que podrían ser reemplazados por Nuxt UI

#### 🟡 Moderados:
1. **Estructura de carpetas**: Convenciones inconsistentes (Filters en components/ cuando podría ser composable)
2. **Nomenclatura**: Mezcla de PascalCase y kebab-case en nombres de carpetas
3. **Data JSON estático**: 5134 líneas de JSON que podrían estar en base de datos o CMS
4. **Componentes UI atomizados**: Demasiados componentes wrapper custom (Button, Card, Input, etc.)
5. **Cliente-only excesivo**: Algunos componentes podrían aprovechar SSR mejor
6. **Infinite Scroll manual**: Implementado desde cero sin librerías

#### 🟢 Menores:
1. **SEO bien implementado**: Uso correcto de `useHead` y metadatos
2. **Performance configurada**: Caché y SWR bien configurados
3. **Accesibilidad básica**: Presente pero mejorable (ARIA, roles)
4. **Lazy loading implementado**: Aunque manual

---

## 🎨 2. ANÁLISIS DEL SISTEMA VISUAL

### 2.1 Tokens de Diseño Detectados

#### Colores:
```typescript
// Extraídos del contexto actual
const colorTokens = {
  background: {
    primary: 'from-gray-900 via-gray-950 to-gray-900',
    elevated: '#1e1e1e',
    default: 'bg-gradient-to-r'
  },
  text: {
    primary: 'text-white',
    muted: 'text-white/70',
    highlighted: 'text-white'
  },
  scrollbar: {
    track: '#1e1e1e',
    thumb: 'linear-gradient(#4a4a4a, #2a2a2a)',
    thumbHover: 'linear-gradient(#6a6a6a, #3a3a3a)'
  }
}
```

#### Tipografía:
```typescript
const typography = {
  sizes: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  },
  weights: {
    light: 'font-light',
    normal: 'font-normal',
    bold: 'font-bold'
  }
}
```

#### Espaciado:
```typescript
const spacing = {
  gap: ['gap-x-4', 'gap-y-6', 'gap-y-8'],
  padding: ['py-8', 'p-4', 'sm:p-6', 'sm:px-6'],
  margin: ['mb-12']
}
```

#### Radios y Sombras:
```typescript
const borderRadius = {
  xl: 'rounded-xl',
  lg: 'rounded-lg',
  md: 'rounded-md',
  full: 'rounded-full'
}
```

### 2.2 Patrones Visuales

1. **Dark Theme predominante**: Fondo oscuro con gradientes
2. **Glassmorphism sutil**: No detectado aún pero recomendable
3. **Hover effects**: `hover:scale-105`, transiciones
4. **Microinteracciones**: `transition-transform duration-200`

---

## 🏗️ 3. NUEVA ARQUITECTURA PROPUESTA

### 3.1 Estructura de Carpetas Optimizada

```
dridvr/
├── app.vue                      # Root component
├── nuxt.config.ts               # Configuración Nuxt
├── app.config.ts                # ✨ NUEVO: Config de Nuxt UI
├── tailwind.config.ts           # Config Tailwind 4
├── package.json
├── tsconfig.json
│
├── assets/
│   ├── css/
│   │   └── main.css             # Tailwind + custom CSS
│   └── icons/                   # SVG icons
│
├── components/
│   ├── app/                     # ✨ NUEVO: Componentes App-level
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   └── AppNavbar.vue
│   │
│   ├── content/                 # ✨ NUEVO: Content components
│   │   ├── GameCard.vue
│   │   ├── GameGrid.vue
│   │   ├── GameFilters.vue
│   │   └── GameSearch.vue
│   │
│   ├── features/                # ✨ NUEVO: Feature components
│   │   ├── banner/
│   │   │   ├── BannerCarousel.vue
│   │   │   └── BannerSlide.vue
│   │   ├── newsletter/
│   │   │   ├── NewsletterModal.vue
│   │   │   └── NewsletterForm.vue
│   │   └── social-media/
│   │       └── SocialMediaLinks.vue
│   │
│   └── ui/                      # ⚠️ ELIMINAR custom UI, usar Nuxt UI
│
├── composables/
│   ├── useGameFilters.ts        # ✨ NUEVO: Lógica de filtros
│   ├── useInfiniteScroll.ts    # ✨ NUEVO: Infinite scroll composable
│   ├── useNewsletter.ts         # ✨ NUEVO: Newsletter logic
│   └── useSEO.ts                # ✨ NUEVO: SEO helpers
│
├── layouts/
│   ├── default.vue              # Layout principal
│   └── empty.vue                # Layout vacío para casos especiales
│
├── pages/
│   ├── index.vue                # Home
│   ├── games/
│   │   └── index.vue            # Listado de juegos
│   └── accessories/
│       └── index.vue            # Accesorios
│
├── server/
│   └── api/
│       └── contacts/
│           └── index.ts         # API endpoints
│
├── types/                       # ✨ NUEVO: Type definitions
│   ├── game.ts
│   ├── banner.ts
│   └── index.ts
│
├── utils/
│   ├── constants.ts             # ✨ NUEVO: Constantes centralizadas
│   └── helpers.ts
│
└── public/
    ├── img/
    └── robots.txt
```

### 3.2 Convenciones de Nomenclatura

| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Componentes | PascalCase | `GameCard.vue` |
| Composables | camelCase con `use` | `useGameFilters.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types | PascalCase | `Game.ts` |
| Carpetas | kebab-case | `social-media/` |
| API Routes | kebab-case | `api/game-data/` |

### 3.3 Separación de Concerns

```typescript
// ❌ ANTES: Todo mezclado en componente
<script setup>
const games = ref([])
const loading = ref(false)
const pageSize = 10
// ... lógica compleja aquí
</script>

// ✅ DESPUÉS: Separado en composable
// composables/useInfiniteScroll.ts
export function useInfiniteScroll<T>(
  items: Ref<T[]>,
  pageSize = 10
) {
  // ... lógica reutilizable
}

// components/content/GameGrid.vue
<script setup>
const { items, loading, loadMore } = useInfiniteScroll(games)
</script>
```

---

## 🎨 4. SISTEMA DE DISEÑO CON NUXT UI

### 4.1 Configuración de Tema (app.config.ts)

```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'purple',
      neutral: 'zinc'
    },

    // Modo oscuro por defecto
    colorMode: {
      preference: 'dark',
      fallback: 'dark'
    },

    // Tokens personalizados
    button: {
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'md'
      }
    },

    card: {
      defaultVariants: {
        variant: 'outline'
      },
      variants: {
        variant: {
          glass: {
            root: 'bg-black/20 backdrop-blur-lg border border-white/10'
          }
        }
      }
    }
  }
})
```

### 4.2 Tailwind Config para Nuxt UI

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],

  theme: {
    extend: {
      colors: {
        // Colores semánticos para el proyecto
        'vr-dark': '#0a0a0f',
        'vr-gray': '#1a1a24',
        'vr-blue': '#3b82f6',
        'vr-purple': '#8b5cf6'
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },

      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  }
} satisfies Config
```

### 4.3 CSS Base (assets/css/main.css)

```css
@import "tailwindcss";

@theme {
  /* Semantic color tokens */
  --color-background: #0a0a0f;
  --color-surface: #1a1a24;
  --color-surface-elevated: #2a2a3a;

  /* Custom scrollbar */
  --scrollbar-width: 12px;
  --scrollbar-track: theme('colors.vr-dark');
  --scrollbar-thumb: theme('colors.vr-gray');
}

/* Global styles */
html {
  @apply antialiased;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}

body {
  @apply bg-vr-dark text-white;
}

/* Custom scrollbar para Webkit */
::-webkit-scrollbar {
  width: var(--scrollbar-width);
}

::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
  border-radius: theme('borderRadius.md');
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(
    to bottom,
    theme('colors.gray.600'),
    theme('colors.gray.800')
  );
  border-radius: theme('borderRadius.md');
  border: 2px solid var(--scrollbar-track);

  &:hover {
    background: linear-gradient(
      to bottom,
      theme('colors.gray.500'),
      theme('colors.gray.700')
    );
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus visible styles */
:focus-visible {
  @apply outline-2 outline-offset-2 outline-blue-500;
}
```

---

## 🧩 5. MAPEO DE COMPONENTES

### 5.1 Tabla de Migración

| Componente Actual | Nuevo (Nuxt UI) | Props Clave | Notas |
|-------------------|-----------------|-------------|-------|
| `components/ui/button/Button.vue` | `UButton` | `color`, `variant`, `size`, `icon`, `loading` | Eliminar custom, usar Nuxt UI directamente |
| `components/ui/card/Card.vue` | `UCard` | `variant` | Soporte nativo para header/body/footer |
| `components/ui/input/Input.vue` | `UInput` | `color`, `variant`, `size`, `icon`, `placeholder` | Mejor validación integrada |
| `components/ui/dialog/*` | `UModal` | `modelValue`, `title`, `description` | API más simple |
| `components/Newsletter/Newsletter.vue` | `UModal` + `UForm` | Integración completa | Usar Form validation |
| `components/ui/carousel/*` | `UCarousel` | `items`, `autoplay`, `loop` | Componente nativo en Nuxt UI |
| `components/Navbar/Navbar.vue` | Custom (con `UButton`) | - | Mantener custom pero usar UButton para links |
| `components/Header/Header.vue` | `UHeader` | - | Usar componente oficial |
| `components/CustomCards/MediumCard/Card.vue` | `UCard` + custom slots | - | Wrapper sobre UCard |
| `components/Body/Banner/Banner.vue` | `UCarousel` | `items`, `autoplay` | Migrar a carousel nativo |
| `components/Filters/Filters.vue` | Custom con `UInput` + `USwitch` | - | Refactorizar a composable |
| `components/ScrollReveal/ScrollReveal.vue` | `@vueuse/motion` | - | Usar librería estándar |

### 5.2 Ejemplos de Migración

#### Ejemplo 1: Button

```vue
<!-- ❌ ANTES: Custom Button -->
<template>
  <Button>
    <slot />
  </Button>
</template>

<!-- ✅ DESPUÉS: Nuxt UI Button -->
<template>
  <UButton
    color="primary"
    variant="solid"
    size="md"
    :loading="isLoading"
    :icon="icon"
  >
    <slot />
  </UButton>
</template>
```

#### Ejemplo 2: Card de Juego

```vue
<!-- ❌ ANTES: Custom Card complejo -->
<script setup lang="ts">
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
// ... más imports
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ game.name }}</CardTitle>
    </CardHeader>
    <CardContent>
      <img :src="game.img_link" :alt="game.name" />
    </CardContent>
  </Card>
</template>

<!-- ✅ DESPUÉS: Nuxt UI Card -->
<script setup lang="ts">
interface Props {
  game: Game
}

const props = defineProps<Props>()
</script>

<template>
  <UCard variant="outline" class="hover:scale-105 transition-transform">
    <template #header>
      <h3 class="text-lg font-semibold line-clamp-2">
        {{ game.name }}
      </h3>
    </template>

    <NuxtImg
      :src="game.img_link"
      :alt="game.name"
      format="webp"
      loading="lazy"
      class="w-full aspect-video object-cover rounded-md"
    />

    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <UBadge v-if="game.crossbuy" color="success" variant="soft">
            Crossbuy
          </UBadge>
          <UBadge v-if="game.bhaptics" color="info" variant="soft">
            Haptics
          </UBadge>
        </div>

        <UButton
          :to="game.affiliate_link"
          target="_blank"
          color="primary"
          size="sm"
          trailing-icon="i-lucide-external-link"
        >
          Ver oferta
        </UButton>
      </div>
    </template>
  </UCard>
</template>
```

#### Ejemplo 3: Navbar

```vue
<!-- ❌ ANTES: Enlaces simples -->
<template>
  <nav class="flex items-center gap-x-4 font-light">
    <NuxtLink
      to="/"
      class="text-white text-2xl cursor-pointer"
      active-class="font-bold"
    >
      <span>Inicio</span>
    </NuxtLink>
    <NuxtLink to="/games" class="text-white text-2xl cursor-pointer" active-class="font-bold">
      <span>Juegos VR</span>
    </NuxtLink>
  </nav>
</template>

<!-- ✅ DESPUÉS: Con Nuxt UI -->
<script setup lang="ts">
const route = useRoute()

const links = [
  {
    label: 'Inicio',
    to: '/',
    icon: 'i-lucide-home'
  },
  {
    label: 'Juegos VR',
    to: '/games',
    icon: 'i-lucide-gamepad-2'
  },
  {
    label: 'Accesorios',
    to: '/accessories',
    icon: 'i-lucide-shopping-bag'
  }
]
</script>

<template>
  <nav class="flex items-center gap-2" role="navigation" aria-label="Navegación principal">
    <UButton
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      :active="route.path === link.to"
      color="neutral"
      variant="ghost"
      size="lg"
      :leading-icon="link.icon"
    >
      {{ link.label }}
    </UButton>
  </nav>
</template>
```

#### Ejemplo 4: Filtros con Composable

```typescript
// ❌ ANTES: Todo en componente
<script setup>
const searchTerm = ref('')
const hasVideo = ref(false)
const hasCrossbuy = ref(false)
const hasHaptic = ref(false)

const emit = defineEmits(['update:searchTerm', 'update:hasVideo', ...])

// ... lógica compleja
</script>

// ✅ DESPUÉS: Composable reutilizable
// composables/useGameFilters.ts
export interface GameFilters {
  search: string
  hasVideo: boolean
  hasCrossbuy: boolean
  hasHaptic: boolean
}

export function useGameFilters() {
  const filters = reactive<GameFilters>({
    search: '',
    hasVideo: false,
    hasCrossbuy: false,
    hasHaptic: false
  })

  const resetFilters = () => {
    filters.search = ''
    filters.hasVideo = false
    filters.hasCrossbuy = false
    filters.hasHaptic = false
  }

  const hasActiveFilters = computed(() => {
    return filters.hasVideo || filters.hasCrossbuy || filters.hasHaptic || filters.search.length >= 3
  })

  return {
    filters: readonly(filters),
    resetFilters,
    hasActiveFilters
  }
}

// components/features/GameFilters.vue
<script setup lang="ts">
const { filters, resetFilters, hasActiveFilters } = useGameFilters()

const emit = defineEmits<{
  'update:filters': [filters: GameFilters]
}>()

watch(filters, (newFilters) => {
  emit('update:filters', newFilters)
}, { deep: true })
</script>

<template>
  <div class="flex flex-col gap-4 p-4 bg-vr-gray rounded-lg">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Filtros</h2>
      <UButton
        v-if="hasActiveFilters"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-x"
        @click="resetFilters"
      >
        Limpiar
      </UButton>
    </div>

    <UInput
      v-model="filters.search"
      placeholder="Buscar juegos..."
      icon="i-lucide-search"
      size="md"
    />

    <div class="flex flex-col gap-2">
      <UCheckbox v-model="filters.hasVideo" label="Con video" />
      <UCheckbox v-model="filters.hasCrossbuy" label="Crossbuy" />
      <UCheckbox v-model="filters.hasHaptic" label="Soporte háptico" />
    </div>
  </div>
</template>
```

---

## ♿ 6. ACCESIBILIDAD (WCAG 2.1 AA)

### 6.1 Checklist de Implementación

#### Contraste de Color
- [ ] Ratio mínimo 4.5:1 para texto normal
- [ ] Ratio mínimo 3:1 para texto grande (18pt+)
- [ ] Usar herramienta: [Contrast Checker](https://webaim.org/resources/contrastchecker/)

#### Navegación por Teclado
```vue
<template>
  <!-- ✅ Todos los elementos interactivos accesibles por teclado -->
  <UButton
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    Acción
  </UButton>

  <!-- ✅ Skip links para navegación rápida -->
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
  >
    Saltar al contenido principal
  </a>
</template>
```

#### ARIA y Roles
```vue
<template>
  <!-- ✅ Roles semánticos -->
  <nav role="navigation" aria-label="Navegación principal">
    <!-- contenido -->
  </nav>

  <!-- ✅ Estados dinámicos -->
  <UButton
    :aria-pressed="isActive"
    :aria-label="isActive ? 'Desactivar filtro' : 'Activar filtro'"
  >
    Filtro
  </UButton>

  <!-- ✅ Live regions para cambios dinámicos -->
  <div role="status" aria-live="polite" aria-atomic="true">
    <p v-if="loading">Cargando más juegos...</p>
  </div>

  <!-- ✅ Descripciones -->
  <UInput
    id="search"
    aria-describedby="search-help"
    placeholder="Buscar..."
  />
  <p id="search-help" class="text-sm text-muted">
    Escribe al menos 3 caracteres para buscar
  </p>
</template>
```

#### Imágenes y Multimedia
```vue
<template>
  <!-- ✅ Alt text descriptivo -->
  <NuxtImg
    :src="game.img_link"
    :alt="`Portada del juego ${game.name} para Meta Quest`"
    loading="lazy"
  />

  <!-- ✅ Videos con controles accesibles -->
  <video controls aria-label="Video promocional del juego">
    <source src="..." type="video/mp4" />
    <track kind="captions" src="captions.vtt" srclang="es" label="Español" />
  </video>
</template>
```

#### Formularios
```vue
<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nombre muy corto')
})

const state = reactive({
  email: '',
  name: ''
})
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <!-- ✅ Labels asociados correctamente -->
    <UFormField name="email" label="Email" required>
      <UInput
        v-model="state.email"
        type="email"
        autocomplete="email"
        aria-required="true"
      />
    </UFormField>

    <UFormField name="name" label="Nombre" required>
      <UInput
        v-model="state.name"
        autocomplete="given-name"
        aria-required="true"
      />
    </UFormField>

    <UButton type="submit" loading-auto>
      Enviar
    </UButton>
  </UForm>
</template>
```

### 6.2 Preferencias de Usuario

```vue
<!-- composables/useAccessibility.ts -->
<script setup lang="ts">
export function useAccessibility() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const prefersColorScheme = useMediaQuery('(prefers-color-scheme: dark)')

  return {
    prefersReducedMotion,
    prefersColorScheme
  }
}

// Uso en componentes
<script setup lang="ts">
const { prefersReducedMotion } = useAccessibility()

const animationClass = computed(() =>
  prefersReducedMotion.value ? '' : 'animate-fade-in'
)
</script>

<template>
  <div :class="animationClass">
    <!-- contenido -->
  </div>
</template>
```

---

## ⚡ 7. PERFORMANCE Y OPTIMIZACIÓN

### 7.1 Estrategias de Carga

#### Lazy Loading de Componentes
```vue
<script setup lang="ts">
// ✅ Componentes pesados con lazy loading
const GameList = defineAsyncComponent(() =>
  import('~/components/content/GameGrid.vue')
)

const NewsletterModal = defineAsyncComponent(() =>
  import('~/components/features/newsletter/NewsletterModal.vue')
)
</script>
```

#### Optimización de Imágenes
```vue
<template>
  <!-- ✅ Nuxt Image con formatos modernos -->
  <NuxtImg
    :src="game.img_link"
    :alt="game.name"
    format="webp"
    quality="80"
    loading="lazy"
    :sizes="{
      xs: '100vw',
      sm: '50vw',
      md: '33vw',
      lg: '25vw'
    }"
    :modifiers="{
      fit: 'cover',
      ar: '16:9'
    }"
  />
</template>
```

#### Code Splitting Inteligente
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-ui': ['@nuxt/ui'],
            'vendor-utils': ['@vueuse/core', 'zod'],
            'vendor-icons': ['lucide-vue-next']
          }
        }
      }
    }
  }
})
```

### 7.2 Optimización de Datos

#### Infinite Scroll Optimizado
```typescript
// composables/useInfiniteScroll.ts
export function useInfiniteScroll<T>(
  fetchFn: (page: number) => Promise<T[]>,
  options: {
    pageSize?: number
    initialPage?: number
    threshold?: number
  } = {}
) {
  const {
    pageSize = 20,
    initialPage = 0,
    threshold = 200
  } = options

  const items = ref<T[]>([])
  const loading = ref(false)
  const page = ref(initialPage)
  const hasMore = ref(true)

  const sentinel = ref<HTMLElement | null>(null)

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return

    loading.value = true
    try {
      const newItems = await fetchFn(page.value)

      if (newItems.length < pageSize) {
        hasMore.value = false
      }

      items.value.push(...newItems)
      page.value++
    } finally {
      loading.value = false
    }
  }

  // Intersection Observer
  onMounted(() => {
    if (!sentinel.value) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: `${threshold}px` }
    )

    observer.observe(sentinel.value)

    onUnmounted(() => observer.disconnect())
  })

  return {
    items: readonly(items),
    loading: readonly(loading),
    hasMore: readonly(hasMore),
    sentinel,
    loadMore
  }
}
```

### 7.3 Caché y Estrategias de Fetching

```typescript
// composables/useGames.ts
export function useGames() {
  return useFetch('/api/games', {
    // ✅ Caché durante 5 minutos
    getCachedData: (key) => {
      const cached = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      if (!cached) return null

      const expiresAt = new Date(cached.fetchedAt)
      expiresAt.setTime(expiresAt.getTime() + 5 * 60 * 1000)

      if (expiresAt < new Date()) return null
      return cached
    },

    // ✅ Transform response
    transform: (data: RawGame[]): Game[] => {
      return data.map(game => ({
        ...game,
        imgLink: game.img_link,
        affiliateLink: game.affiliate_link,
        ytLink: game.yt_link
      }))
    },

    // ✅ Lazy para carga diferida
    lazy: true
  })
}
```

### 7.4 Configuración de Nuxt

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-01-26',

  // ✅ Optimizaciones experimentales
  experimental: {
    componentIslands: true,
    payloadExtraction: true,
    viewTransition: true
  },

  // ✅ Renderizado optimizado
  ssr: true,

  // ✅ Rutas con caché agresivo
  nitro: {
    compressPublicAssets: true,

    routeRules: {
      '/': {
        swr: 3600,  // 1 hora
        cache: {
          maxAge: 3600,
          staleMaxAge: 7200
        }
      },
      '/games': {
        swr: 1800,  // 30 minutos
        cache: { maxAge: 1800 }
      },
      '/accessories': {
        swr: 3600,
        cache: { maxAge: 3600 }
      },
      '/api/**': {
        cache: { maxAge: 300 }  // 5 minutos para API
      }
    }
  },

  // ✅ Módulos esenciales
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@vueuse/nuxt'
  ],

  // ✅ Configuración de UI
  ui: {
    // Auto-import de iconos
    icons: ['lucide']
  },

  // ✅ Image optimization
  image: {
    formats: ['webp', 'avif'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  }
})
```

---

## 📱 8. DISEÑO RESPONSIVE (MOBILE-FIRST)

### 8.1 Breakpoints

```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'sm': '640px',   // Tablets
      'md': '768px',   // Small laptops
      'lg': '1024px',  // Desktops
      'xl': '1280px',  // Large desktops
      '2xl': '1536px'  // Extra large
    }
  }
}
```

### 8.2 Patrones Responsive

#### Grid Adaptativo
```vue
<template>
  <!-- ✅ Grid que se adapta según viewport -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <GameCard v-for="game in games" :key="game.name" :game="game" />
  </div>
</template>
```

#### Navegación Responsive
```vue
<script setup lang="ts">
const isMenuOpen = ref(false)
const { isMobile } = useDevice()
</script>

<template>
  <header class="sticky top-0 z-50 bg-vr-dark/80 backdrop-blur-lg">
    <UContainer>
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2">
          <NuxtImg src="/img/logo.png" alt="DridVR" class="h-10 w-auto" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav v-if="!isMobile" class="hidden md:flex items-center gap-2">
          <UButton v-for="link in links" :key="link.to" :to="link.to" variant="ghost">
            {{ link.label }}
          </UButton>
        </nav>

        <!-- Mobile Menu Button -->
        <UButton
          v-if="isMobile"
          icon="i-lucide-menu"
          variant="ghost"
          @click="isMenuOpen = true"
          aria-label="Abrir menú"
          class="md:hidden"
        />
      </div>
    </UContainer>

    <!-- Mobile Slideover -->
    <USlideover v-model="isMenuOpen">
      <nav class="flex flex-col gap-2 p-4">
        <UButton
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          variant="ghost"
          block
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </UButton>
      </nav>
    </USlideover>
  </header>
</template>
```

#### Tipografía Fluida
```css
/* assets/css/main.css */
@layer base {
  h1 {
    @apply text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold;
  }

  h2 {
    @apply text-2xl sm:text-3xl md:text-4xl font-semibold;
  }

  h3 {
    @apply text-xl sm:text-2xl md:text-3xl font-medium;
  }

  p {
    @apply text-base sm:text-lg leading-relaxed;
  }
}
```

---

## 🧪 9. TESTING Y VALIDACIÓN

### 9.1 Herramientas Recomendadas

```json
// package.json
{
  "devDependencies": {
    "@nuxt/test-utils": "^3.16.0",
    "@vue/test-utils": "^2.4.6",
    "vitest": "^2.1.0",
    "playwright": "^1.48.0",
    "@axe-core/playwright": "^4.10.0"
  },
  "scripts": {
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test --grep @a11y"
  }
}
```

### 9.2 Tests de Accesibilidad

```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accesibilidad', () => {
  test('Home page cumple WCAG 2.1 AA', async ({ page }) => {
    await page.goto('/')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })

  test('Navegación por teclado funciona correctamente', async ({ page }) => {
    await page.goto('/')

    // Tab hasta el primer enlace
    await page.keyboard.press('Tab')

    // Verificar que tiene foco visible
    const focused = await page.evaluate(() => document.activeElement?.tagName)
    expect(focused).toBeTruthy()
  })
})
```

### 9.3 Performance Testing

```typescript
// tests/performance.spec.ts
import { test, expect } from '@playwright/test'

test('Lighthouse scores >= 90', async ({ page }) => {
  await page.goto('/')

  const lighthouse = await page.lighthouse({
    performance: 90,
    accessibility: 90,
    'best-practices': 90,
    seo: 90
  })

  expect(lighthouse.performance).toBeGreaterThanOrEqual(90)
  expect(lighthouse.accessibility).toBeGreaterThanOrEqual(90)
})
```

---

## 📚 10. DOCUMENTACIÓN Y GUÍAS

### 10.1 Guía de Desarrollo

```markdown
# 🛠️ Guía de Desarrollo - dridVR

## Configuración Inicial

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

## Principios de Código

### 1. Composición sobre Herencia
Usa composables en lugar de mixins o herencia de clases.

### 2. Tipado Estricto
Todo debe estar tipado con TypeScript.

```typescript
// ✅ BIEN
interface Game {
  name: string
  affiliateLink: string
  imgLink: string
}

// ❌ MAL
const game: any = { ... }
```

### 3. Componentes Pequeños y Enfocados
Cada componente debe tener una sola responsabilidad.

### 4. Props con Valores por Defecto
```typescript
interface Props {
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  size: 'md'
})
```

### 5. Emits Tipados
```typescript
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': [data: FormData]
}>()
```

## Estructura de Componentes

```vue
<script setup lang="ts">
// 1. Imports
import { ref, computed } from 'vue'

// 2. Types
interface Props {
  // ...
}

// 3. Props & Emits
const props = defineProps<Props>()
const emit = defineEmits<{ ... }>()

// 4. Composables
const { data } = useData()

// 5. Reactive State
const state = ref<string>('')

// 6. Computed
const computed = computed(() => { ... })

// 7. Methods
function handleClick() { ... }

// 8. Lifecycle
onMounted(() => { ... })
</script>

<template>
  <!-- Contenido -->
</template>

<style scoped>
/* Estilos si son necesarios */
</style>
```

## Naming Conventions

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes | PascalCase | `GameCard.vue` |
| Composables | camelCase con `use` | `useGameFilters.ts` |
| Types | PascalCase | `Game`, `FilterOptions` |
| Variables | camelCase | `isLoading`, `gameList` |
| Constantes | UPPER_SNAKE_CASE | `MAX_ITEMS` |
| Props | camelCase | `modelValue`, `maxLength` |
| Events | kebab-case | `update:model-value` |

## Git Workflow

### Commits Convencionales

```bash
feat: añadir filtros de búsqueda
fix: corregir scroll infinito
docs: actualizar README
style: formatear código
refactor: simplificar lógica de filtros
perf: optimizar carga de imágenes
test: añadir tests de accesibilidad
chore: actualizar dependencias
```

### Branching Strategy

- `main` - Producción
- `develop` - Desarrollo
- `feature/*` - Nuevas funcionalidades
- `fix/*` - Correcciones
- `refactor/*` - Refactorización
```

### 10.2 Component Documentation Template

```vue
<!--
  GameCard Component

  Muestra la información de un juego VR con su imagen, nombre y badges.

  @component
  @example
  <GameCard
    :game="{ name: 'Beat Saber', imgLink: '...', crossbuy: true }"
  />
-->

<script setup lang="ts">
import type { Game } from '~/types/game'

interface Props {
  /**
   * Objeto con los datos del juego
   */
  game: Game

  /**
   * Variante visual de la tarjeta
   * @default 'outline'
   */
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'

  /**
   * Mostrar badges de características
   * @default true
   */
  showBadges?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  showBadges: true
})

/**
 * Emitido cuando el usuario hace clic en el botón de acción
 * @event click
 */
const emit = defineEmits<{
  click: [game: Game]
}>()
</script>

<template>
  <!-- Template -->
</template>
```

---

## ✅ 11. PLAN DE IMPLEMENTACIÓN

### Fase 1: Preparación (Semana 1)
- [ ] Crear rama `feature/nuxt-ui-migration`
- [ ] Instalar Nuxt UI y dependencias
- [ ] Configurar `app.config.ts` con tema
- [ ] Actualizar `tailwind.config.ts`
- [ ] Crear estructura de carpetas nueva
- [ ] Migrar tipos a carpeta `/types`

### Fase 2: Sistema de Diseño (Semana 2)
- [ ] Definir tokens en `app.config.ts`
- [ ] Crear CSS base con variables
- [ ] Documentar sistema de colores
- [ ] Documentar tipografía
- [ ] Crear guía de componentes

### Fase 3: Migración de Componentes Core (Semanas 3-4)
- [ ] Migrar Header → UHeader
- [ ] Migrar Navbar → Custom con UButton
- [ ] Migrar Footer (si existe)
- [ ] Migrar Newsletter → UModal + UForm
- [ ] Migrar Filters → Custom con UInput/UCheckbox

### Fase 4: Componentes de Contenido (Semanas 5-6)
- [ ] Crear GameCard con UCard
- [ ] Crear GameGrid con infinite scroll
- [ ] Migrar Banner → UCarousel
- [ ] Crear composable useInfiniteScroll
- [ ] Crear composable useGameFilters

### Fase 5: Páginas y Layouts (Semana 7)
- [ ] Migrar layout default
- [ ] Migrar página index
- [ ] Migrar página games
- [ ] Migrar página accessories
- [ ] Optimizar rutas y caché

### Fase 6: Performance y Optimización (Semana 8)
- [ ] Implementar lazy loading
- [ ] Optimizar imágenes con Nuxt Image
- [ ] Configurar code splitting
- [ ] Mejorar caché de API
- [ ] Tests de performance

### Fase 7: Accesibilidad (Semana 9)
- [ ] Auditoría con Lighthouse
- [ ] Implementar ARIA labels
- [ ] Navegación por teclado
- [ ] Tests con axe-core
- [ ] Documentar accesibilidad

### Fase 8: Testing y QA (Semana 10)
- [ ] Tests unitarios componentes
- [ ] Tests E2E con Playwright
- [ ] Tests de accesibilidad
- [ ] Tests de performance
- [ ] Corrección de bugs

### Fase 9: Documentación (Semana 11)
- [ ] Documentar componentes
- [ ] Crear guía de desarrollo
- [ ] Actualizar README
- [ ] Crear CHANGELOG
- [ ] Documentar despliegue

### Fase 10: Despliegue (Semana 12)
- [ ] Review final de código
- [ ] Merge a develop
- [ ] Testing en staging
- [ ] Despliegue a producción
- [ ] Monitoreo post-despliegue

---

## 📊 12. MÉTRICAS DE ÉXITO

### KPIs Técnicos

| Métrica | Actual | Objetivo | Herramienta |
|---------|--------|----------|-------------|
| Lighthouse Performance | TBD | ≥ 90 | Lighthouse CI |
| Lighthouse Accessibility | TBD | ≥ 95 | Lighthouse CI |
| First Contentful Paint | TBD | < 1.5s | WebPageTest |
| Largest Contentful Paint | TBD | < 2.5s | WebPageTest |
| Total Blocking Time | TBD | < 300ms | WebPageTest |
| Cumulative Layout Shift | TBD | < 0.1 | WebPageTest |
| Bundle Size (JS) | TBD | < 200KB | Webpack Analyzer |
| WCAG Violations | TBD | 0 | axe-core |

### KPIs de Negocio

| Métrica | Objetivo |
|---------|----------|
| Tasa de conversión a afiliados | +15% |
| Tiempo en página | +20% |
| Tasa de rebote | -10% |
| Páginas por sesión | +25% |
| Suscripciones newsletter | +30% |

---

## 🔗 13. RECURSOS Y REFERENCIAS

### Documentación Oficial
- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Nuxt UI Docs](https://ui.nuxt.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

### Herramientas
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)

### Comunidad
- [Nuxt Discord](https://discord.com/invite/nuxt)
- [Vue.js Discord](https://discord.com/invite/vue)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nuxt)

---

## 📝 CONCLUSIONES

### Puntos Fuertes del Proyecto Actual
✅ SEO bien implementado
✅ Performance básica configurada
✅ Estructura de rutas clara
✅ Uso de TypeScript
✅ Imágenes optimizadas con Nuxt Image

### Áreas de Mejora Prioritarias
🔴 Consolidar en un solo sistema UI (Nuxt UI)
🔴 Mejorar accesibilidad
🔴 Refactorizar componentes custom
🔴 Implementar composables reutilizables
🔴 Optimizar rendimiento

### ROI Esperado
- **Tiempo de desarrollo**: -40% (componentes reutilizables)
- **Mantenibilidad**: +60% (código más limpio)
- **Performance**: +30% (optimizaciones)
- **Accesibilidad**: +80% (WCAG compliance)
- **UX**: +50% (UI consistente)

---

**Fecha de creación**: 26 de Octubre, 2025
**Última actualización**: 26 de Octubre, 2025
**Versión**: 1.0.0
**Autor**: GitHub Copilot - AI Assistant

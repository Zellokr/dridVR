# 💻 Guía de Desarrollo - dridVR

## 🎯 Principios Fundamentales

### 1. Composition Over Configuration
Prefiere la composición de funciones sobre configuración compleja.

```typescript
// ✅ BIEN: Composable reutilizable
export function useGameData() {
  const { data, loading } = useFetch('/api/games')
  const filtered = computed(() => filterGames(data.value))
  return { games: filtered, loading }
}

// ❌ MAL: Lógica acoplada en componente
<script setup>
const data = ref([])
const loading = ref(false)
// ... 50 líneas de lógica
</script>
```

### 2. Type Safety First
Todo debe estar tipado con TypeScript.

```typescript
// ✅ BIEN: Tipos estrictos
interface Game {
  name: string
  affiliateLink: string
  imgLink: string
  ytLink?: string
  crossbuy: boolean
  bhaptics: boolean
}

// ❌ MAL: Uso de any
const game: any = { ... }
```

### 3. Single Responsibility
Cada componente/función debe tener una única responsabilidad.

```vue
<!-- ✅ BIEN: Componente enfocado -->
<script setup lang="ts">
// GameCard.vue - Solo renderiza una tarjeta de juego
interface Props {
  game: Game
}
</script>

<!-- ❌ MAL: Componente que hace todo -->
<script setup>
// GamePage.vue - Fetching, filtrado, paginación, renderizado...
</script>
```

### 4. Mobile-First
Diseña primero para móvil, luego escala a desktop.

```vue
<template>
  <!-- ✅ BIEN: Mobile primero -->
  <div class="p-4 md:p-6 lg:p-8">
    <h1 class="text-2xl md:text-3xl lg:text-4xl">

  <!-- ❌ MAL: Desktop primero -->
  <div class="p-8 sm:p-6 mobile:p-4">
</template>
```

---

## 📁 Estructura de Archivos

### Naming Conventions

```
components/
├── app/
│   ├── AppHeader.vue          ✅ PascalCase
│   └── AppNavbar.vue
├── content/
│   ├── GameCard.vue
│   └── game-filters/          ✅ kebab-case carpetas
│       ├── GameFilters.vue
│       └── FilterCheckbox.vue

composables/
├── useGameFilters.ts          ✅ camelCase con "use"
├── useInfiniteScroll.ts
└── useAuth.ts

types/
├── Game.ts                     ✅ PascalCase
├── User.ts
└── index.ts

utils/
├── formatDate.ts              ✅ camelCase
├── calculatePrice.ts
└── constants.ts

pages/
├── index.vue                  ✅ kebab-case
├── games/
│   └── index.vue
└── accessories/
    └── index.vue
```

---

## 🧩 Estructura de Componentes

### Template Estándar

```vue
<script setup lang="ts">
// 1. IMPORTS
import { ref, computed, watch } from 'vue'
import type { Game } from '~/types/game'

// 2. TYPES & INTERFACES
interface Props {
  game: Game
  variant?: 'solid' | 'outline'
}

interface Emits {
  (event: 'click', game: Game): void
  (event: 'update:modelValue', value: string): void
}

// 3. PROPS & EMITS
const props = withDefaults(defineProps<Props>(), {
  variant: 'outline'
})

const emit = defineEmits<Emits>()

// 4. COMPOSABLES
const { user } = useAuth()
const { t } = useI18n()

// 5. REACTIVE STATE
const isHovered = ref(false)
const count = ref(0)

// 6. COMPUTED
const displayName = computed(() => {
  return props.game.name.toUpperCase()
})

// 7. METHODS
function handleClick() {
  emit('click', props.game)
}

// 8. WATCHERS
watch(() => props.game, (newGame) => {
  console.log('Game changed:', newGame)
})

// 9. LIFECYCLE
onMounted(() => {
  console.log('Component mounted')
})

// 10. EXPOSE (si es necesario)
defineExpose({
  handleClick
})
</script>

<template>
  <!-- TEMPLATE -->
</template>

<style scoped>
/* ESTILOS SCOPED SI SON NECESARIOS */
/* Preferir Tailwind CSS */
</style>
```

---

## 🎨 Guías de Estilo

### Tailwind CSS

```vue
<template>
  <!-- ✅ BIEN: Clases agrupadas lógicamente -->
  <div
    class="
      flex items-center justify-between gap-4
      p-4 rounded-lg
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      hover:shadow-lg transition-shadow
    "
  >

  <!-- ❌ MAL: Clases desordenadas -->
  <div class="flex p-4 border hover:shadow-lg bg-white rounded-lg gap-4 items-center">
</template>
```

### Orden de Clases Tailwind

1. Layout (display, position)
2. Box model (margin, padding, width, height)
3. Typography (font, text)
4. Visual (background, border, shadow)
5. Effects (opacity, transform, transition)
6. Interactive (hover, focus, active)
7. Responsive (breakpoints)

```css
/* Ejemplo */
.card {
  @apply
    /* Layout */
    flex flex-col
    /* Box Model */
    p-6 w-full max-w-sm
    /* Typography */
    text-base font-normal
    /* Visual */
    bg-white rounded-xl border border-gray-200
    /* Effects */
    shadow-sm transition-all
    /* Interactive */
    hover:shadow-xl hover:-translate-y-1
    /* Responsive */
    md:p-8 lg:max-w-md;
}
```

### Componentes Nuxt UI

```vue
<template>
  <!-- ✅ BIEN: Props específicos y descriptivos -->
  <UButton
    color="primary"
    variant="solid"
    size="md"
    leading-icon="i-lucide-play"
    :loading="isLoading"
    @click="handlePlay"
  >
    Reproducir
  </UButton>

  <!-- ❌ MAL: Uso excesivo de class para estilo -->
  <UButton
    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    @click="handlePlay"
  >
    Reproducir
  </UButton>
</template>
```

---

## ♿ Accesibilidad

### ARIA y Semántica

```vue
<template>
  <!-- ✅ BIEN: Semántico y accesible -->
  <nav role="navigation" aria-label="Navegación principal">
    <ul class="flex gap-4">
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          :aria-current="isActive(link.to) ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>

  <!-- ❌ MAL: No semántico -->
  <div class="nav">
    <div v-for="link in links" :key="link.to">
      <a :href="link.to">{{ link.label }}</a>
    </div>
  </div>
</template>
```

### Focus Management

```vue
<template>
  <!-- ✅ BIEN: Focus visible -->
  <button
    class="
      px-4 py-2 rounded-lg
      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
    "
  >
    Click me
  </button>

  <!-- ❌ MAL: Sin indicador de focus -->
  <button class="px-4 py-2 rounded-lg outline-none">
    Click me
  </button>
</template>
```

### Estados Dinámicos

```vue
<template>
  <!-- ✅ BIEN: Estados comunicados -->
  <div role="status" aria-live="polite" aria-atomic="true">
    <p v-if="loading">Cargando juegos...</p>
    <p v-else-if="error">Error al cargar</p>
    <p v-else>{{ games.length }} juegos cargados</p>
  </div>

  <!-- ❌ MAL: Sin comunicación de estado -->
  <div>
    <p v-if="loading">Cargando...</p>
  </div>
</template>
```

---

## 🚀 Performance

### Lazy Loading

```vue
<script setup lang="ts">
// ✅ BIEN: Componentes pesados lazy
const HeavyComponent = defineAsyncComponent(() =>
  import('~/components/HeavyComponent.vue')
)

// ✅ BIEN: Código async
const { data: games } = await useFetch('/api/games', {
  lazy: true
})
</script>

<template>
  <!-- ✅ BIEN: Imágenes lazy -->
  <NuxtImg
    :src="game.imgLink"
    loading="lazy"
    format="webp"
  />

  <!-- ✅ BIEN: Suspense para async -->
  <Suspense>
    <HeavyComponent />
    <template #fallback>
      <USkeleton class="h-48" />
    </template>
  </Suspense>
</template>
```

### Optimización de Re-renders

```vue
<script setup lang="ts">
// ✅ BIEN: Computed para valores derivados
const filteredGames = computed(() => {
  return games.value.filter(game => game.crossbuy)
})

// ❌ MAL: Filtrado en template
</script>

<template>
  <!-- ❌ MAL -->
  <div v-for="game in games.filter(g => g.crossbuy)">

  <!-- ✅ BIEN -->
  <div v-for="game in filteredGames">
</template>
```

### v-memo para Lists

```vue
<template>
  <!-- ✅ BIEN: Memo para items estáticos -->
  <div
    v-for="game in games"
    :key="game.name"
    v-memo="[game.name, game.crossbuy]"
  >
    <GameCard :game="game" />
  </div>
</template>
```

---

## 🧪 Testing

### Component Tests

```typescript
// GameCard.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import GameCard from '~/components/content/GameCard.vue'

describe('GameCard', () => {
  const mockGame = {
    name: 'Beat Saber',
    imgLink: '/img/game.jpg',
    affiliateLink: 'https://...',
    crossbuy: true,
    bhaptics: false
  }

  it('renders game name', () => {
    const wrapper = mount(GameCard, {
      props: { game: mockGame }
    })

    expect(wrapper.text()).toContain('Beat Saber')
  })

  it('shows crossbuy badge when enabled', () => {
    const wrapper = mount(GameCard, {
      props: { game: mockGame }
    })

    expect(wrapper.html()).toContain('Crossbuy')
  })

  it('emits click event', async () => {
    const wrapper = mount(GameCard, {
      props: { game: mockGame }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.[0]).toEqual([mockGame])
  })
})
```

### E2E Tests

```typescript
// games.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Games Page', () => {
  test('loads and displays games', async ({ page }) => {
    await page.goto('/games')

    // Esperar que cargue
    await page.waitForSelector('[data-testid="game-card"]')

    // Verificar que hay juegos
    const games = await page.locator('[data-testid="game-card"]').count()
    expect(games).toBeGreaterThan(0)
  })

  test('filters games by search', async ({ page }) => {
    await page.goto('/games')

    // Buscar
    await page.fill('input[placeholder*="Buscar"]', 'Beat Saber')

    // Verificar filtrado
    await expect(page.locator('text=Beat Saber')).toBeVisible()
  })
})
```

---

## 🔒 Seguridad

### XSS Prevention

```vue
<script setup lang="ts">
// ✅ BIEN: Sanitización de entrada
import DOMPurify from 'dompurify'

const sanitizedHtml = computed(() => {
  return DOMPurify.sanitize(userInput.value)
})
</script>

<template>
  <!-- ✅ BIEN: v-html con sanitización -->
  <div v-html="sanitizedHtml" />

  <!-- ❌ MAL: v-html sin sanitizar -->
  <div v-html="userInput" />
</template>
```

### API Keys

```typescript
// ✅ BIEN: Variables de entorno
const config = useRuntimeConfig()
const apiKey = config.public.apiKey

// ❌ MAL: Hardcoded
const apiKey = 'abc123...'
```

---

## 📝 Documentación

### JSDoc Comments

```typescript
/**
 * Filtra una lista de juegos según criterios especificados
 *
 * @param games - Array de juegos a filtrar
 * @param filters - Criterios de filtrado
 * @returns Array de juegos filtrados
 *
 * @example
 * ```ts
 * const filtered = filterGames(allGames, {
 *   search: 'Beat',
 *   crossbuy: true
 * })
 * ```
 */
export function filterGames(
  games: Game[],
  filters: GameFilters
): Game[] {
  // ...
}
```

### Component Documentation

```vue
<!--
  @component GameCard
  @description Tarjeta para mostrar información de un juego VR

  @prop {Game} game - Datos del juego
  @prop {string} variant - Variante visual ('solid' | 'outline')

  @event {Game} click - Emitido al hacer clic en el botón

  @example
  <GameCard
    :game="gameData"
    variant="outline"
    @click="handleClick"
  />
-->
```

---

## 🎯 Checklist Pre-Commit

Antes de hacer commit, verifica:

- [ ] ✅ Código funciona correctamente
- [ ] ✅ Sin errores de TypeScript
- [ ] ✅ Sin warnings de Lint
- [ ] ✅ Tests pasan
- [ ] ✅ Código documentado
- [ ] ✅ Accesibilidad verificada
- [ ] ✅ Performance optimizada
- [ ] ✅ Mobile responsive
- [ ] ✅ Nombres descriptivos
- [ ] ✅ Sin console.logs

---

## 🔄 Git Workflow

### Conventional Commits

```bash
# Features
git commit -m "feat: add game filters component"
git commit -m "feat(games): implement infinite scroll"

# Fixes
git commit -m "fix: resolve pagination bug"
git commit -m "fix(header): correct mobile menu overlay"

# Docs
git commit -m "docs: update README with setup instructions"

# Style
git commit -m "style: format code with prettier"

# Refactor
git commit -m "refactor: extract game logic to composable"

# Performance
git commit -m "perf: optimize image loading"

# Tests
git commit -m "test: add unit tests for GameCard"

# Chore
git commit -m "chore: update dependencies"
```

### Branch Naming

```bash
# Features
feature/game-filters
feature/infinite-scroll
feature/newsletter-modal

# Fixes
fix/pagination-bug
fix/mobile-menu
fix/image-loading

# Refactors
refactor/use-composables
refactor/simplify-filters
```

---

## 🏆 Mejores Prácticas Resumen

### ✅ DO

1. Usar Nuxt UI components
2. Escribir código TypeScript tipado
3. Crear composables reutilizables
4. Documentar componentes y funciones
5. Implementar accesibilidad
6. Optimizar performance
7. Escribir tests
8. Usar convenciones de naming
9. Mobile-first design
10. Commits convencionales

### ❌ DON'T

1. No usar `any` en TypeScript
2. No duplicar código
3. No ignorar accesibilidad
4. No hacer commits sin mensaje
5. No hardcodear valores
6. No usar `v-html` sin sanitizar
7. No mezclar responsabilidades
8. No ignorar warnings
9. No hacer componentes gigantes
10. No saltarse el testing

---

**Versión**: 1.0.0
**Última actualización**: 26 de Octubre, 2025

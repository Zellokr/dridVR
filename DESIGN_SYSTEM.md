# 🎨 Sistema de Diseño - dridVR

## 📐 Tokens de Diseño

### Colores

#### Paleta Base
```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      // Primarios
      primary: 'blue',      // #3b82f6
      secondary: 'purple',  // #8b5cf6

      // Estados
      success: 'green',     // #10b981
      warning: 'yellow',    // #f59e0b
      error: 'red',         // #ef4444
      info: 'cyan',         // #06b6d4

      // Neutrales
      neutral: 'zinc'       // Escala de grises
    }
  }
})
```

#### Colores Semánticos para VR
```css
:root {
  /* Backgrounds */
  --vr-dark: #0a0a0f;
  --vr-gray: #1a1a24;
  --vr-gray-light: #2a2a3a;

  /* Acentos VR */
  --vr-blue: #3b82f6;
  --vr-blue-light: #60a5fa;
  --vr-purple: #8b5cf6;
  --vr-purple-light: #a78bfa;

  /* Textos */
  --text-primary: rgba(255, 255, 255, 1);
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.5);
}
```

### Tipografía

#### Jerarquía de Texto
```css
/* Headings */
h1 { @apply text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight; }
h2 { @apply text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight; }
h3 { @apply text-2xl md:text-3xl lg:text-4xl font-semibold; }
h4 { @apply text-xl md:text-2xl lg:text-3xl font-medium; }
h5 { @apply text-lg md:text-xl lg:text-2xl font-medium; }
h6 { @apply text-base md:text-lg lg:text-xl font-medium; }

/* Body */
.text-body-lg { @apply text-lg leading-relaxed; }
.text-body { @apply text-base leading-normal; }
.text-body-sm { @apply text-sm leading-normal; }

/* Labels */
.text-label { @apply text-sm font-medium; }
.text-label-sm { @apply text-xs font-medium; }

/* Caption */
.text-caption { @apply text-xs text-muted; }
```

#### Font Stacks
```typescript
// tailwind.config.ts
export default {
  theme: {
    fontFamily: {
      sans: [
        'Inter',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'sans-serif'
      ],
      mono: [
        'JetBrains Mono',
        'Fira Code',
        'Consolas',
        'Monaco',
        'monospace'
      ]
    }
  }
}
```

### Espaciado

#### Sistema de Espaciado
```typescript
// Escala basada en 4px
const spacing = {
  '0': '0px',
  'px': '1px',
  '0.5': '2px',   // 0.5 * 4
  '1': '4px',     // 1 * 4
  '1.5': '6px',   // 1.5 * 4
  '2': '8px',     // 2 * 4
  '2.5': '10px',  // 2.5 * 4
  '3': '12px',    // 3 * 4
  '4': '16px',    // 4 * 4
  '5': '20px',    // 5 * 4
  '6': '24px',    // 6 * 4
  '8': '32px',    // 8 * 4
  '10': '40px',   // 10 * 4
  '12': '48px',   // 12 * 4
  '16': '64px',   // 16 * 4
  '20': '80px',   // 20 * 4
  '24': '96px'    // 24 * 4
}
```

#### Guías de Uso
```vue
<!-- Espaciado entre secciones principales -->
<section class="py-16 md:py-24">

  <!-- Espaciado entre elementos relacionados -->
  <div class="space-y-4">

    <!-- Espaciado entre elementos muy relacionados -->
    <div class="space-y-2">

      <!-- Espaciado mínimo para elementos compactos -->
      <div class="space-y-1">
```

### Bordes y Radios

#### Border Radius
```css
.rounded-none { border-radius: 0; }
.rounded-sm { border-radius: 0.125rem; }  /* 2px */
.rounded { border-radius: 0.25rem; }      /* 4px */
.rounded-md { border-radius: 0.375rem; }  /* 6px */
.rounded-lg { border-radius: 0.5rem; }    /* 8px */
.rounded-xl { border-radius: 0.75rem; }   /* 12px */
.rounded-2xl { border-radius: 1rem; }     /* 16px */
.rounded-3xl { border-radius: 1.5rem; }   /* 24px */
.rounded-full { border-radius: 9999px; }
```

#### Aplicación
```vue
<!-- Cards -->
<UCard class="rounded-xl">

<!-- Buttons -->
<UButton class="rounded-lg">

<!-- Images -->
<NuxtImg class="rounded-2xl">

<!-- Badges -->
<UBadge class="rounded-full">
```

### Sombras

#### Sistema de Elevación
```css
.shadow-xs {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.shadow-sm {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.shadow {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.shadow-md {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.shadow-lg {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.shadow-xl {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}
```

#### Sombras para Dark Mode
```css
/* Sombras más sutiles en dark mode */
.dark .shadow-sm {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3);
}

.dark .shadow-md {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3);
}
```

---

## 🎭 Componentes UI

### Botones

#### Variantes
```vue
<template>
  <!-- Solid (default) -->
  <UButton color="primary" variant="solid">
    Primario
  </UButton>

  <!-- Outline -->
  <UButton color="primary" variant="outline">
    Outline
  </UButton>

  <!-- Soft -->
  <UButton color="primary" variant="soft">
    Soft
  </UButton>

  <!-- Ghost -->
  <UButton color="primary" variant="ghost">
    Ghost
  </UButton>

  <!-- Link -->
  <UButton color="primary" variant="link">
    Link
  </UButton>
</template>
```

#### Tamaños
```vue
<template>
  <UButton size="xs">Extra Small</UButton>
  <UButton size="sm">Small</UButton>
  <UButton size="md">Medium</UButton>
  <UButton size="lg">Large</UButton>
  <UButton size="xl">Extra Large</UButton>
</template>
```

#### Con Iconos
```vue
<template>
  <!-- Leading -->
  <UButton leading-icon="i-lucide-play">
    Reproducir
  </UButton>

  <!-- Trailing -->
  <UButton trailing-icon="i-lucide-arrow-right">
    Siguiente
  </UButton>

  <!-- Solo icono -->
  <UButton icon="i-lucide-heart" square />
</template>
```

### Cards

#### Variantes de Card
```vue
<template>
  <!-- Outline (default) -->
  <UCard variant="outline">
    <template #header>
      <h3>Título</h3>
    </template>
    Contenido
  </UCard>

  <!-- Solid -->
  <UCard variant="solid">
    Contenido con fondo sólido
  </UCard>

  <!-- Soft -->
  <UCard variant="soft">
    Contenido con fondo suave
  </UCard>

  <!-- Subtle -->
  <UCard variant="subtle">
    Contenido con borde y fondo
  </UCard>
</template>
```

#### Card de Juego (Ejemplo Completo)
```vue
<script setup lang="ts">
interface Props {
  game: {
    name: string
    imgLink: string
    affiliateLink: string
    crossbuy: boolean
    bhaptics: boolean
    ytLink?: string
  }
}

const props = defineProps<Props>()
</script>

<template>
  <UCard
    variant="outline"
    class="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <!-- Imagen -->
    <div class="relative aspect-video overflow-hidden rounded-lg mb-4">
      <NuxtImg
        :src="game.imgLink"
        :alt="game.name"
        format="webp"
        quality="80"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <!-- Video badge si existe -->
      <UBadge
        v-if="game.ytLink"
        color="error"
        class="absolute top-2 right-2"
        icon="i-lucide-video"
      >
        Video
      </UBadge>
    </div>

    <!-- Título -->
    <h3 class="text-lg font-semibold line-clamp-2 mb-3 min-h-[3.5rem]">
      {{ game.name }}
    </h3>

    <!-- Footer con badges y botón -->
    <template #footer>
      <div class="flex items-center justify-between gap-2">
        <!-- Badges -->
        <div class="flex gap-2">
          <UBadge v-if="game.crossbuy" color="success" variant="soft" size="sm">
            Crossbuy
          </UBadge>
          <UBadge v-if="game.bhaptics" color="info" variant="soft" size="sm">
            Haptics
          </UBadge>
        </div>

        <!-- Botón -->
        <UButton
          :to="game.affiliateLink"
          target="_blank"
          color="primary"
          size="sm"
          trailing-icon="i-lucide-external-link"
        >
          Ver
        </UButton>
      </div>
    </template>
  </UCard>
</template>
```

### Inputs y Formularios

#### Input Básico
```vue
<template>
  <!-- Input simple -->
  <UInput
    v-model="value"
    placeholder="Buscar..."
  />

  <!-- Con icono -->
  <UInput
    v-model="search"
    icon="i-lucide-search"
    placeholder="Buscar juegos..."
  />

  <!-- Con loading -->
  <UInput
    v-model="search"
    :loading="isSearching"
    placeholder="Buscando..."
  />
</template>
```

#### Formulario Completo
```vue
<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  email: z.string().email('Email inválido'),
  message: z.string().min(10, 'Mensaje muy corto')
})

const state = reactive({
  name: '',
  email: '',
  message: ''
})

async function onSubmit() {
  console.log('Enviando:', state)
  // Lógica de envío
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4">
    <!-- Nombre -->
    <UFormField name="name" label="Nombre" required>
      <UInput
        v-model="state.name"
        placeholder="Tu nombre"
        autocomplete="name"
      />
    </UFormField>

    <!-- Email -->
    <UFormField name="email" label="Email" required>
      <UInput
        v-model="state.email"
        type="email"
        placeholder="tu@email.com"
        icon="i-lucide-at-sign"
        autocomplete="email"
      />
    </UFormField>

    <!-- Mensaje -->
    <UFormField name="message" label="Mensaje" required>
      <UTextarea
        v-model="state.message"
        placeholder="Tu mensaje..."
        rows="4"
      />
    </UFormField>

    <!-- Botón -->
    <UButton type="submit" loading-auto block>
      Enviar mensaje
    </UButton>
  </UForm>
</template>
```

### Modales y Overlays

#### Modal Básico
```vue
<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <UButton @click="isOpen = true">
    Abrir Modal
  </UButton>

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h3 class="text-xl font-semibold">Título del Modal</h3>
      </template>

      <p>Contenido del modal...</p>

      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="ghost" @click="isOpen = false">
            Cancelar
          </UButton>
          <UButton @click="isOpen = false">
            Confirmar
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
```

#### Slideover (Mobile Menu)
```vue
<script setup lang="ts">
const isOpen = ref(false)

const links = [
  { label: 'Inicio', to: '/', icon: 'i-lucide-home' },
  { label: 'Juegos', to: '/games', icon: 'i-lucide-gamepad-2' },
  { label: 'Accesorios', to: '/accessories', icon: 'i-lucide-shopping-bag' }
]
</script>

<template>
  <!-- Botón para abrir -->
  <UButton
    icon="i-lucide-menu"
    variant="ghost"
    @click="isOpen = true"
    aria-label="Abrir menú"
  />

  <!-- Slideover -->
  <USlideover v-model="isOpen" side="left">
    <div class="p-4 space-y-4">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold">Menú</h2>
        <UButton
          icon="i-lucide-x"
          variant="ghost"
          @click="isOpen = false"
          aria-label="Cerrar menú"
        />
      </div>

      <!-- Links -->
      <nav class="space-y-2">
        <UButton
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :leading-icon="link.icon"
          variant="ghost"
          block
          @click="isOpen = false"
        >
          {{ link.label }}
        </UButton>
      </nav>
    </div>
  </USlideover>
</template>
```

---

## 🎨 Patrones de Diseño

### Glassmorphism
```css
.glass {
  @apply bg-white/10 backdrop-blur-lg border border-white/20;
  @apply shadow-xl;
}

.glass-dark {
  @apply bg-black/20 backdrop-blur-lg border border-white/10;
  @apply shadow-2xl;
}
```

```vue
<template>
  <div class="glass rounded-2xl p-6">
    Contenido con efecto glass
  </div>
</template>
```

### Gradientes
```css
/* Gradientes de fondo */
.gradient-vr-blue {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
}

.gradient-vr-dark {
  background: linear-gradient(to bottom, #0a0a0f 0%, #1a1a24 100%);
}

.gradient-mesh {
  background:
    radial-gradient(at 40% 20%, hsla(228,100%,74%,0.3) 0px, transparent 50%),
    radial-gradient(at 80% 0%, hsla(189,100%,56%,0.3) 0px, transparent 50%),
    radial-gradient(at 0% 50%, hsla(355,100%,93%,0.3) 0px, transparent 50%),
    radial-gradient(at 80% 50%, hsla(340,100%,76%,0.3) 0px, transparent 50%),
    radial-gradient(at 0% 100%, hsla(22,100%,77%,0.3) 0px, transparent 50%),
    radial-gradient(at 80% 100%, hsla(242,100%,70%,0.3) 0px, transparent 50%);
}
```

### Animaciones
```css
/* Fade In */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-in-out;
}

/* Slide Up */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.4s ease-out;
}

/* Scale */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}
```

### Hover Effects
```css
/* Card Hover */
.card-hover {
  @apply transition-all duration-300;
  @apply hover:shadow-xl hover:-translate-y-1;
}

/* Button Hover */
.button-hover {
  @apply transition-all duration-200;
  @apply hover:scale-105 active:scale-95;
}

/* Image Hover */
.image-hover {
  @apply transition-transform duration-300;
  @apply group-hover:scale-110;
}
```

---

## 📱 Componentes Responsive

### Grid Responsivo
```vue
<template>
  <!-- Grid adaptativo para cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
    <GameCard v-for="game in games" :key="game.name" :game="game" />
  </div>
</template>
```

### Container Responsive
```vue
<template>
  <!-- Container con padding adaptativo -->
  <UContainer class="px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Contenido -->
    </div>
  </UContainer>
</template>
```

### Typography Responsive
```vue
<template>
  <!-- Títulos que escalan -->
  <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
    Título Principal
  </h1>

  <p class="text-base sm:text-lg md:text-xl leading-relaxed">
    Párrafo que se adapta al tamaño de pantalla
  </p>
</template>
```

---

## 🎯 Mejores Prácticas

### 1. Consistencia Visual
- Usar siempre componentes de Nuxt UI
- Respetar la paleta de colores definida
- Mantener espaciados consistentes
- Usar tamaños de fuente de la escala tipográfica

### 2. Performance
- Lazy load de imágenes
- Optimizar con Nuxt Image
- Usar transiciones sutiles (< 300ms)
- Evitar animaciones complejas en mobile

### 3. Accesibilidad
- Contraste mínimo de 4.5:1
- Focus visible en todos los interactivos
- ARIA labels cuando sea necesario
- Textos alternativos descriptivos

### 4. Responsividad
- Mobile-first approach
- Breakpoints consistentes
- Imágenes adaptativas
- Touch targets de 44x44px mínimo

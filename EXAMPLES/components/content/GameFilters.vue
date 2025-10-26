<!--
  GameFilters Component

  Panel de filtros para búsqueda de juegos

  @component
  @example
  <GameFilters @update:filters="handleFiltersUpdate" />
-->

<script setup lang="ts">
import type { GameFilters } from "~/types/game";

interface Props {
  /**
   * Valores iniciales de los filtros
   */
  initialFilters?: Partial<GameFilters>;

  /**
   * Mostrar contador de resultados
   * @default true
   */
  showResultCount?: boolean;

  /**
   * Número total de resultados
   */
  resultCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialFilters: () => ({}),
  showResultCount: true,
  resultCount: 0,
});

/**
 * Emitido cuando los filtros cambian
 */
const emit = defineEmits<{
  "update:filters": [filters: GameFilters];
}>();

const { filters, resetFilters, hasActiveFilters } = useGameFilters();

// Aplicar filtros iniciales
if (props.initialFilters) {
  Object.assign(filters, props.initialFilters);
}

// Emitir cambios de filtros
watch(
  filters,
  (newFilters) => {
    emit("update:filters", { ...newFilters });
  },
  { deep: true }
);

const handleReset = () => {
  resetFilters();
};
</script>

<template>
  <div class="bg-elevated rounded-xl p-6 space-y-4 border border-accented">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-filter" class="size-5 text-primary" />
        <h2 class="text-lg font-semibold">Filtros</h2>
      </div>

      <UButton
        v-if="hasActiveFilters"
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-lucide-x"
        @click="handleReset"
        aria-label="Limpiar filtros"
      >
        Limpiar
      </UButton>
    </div>

    <!-- Contador de resultados -->
    <div
      v-if="showResultCount"
      class="text-sm text-muted"
      role="status"
      aria-live="polite"
    >
      <span class="font-medium text-highlighted">{{ resultCount }}</span>
      {{ resultCount === 1 ? "juego encontrado" : "juegos encontrados" }}
    </div>

    <!-- Campo de búsqueda -->
    <div class="space-y-2">
      <UFormField label="Buscar juegos" help="Escribe al menos 3 caracteres">
        <UInput
          v-model="filters.search"
          icon="i-lucide-search"
          placeholder="Nombre del juego..."
          size="md"
          clearable
          aria-label="Buscar juegos por nombre"
        />
      </UFormField>
    </div>

    <!-- Separador -->
    <USeparator />

    <!-- Checkboxes de características -->
    <div class="space-y-3">
      <p class="text-sm font-medium text-muted">Características</p>

      <div class="space-y-2">
        <UCheckbox
          v-model="filters.hasVideo"
          label="Con video de gameplay"
          help="Juegos que tienen video disponible"
        >
          <template #icon>
            <UIcon name="i-lucide-video" class="size-4" />
          </template>
        </UCheckbox>

        <UCheckbox
          v-model="filters.hasCrossbuy"
          label="Crossbuy"
          help="Disponible en múltiples plataformas Meta"
        >
          <template #icon>
            <UIcon name="i-lucide-repeat" class="size-4" />
          </template>
        </UCheckbox>

        <UCheckbox
          v-model="filters.hasHaptic"
          label="Soporte háptico"
          help="Compatible con bHaptics"
        >
          <template #icon>
            <UIcon name="i-lucide-vibrate" class="size-4" />
          </template>
        </UCheckbox>
      </div>
    </div>

    <!-- Badge de filtros activos (Mobile) -->
    <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 md:hidden">
      <UBadge
        v-if="filters.search.length >= 3"
        color="primary"
        variant="soft"
        closable
        @close="filters.search = ''"
      >
        Búsqueda: {{ filters.search }}
      </UBadge>

      <UBadge
        v-if="filters.hasVideo"
        color="primary"
        variant="soft"
        closable
        @close="filters.hasVideo = false"
      >
        Con video
      </UBadge>

      <UBadge
        v-if="filters.hasCrossbuy"
        color="success"
        variant="soft"
        closable
        @close="filters.hasCrossbuy = false"
      >
        Crossbuy
      </UBadge>

      <UBadge
        v-if="filters.hasHaptic"
        color="info"
        variant="soft"
        closable
        @close="filters.hasHaptic = false"
      >
        Haptics
      </UBadge>
    </div>
  </div>
</template>

<!--
  GameGrid Component

  Grid responsivo con infinite scroll para mostrar juegos

  @component
  @example
  <GameGrid :games="gamesData" />
-->

<script setup lang="ts">
import type { Game } from "~/types/game";

interface Props {
  /**
   * Array de juegos a mostrar
   */
  games?: Game[];

  /**
   * Habilitar infinite scroll
   * @default false
   */
  infiniteScroll?: boolean;

  /**
   * Tamaño de página para infinite scroll
   * @default 20
   */
  pageSize?: number;

  /**
   * Estado de carga
   * @default false
   */
  loading?: boolean;

  /**
   * Mostrar estado vacío
   * @default true
   */
  showEmpty?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  games: () => [],
  infiniteScroll: false,
  pageSize: 20,
  loading: false,
  showEmpty: true,
});

/**
 * Emitido cuando se necesita cargar más juegos
 */
const emit = defineEmits<{
  "load-more": [];
  "game-click": [game: Game];
}>();

// Sentinel para infinite scroll
const sentinel = ref<HTMLElement | null>(null);

// Setup Intersection Observer para infinite scroll
onMounted(() => {
  if (!props.infiniteScroll || !sentinel.value) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !props.loading) {
        emit("load-more");
      }
    },
    { rootMargin: "200px" }
  );

  observer.observe(sentinel.value);

  onUnmounted(() => observer.disconnect());
});

const handleGameClick = (game: Game) => {
  emit("game-click", game);
};
</script>

<template>
  <div class="space-y-6">
    <!-- Grid de juegos -->
    <div
      v-if="games.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    >
      <GameCard
        v-for="game in games"
        :key="game.name"
        :game="game"
        @click="handleGameClick"
      />
    </div>

    <!-- Estado de carga -->
    <div
      v-if="loading"
      class="flex items-center justify-center py-8"
      role="status"
      aria-live="polite"
    >
      <div class="flex items-center gap-3 text-muted">
        <UIcon name="i-lucide-loader-circle" class="animate-spin size-5" />
        <span>Cargando más juegos...</span>
      </div>
    </div>

    <!-- Sentinel para infinite scroll -->
    <div v-if="infiniteScroll" ref="sentinel" class="h-10" aria-hidden="true" />

    <!-- Estado vacío -->
    <UEmpty
      v-if="showEmpty && games.length === 0 && !loading"
      icon="i-lucide-gamepad-2"
      title="No se encontraron juegos"
      description="Intenta ajustar tus filtros de búsqueda"
    >
      <template #actions>
        <UButton
          color="primary"
          variant="soft"
          icon="i-lucide-rotate-ccw"
          @click="$emit('load-more')"
        >
          Reintentar
        </UButton>
      </template>
    </UEmpty>
  </div>
</template>

<!--
  Página de Juegos Refactorizada

  Implementación completa con Nuxt UI, filtros y infinite scroll
-->

<script setup lang="ts">
import type { Game, GameFilters } from "~/types/game";
import gamesData from "~/constants/data.json";

// SEO
useHead({
  title: "Juegos VR para Meta Quest - Ofertas y Descuentos",
  meta: [
    {
      name: "description",
      content:
        "Descubre los mejores juegos de realidad virtual para Meta Quest con descuentos exclusivos. Filtra por características y encuentra tu próximo juego favorito.",
    },
    {
      property: "og:title",
      content: "Juegos VR para Meta Quest - Catálogo Completo",
    },
    {
      property: "og:description",
      content:
        "Explora nuestro catálogo completo de juegos VR con filtros avanzados y ofertas especiales.",
    },
  ],
});

// Estado
const allGames = gamesData as Game[];
const displayedGames = ref<Game[]>([]);
const currentFilters = ref<GameFilters>({
  search: "",
  hasVideo: false,
  hasCrossbuy: false,
  hasHaptic: false,
});

// Composables
const { filters, filterGames, countFilteredGames, hasActiveFilters } =
  useGameFilters();
const { isMobile } = useDevice();

// Infinite scroll setup
const pageSize = 20;
const currentPage = ref(0);
const isLoading = ref(false);
const hasMore = ref(true);

// Filtrar juegos
const filteredGames = computed(() => {
  return filterGames(allGames);
});

const resultCount = computed(() => {
  return filteredGames.value.length;
});

// Cargar más juegos
const loadMore = () => {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;

  setTimeout(() => {
    const start = currentPage.value * pageSize;
    const end = start + pageSize;
    const newGames = filteredGames.value.slice(start, end);

    if (newGames.length < pageSize) {
      hasMore.value = false;
    }

    displayedGames.value.push(...newGames);
    currentPage.value++;
    isLoading.value = false;
  }, 100);
};

// Reset cuando cambian los filtros
watch(
  filters,
  () => {
    displayedGames.value = [];
    currentPage.value = 0;
    hasMore.value = true;
    nextTick(() => loadMore());
  },
  { deep: true }
);

// Manejar actualización de filtros
const handleFiltersUpdate = (newFilters: GameFilters) => {
  Object.assign(filters, newFilters);
};

// Manejar clic en juego
const handleGameClick = (game: Game) => {
  // Tracking de analytics
  console.log("Game clicked:", game.name);
};

// Carga inicial
onMounted(() => {
  loadMore();
});

// Estado del panel de filtros en mobile
const isFiltersOpen = ref(false);
</script>

<template>
  <div class="min-h-screen">
    <!-- Header de página -->
    <UContainer class="py-8 md:py-12">
      <div class="space-y-4">
        <!-- Breadcrumb -->
        <UBreadcrumb
          :items="[
            { label: 'Inicio', to: '/', icon: 'i-lucide-home' },
            { label: 'Juegos VR', to: '/games', icon: 'i-lucide-gamepad-2' },
          ]"
        />

        <!-- Título y descripción -->
        <div>
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Juegos VR para Meta Quest
          </h1>
          <p class="text-lg text-muted max-w-3xl">
            Explora nuestro catálogo completo de juegos de realidad virtual con
            ofertas exclusivas. Usa los filtros para encontrar exactamente lo
            que buscas.
          </p>
        </div>

        <!-- Botón de filtros en mobile -->
        <div v-if="isMobile" class="flex items-center justify-between">
          <UButton
            icon="i-lucide-filter"
            color="primary"
            variant="outline"
            @click="isFiltersOpen = true"
          >
            Filtros
            <UBadge v-if="hasActiveFilters" color="primary" class="ml-2">
              {{ countFilteredGames(allGames) }}
            </UBadge>
          </UButton>

          <div class="text-sm text-muted">
            {{ resultCount }} {{ resultCount === 1 ? "juego" : "juegos" }}
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Layout con sidebar -->
    <UContainer class="pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar de filtros (Desktop) -->
        <aside v-if="!isMobile" class="lg:col-span-1">
          <div class="sticky top-4">
            <GameFilters
              :result-count="resultCount"
              @update:filters="handleFiltersUpdate"
            />
          </div>
        </aside>

        <!-- Grid de juegos -->
        <main class="lg:col-span-3">
          <GameGrid
            :games="displayedGames"
            :loading="isLoading"
            infinite-scroll
            @load-more="loadMore"
            @game-click="handleGameClick"
          />
        </main>
      </div>
    </UContainer>

    <!-- Slideover de filtros (Mobile) -->
    <USlideover v-model="isFiltersOpen" side="left">
      <div class="p-4">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold">Filtros</h2>
          <UButton
            icon="i-lucide-x"
            variant="ghost"
            @click="isFiltersOpen = false"
            aria-label="Cerrar filtros"
          />
        </div>

        <GameFilters
          :result-count="resultCount"
          @update:filters="handleFiltersUpdate"
        />

        <div class="mt-6">
          <UButton block @click="isFiltersOpen = false">
            Ver {{ resultCount }}
            {{ resultCount === 1 ? "resultado" : "resultados" }}
          </UButton>
        </div>
      </div>
    </USlideover>
  </div>
</template>

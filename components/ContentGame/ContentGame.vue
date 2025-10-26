<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import gamesData from "~/constants/data.json";
import type { SchemaGame } from "~/utils/types";
import GameList from "~/components/ContentGame/GameList/GameList.vue";

type AllGamesProps = {
  filterSearchTerms: string;
  filterVideo: boolean;
  filterCrossbuy: boolean;
  filterHaptic: boolean;
};

const props = defineProps<AllGamesProps>();

const games = ref<SchemaGame[]>([]);
const loading = ref(false);
const pageSize = 10;
let currentPage = 0;

const loadGames = () => {
  if (loading.value) return;
  loading.value = true;

  const start = currentPage * pageSize;
  const end = start + pageSize;
  const newGames = gamesData.slice(start, end).map((game: any) => ({
    ...game,
    crossbuy: Boolean(game.crossbuy),
    bhaptics: Boolean(game.bhaptics),
  }));

  setTimeout(() => {
    games.value.push(...newGames);
    currentPage++;
    loading.value = false;
  }, 100);
};

const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  const sentinel = document.getElementById("scroll-sentinel");
  if (sentinel) {
    observer.value = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !loading.value) {
          loadGames();
        }
      },
      { rootMargin: "100px" }
    );
    observer.value.observe(sentinel);
  }
  loadGames();
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});

const finalFilteredGames = computed(() => {
  let filtered = games.value;

  const isAnyFilterActive =
    props.filterVideo || props.filterCrossbuy || props.filterHaptic;

  if (!isAnyFilterActive && props.filterSearchTerms.trim() === "") {
    return filtered;
  }

  if (
    props.filterSearchTerms.trim() !== "" &&
    props.filterSearchTerms.length >= 4
  ) {
    return gamesData
      .filter((game: any) =>
        game.name!.toLowerCase().includes(props.filterSearchTerms.toLowerCase())
      )
      .map((game: any) => ({
        ...game,
        crossbuy: Boolean(game.crossbuy),
        bhaptics: Boolean(game.bhaptics),
      }));
  }

  const filteredData = gamesData.filter((game: any) => {
    const matchesVideo = !props.filterVideo || game.yt_link?.trim() !== "";
    const matchesCrossbuy = !props.filterCrossbuy || Boolean(game.crossbuy);
    const matchesHaptic = !props.filterHaptic || Boolean(game.bhaptics);

    return matchesVideo && matchesCrossbuy && matchesHaptic;
  });

  return filteredData.map((game: any) => ({
    ...game,
    crossbuy: Boolean(game.crossbuy),
    bhaptics: Boolean(game.bhaptics),
  }));
});
</script>

<template>
  <div class="min-h-[60vh]">
    <!-- Games Grid -->
    <GameList :game-records="finalFilteredGames" />

    <!-- Loading State -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
    >
      <div
        v-if="loading"
        class="flex items-center justify-center gap-3 py-8 text-gray-400"
      >
        <UIcon name="i-lucide-loader-2" class="w-6 h-6 animate-spin" />
        <span class="text-base font-medium">Cargando más juegos...</span>
      </div>
    </Transition>

    <!-- Empty State -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 scale-95"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="finalFilteredGames.length === 0 && !loading"
        class="flex flex-col items-center justify-center py-16 px-4"
      >
        <div
          class="flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 border-2 border-gray-700 mb-6"
        >
          <UIcon name="i-lucide-search-x" class="w-10 h-10 text-gray-500" />
        </div>
        <h3 class="text-xl sm:text-2xl font-bold text-white mb-2">
          No se encontraron juegos
        </h3>
        <p class="text-base text-gray-400 text-center max-w-md">
          Intenta ajustar tus filtros o búsqueda para encontrar más resultados
        </p>
      </div>
    </Transition>

    <!-- Scroll Sentinel for Infinite Loading -->
    <div id="scroll-sentinel" class="h-1"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import gamesData from "~/constants/data.json";
import type { SchemaGame } from "~/constants/types";
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
  const newGames = gamesData.slice(start, end);

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
      ([entry]) => {
        if (entry.isIntersecting && !loading.value) {
          loadGames();
        }
      },
      { rootMargin: "100px" },
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
    return gamesData.filter((game: SchemaGame) =>
      game.name!.toLowerCase().includes(props.filterSearchTerms.toLowerCase()),
    );
  }

  filtered = gamesData.filter((game: SchemaGame) => {
    const matchesVideo = !props.filterVideo || game.yt_link?.trim() !== "";
    const matchesCrossbuy = !props.filterCrossbuy || game.crossbuy;
    const matchesHaptic = !props.filterHaptic || game.bhaptics;

    return matchesVideo && matchesCrossbuy && matchesHaptic;
  });

  return filtered;
});
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <GameList :game-records="finalFilteredGames"></GameList>
    <div v-if="loading" class="text-center py-4 text-white">
      Cargando más juegos...
    </div>
    <div
      v-if="finalFilteredGames.length === 0 && loading === false"
      class="flex justify-center text-white font-bold text-xl"
    >
      No se ha encontrado el juego...
    </div>
    <div id="scroll-sentinel" class="h-1"></div>
  </div>
</template>

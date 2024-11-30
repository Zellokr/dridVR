<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import gamesData from "@/public/data.json";
import TitleContent from "~/components/TitleContent/TitleContent.vue";

type Game = {
  name?: string;
  affiliate_link: string;
  img_link: string;
  yt_link?: string;
  crossbuy?: boolean;
  bhaptics?: boolean;
};

const searchTerm = ref("");
const hasVideo = ref(false);
const hasCrossbuy = ref(false);
const hasHaptic = ref(false);

const games = ref<Game[]>([]);
const loading = ref(false);
const pageSize = 10; // Número de juegos a cargar por cada "paginación"
let currentPage = 0;

const loadGames = () => {
  if (loading.value) return; // Evitar cargas múltiples a la vez
  loading.value = true;

  // Cargar una sección de juegos desde el JSON
  const start = currentPage * pageSize;
  const end = start + pageSize;
  const newGames = gamesData.slice(start, end);

  // Simula un retardo para la carga de datos
  setTimeout(() => {
    games.value.push(...newGames); // Agregar los juegos cargados a la lista
    currentPage++; // Incrementar la página
    loading.value = false; // Dejar de cargar
  }, 1); // Ajusta el tiempo de espera según sea necesario
};

// Alternativa con Intersection Observer
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  const sentinel = document.getElementById("scroll-sentinel"); // Elemento al final de la lista
  if (sentinel) {
    observer.value = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading.value) {
          loadGames();
        }
      },
      { rootMargin: "100px" }, // Cargar antes de llegar al final
    );
    observer.value.observe(sentinel);
  }
  loadGames(); // Cargar los primeros juegos al iniciar la página
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect(); // Limpiar el observador
  }
});

const finalFilteredGames = computed(() => {
  // Comenzamos con todos los juegos
  let filtered = games.value;

  // Revisar si alguno de los filtros está activo
  const isAnyFilterActive =
    hasVideo.value || hasCrossbuy.value || hasHaptic.value;

  // Si no hay filtros activos, devolver todos los juegos
  if (!isAnyFilterActive && searchTerm.value.trim() === "") {
    return filtered;
  }

  // Aplicar el filtro de búsqueda, si está definido y tiene más de 4 caracteres
  if (searchTerm.value.trim() !== "" && searchTerm.value.length >= 4) {
    return gamesData.filter((game: Game) =>
      game.name!.toLowerCase().includes(searchTerm.value.toLowerCase()),
    );
  }

  // Acumular condiciones de filtros activados
  filtered = gamesData.filter((game: Game) => {
    const matchesVideo = !hasVideo.value || game.yt_link?.trim() !== "";
    const matchesCrossbuy = !hasCrossbuy.value || game.crossbuy;
    const matchesHaptic = !hasHaptic.value || game.bhaptics;

    // El juego debe cumplir todas las condiciones activas
    return matchesVideo && matchesCrossbuy && matchesHaptic;
  });

  return filtered;
});
</script>

<template>
  <div class="min-h-screen flex flex-col py-4">
    <TitleContent id="allgames" title="Todos los juegos" />
    <Filters
      v-model:searchTerm="searchTerm"
      v-model:hasVideo="hasVideo"
      v-model:hasCrossbuy="hasCrossbuy"
      v-model:hasHaptic="hasHaptic"
    />
    <CardGames :game-records="finalFilteredGames" :feature="false" />

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
    <!-- Elemento observado -->
  </div>
</template>

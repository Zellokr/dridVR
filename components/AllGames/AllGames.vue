<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import gamesData from '@/public/data.json';

type Game = {
  name?: string;
  affiliate_link: string;
  img_link: string;
  yt_link?: string;
  crossbuy?: boolean;
};

type AllGamesProps = {
  searchTerm: string
  hasVideo: boolean
  hasCrossbuy: boolean
}

const props = defineProps<AllGamesProps>()

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
  const sentinel = document.getElementById('scroll-sentinel'); // Elemento al final de la lista
  if (sentinel) {
    observer.value = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !loading.value) {
            loadGames();
          }
        },
        { rootMargin: '100px' } // Cargar antes de llegar al final
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
  let filtered = games.value;

  // Filtrar por búsqueda (searchTerm)
  if (props.searchTerm.trim() !== '' && props.searchTerm.length >= 4) {
    filtered = gamesData.filter((game: Game) =>
        game.name!.toLowerCase().includes(props.searchTerm.toLowerCase())
    );
  }

  // Filtrar por videos si hasVideo está activo
  if (props.hasVideo) {
    filtered = gamesData.filter((game: Game) => game.yt_link?.trim() !== '');
  }

  // Filtrar por crossbuy si hasCrossbuy está activo
  if (props.hasCrossbuy) {
    filtered = gamesData.filter((game: Game) => game.crossbuy === 1);
  }

  return filtered;
});
</script>

<template>
  <div class="min-h-screen ">

    <CardGames :game-records="finalFilteredGames" :feature="false"></CardGames>

    <div v-if="loading" class="text-center py-4 text-white">
      Cargando más juegos...
    </div>
    <div
        v-if="finalFilteredGames.length === 0 && loading === false"
        class="flex justify-center text-white font-bold text-xl"
    >
      No se ha encontrado el juego...
    </div>
    <div id="scroll-sentinel" class="h-1"></div> <!-- Elemento observado -->
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import gamesData from '@/public/data.json';

interface Game {
  name?: string
  affiliate_link: string
  img_link: string
  yt_url?: string
}

const games = ref<Game[]>([]);
const searchTerm = ref('');
const loading = ref(false);
const pageSize = 10;  // Número de juegos a cargar por cada "paginación"
let currentPage = 0;

const hasVideo = ref(false)

// Función para cargar juegos bajo demanda
const loadGames = () => {
  if (loading.value) return;  // Evitar cargas múltiples a la vez
  loading.value = true;

  // Cargar una sección de juegos desde el JSON
  const start = currentPage * pageSize;
  const end = start + pageSize;
  const newGames = gamesData.slice(start, end);

  // Simula un retardo para la carga de datos
  setTimeout(() => {
    games.value.push(...newGames);  // Agregar los juegos cargados a la lista
    currentPage++;  // Incrementar la página
    loading.value = false;  // Dejar de cargar
  }, 1);  // Ajusta el tiempo de espera según sea necesario
};

const filteredGames = computed(() => {
  // Si no hay término de búsqueda, muestra todos los juegos
  let filtered = gamesData;

  // Solo aplica el filtro si el término de búsqueda tiene al menos 4 caracteres
  if (searchTerm.value.trim() !== "") {
    if (searchTerm.value.length >= 4) {
      filtered = filtered.filter((game: Game) =>
          game.name!.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    }
  }
  return filtered;
});

const containVideo = computed(() => {
  if(hasVideo.value)
    return gamesData.filter((game: Game) => game.yt_url !== '')
  else
    return games.value;

})

// Detectar cuando el usuario hace scroll hasta el final de la página
const onScroll = () => {
  const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
  if (bottom && !loading.value) {
    loadGames();  // Cargar más juegos
  }
};

const openVideoLink = (ytUrl: string) => {
  // Abrir el enlace de YouTube en una nueva ventana
  window.open(ytUrl, '_blank');
}


onMounted(() => {
  loadGames();  // Cargar los primeros juegos al iniciar la página
  window.addEventListener('scroll', onScroll);  // Detectar el evento de scroll
});
</script>

<template>
  <div class="min-h-screen">
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-white text-5xl font-bold py-8 mb-2">Todos los juegos</h1>
      <div class="mb-8 w-full max-w-4xl px-4 md:px-12 lg:px-16">
        <div class="flex items-center justify-between ">
          <input
              v-model="searchTerm"
              type="text"
              placeholder="Filtrar..."
              class="bg-gray-700 text-white p-2 rounded-lg w-full mr-4"
          />
          <div class="flex items-center">
            <div class="flex ml-6">
              <label for="filterSwitch" class="text-white mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  class="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
              >
                <path
                    d="M22.54 6.42a2.42 2.42 0 00-2.38-2.42H3.84A2.42 2.42 0 001.46 6.42v11.16a2.42 2.42 0 002.38 2.42h16.32a2.42 2.42 0 002.38-2.42zM9.5 16.57V7.43L16 12z"
                />
              </svg></label>
              <input
                  id="filterSwitch"
                  type="checkbox"
                  v-model="hasVideo"
                  class="toggle-checkbox hidden "
              />
            </div>
            <div
                class="toggle-label w-12 h-6 rounded-full relative cursor-pointer transition-colors"
                :class="hasVideo ? 'bg-blue-500' : 'bg-gray-300'"
                @click="hasVideo = !hasVideo"
            >
              <div
                  class="dot w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-transform"
                  :class="hasVideo ? 'transform translate-x-6' : ''"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center gap-x-8 flex-wrap gap-y-4 pb-8">
      <transition-group name="fade" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-8">
        <div
            v-for="(game, index) in hasVideo ? containVideo : filteredGames"
            :key="game.affiliate_link"
        >
          <div class="block cursor-pointer">
            <a
                :href="game.affiliate_link"
                target="_blank"
                rel="noopener noreferrer"
                class="block"
            >
              <div class="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden max-w-xs transform transition-transform duration-300 hover:-translate-y-2">
                <!-- Imagen -->
                <div class="relative">
                  <img :src="game.img_link" alt="Game Image" class="w-full h-48 object-cover" />
                  <div
                      v-if="game.yt_url"
                      class="absolute top-2 right-2 bg-red-600 rounded-full p-2 cursor-pointer transform transition-transform duration-300 hover:scale-110"
                      @click.stop.prevent="openVideoLink(game.yt_url)"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                    >
                      <path
                          d="M22.54 6.42a2.42 2.42 0 00-2.38-2.42H3.84A2.42 2.42 0 001.46 6.42v11.16a2.42 2.42 0 002.38 2.42h16.32a2.42 2.42 0 002.38-2.42zM9.5 16.57V7.43L16 12z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="p-4 h-20">
                  <h3 class="text-lg font-semibold mb-2 text-white ">
                    {{ game.name || "Nombre del Juego" }}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </transition-group>
    </div>
    <div v-if="loading" class="text-center py-4 text-white">Cargando más juegos...</div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>
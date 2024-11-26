<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import gamesData from '@/public/features.json';

interface Game {
  name?: string
  affiliate_link: string
  img_link: string
  yt_url?: string
}

const games = ref<Game[]>(gamesData);
const hasVideo = ref(false)

const containVideo = computed(() => {
  if(hasVideo.value)
    return gamesData.filter((game: Game) => game.yt_url !== '')
  else
    return games.value;

})

const openVideoLink = (ytUrl: string) => {
  // Abrir el enlace de YouTube en una nueva ventana
  window.open(ytUrl, '_blank');
}

</script>

<template>
  <div class="h-full">
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-white text-5xl font-bold py-8 mb-2">Destacados</h1>
    </div>

    <div class="flex justify-center items-center gap-x-8 flex-wrap gap-y-4 pb-8">
      <transition-group name="fade" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 pb-8">
        <div
            v-for="(game, index) in containVideo"
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
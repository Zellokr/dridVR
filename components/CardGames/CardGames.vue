<script setup lang="ts">

type Game = {
  name?: string
  affiliate_link: string
  img_link: string
  yt_link?: string
  crossbuy?: boolean
}

type CardGamesProps = {
  gameRecords: Game[]
}

defineProps<CardGamesProps>()

const openVideoLink = (ytUrl: string) => {
  window.open(ytUrl, '_blank');
}

</script>

<template>
  <div class="flex justify-center items-center flex-wrap gap-y-2">
    <transition-group name="fade" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-2">
      <div
          v-for="(game, index) in gameRecords"
          :key="index"
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
                    v-if="game.yt_link"
                    class="absolute top-2 right-2 bg-red-600 rounded-full p-2 cursor-pointer transform transition-transform duration-300 hover:scale-110"
                    @click.stop.prevent="openVideoLink(game.yt_link)"
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
              <div class="p-4 h-20 flex justify-between items-center bg-gray-800 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold text-white truncate">
                  {{ game.name || "Nombre del Juego" }}
                </h3>
                <div v-if="game.crossbuy === 1" class="flex items-center gap-x-2 text-white px-2 py-1 rounded-lg shadow-sm">
                  <MdiIcon icon="mdiSync" class="text-white w-4 h-4" />
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </transition-group>
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
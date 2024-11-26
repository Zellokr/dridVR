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

</script>

<template>
  <div class="h-full">
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-white text-5xl font-bold py-8 mb-2">Destacados</h1>
    </div>
    <CardGames :game-records="containVideo" />
  </div>
</template>

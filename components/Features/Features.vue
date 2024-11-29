<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import featureGames from '@/public/features.json';

interface Game {
  name?: string
  affiliate_link: string
  img_link: string
  yt_url?: string
}

const games = ref<Game[]>(featureGames);

</script>

<template>
  <div class="h-full">

    <div class="flex flex-col justify-center items-center">
      <h1 class="text-white text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold py-8 mb-2">Novedades</h1>
    </div>
    <CardGames :game-records="games" feature />
  </div>
</template>

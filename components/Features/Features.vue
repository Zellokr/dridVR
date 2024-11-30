<script setup lang="ts">
import { ref } from "vue";
import featureGames from "@/public/features.json";

interface Game {
  name?: string;
  affiliate_link: string;
  img_link: string;
  yt_url?: string;
}

const games = ref<Game[]>(featureGames);
</script>

<template>
  <div class="h-full">
    <TitleContent title="Novedades" />
    <CardGames :game-records="games" feature />
  </div>
</template>

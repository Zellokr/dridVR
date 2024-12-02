<script setup lang="ts">
import featureGames from "@/public/features.json";
</script>

<template>
  <div class="py-4">
    <TitleContent title="Novedades" class="flex flex-col gap-y-2" />
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4"
    >
      <div v-for="game in featureGames" :key="game.id">
        <Card :game="game" />
      </div>
    </div>
  </div>
</template>

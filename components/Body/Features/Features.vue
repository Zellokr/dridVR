<script setup lang="ts">
import featureGames from "~/constants/features.json";
import Card from "~/components/CustomCards/MediumCard/Card.vue";
</script>

<template>
  <TitleContent title="Últimas Novedades" class="flex flex-col gap-y-2">
    <template #subtitle>
      Los últimos lanzamientos para tu visor Meta Quest
    </template>
  </TitleContent>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4"
  >
    <div v-for="game in featureGames" :key="game.id">
      <Card :game="game" class="bg-gray-700" />
    </div>
  </div>
</template>

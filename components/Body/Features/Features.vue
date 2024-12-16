<script setup lang="ts">
import Card, { GameSchema } from "~/components/CustomCards/MediumCard/Card.vue";

type FeaturesProps = {
  dataList: GameSchema[];
  title: string;
  subtitle: string;
};

defineProps<FeaturesProps>();
</script>

<template>
  <TitleContent :title="title" class="flex flex-col gap-y-2">
    <template #subtitle>
      {{ subtitle }}
    </template>
  </TitleContent>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4"
  >
    <div v-for="game in dataList" :key="game.name">
      <Card :game="game" class="bg-gray-700" />
    </div>
  </div>
</template>

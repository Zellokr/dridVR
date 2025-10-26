<script setup lang="ts">
import Card from "~/components/CustomCards/MediumCard/Card.vue";
import type { SchemaGame } from "~/utils/types";

type FeaturesProps = {
  dataList: SchemaGame[];
};

defineProps<FeaturesProps>();
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
  >
    <ScrollReveal
      v-for="(game, index) in dataList"
      :key="game.name"
      :delay="index * 50"
    >
      <Card :game="game" class="h-full" />
    </ScrollReveal>
  </div>
</template>

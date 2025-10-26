<script setup lang="ts">
import type { SchemaGame } from "~/utils/types";
import Card from "~/components/CustomCards/MediumCard/Card.vue";

type CardListProps = {
  gameRecords: SchemaGame[];
};

defineProps<CardListProps>();
</script>

<template>
  <TransitionGroup
    name="game-grid"
    tag="div"
    class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
  >
    <div v-for="game in gameRecords" :key="game.name" class="w-full">
      <Card :game="game" class="h-full" />
    </div>
  </TransitionGroup>
</template>

<style scoped>
/* Grid animation for staggered entrance */
.game-grid-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.game-grid-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
  position: absolute;
}

.game-grid-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

.game-grid-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}

/* Stagger effect for grid items */
.game-grid-move {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>

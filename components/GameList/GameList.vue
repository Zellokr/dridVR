<script setup lang="ts">
type Game = {
  name?: string;
  affiliate_link: string;
  img_link: string;
  yt_link?: string;
  crossbuy?: boolean;
  bhaptics?: boolean;
};

type CardListProps = {
  gameRecords: Game[];
};

defineProps<CardListProps>();
</script>

<template>
  <transition-group
    name="fade"
    tag="div"
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 pb-4 px-6 md:px-0"
  >
    <div v-for="(game, index) in gameRecords" :key="game.name">
      <Card :game="game" />
    </div>
  </transition-group>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

<script setup lang="ts">
import VisorCard from "~/components/CustomCards/VisorCard/Card.vue";

export type Visor = {
  name: string;
  affiliate_link: string;
  img_link: string;
};

defineProps<{
  visors: Visor[];
}>();
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
  >
    <div v-for="(visor, index) in visors" :key="index">
      <VisorCard :visor="visor" class="h-full" />
    </div>
  </div>
</template>

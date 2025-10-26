<script setup lang="ts">
import AccessoryCard from "~/components/CustomCards/AccessoryCard/Card.vue";

import type { Accessory } from "~/constants/accessories";

type ContentProps = {
  accessories?: Accessory[];
};

defineProps<ContentProps>();
</script>

<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5"
  >
    <div v-for="(accessory, index) in accessories" :key="index" class="w-full">
      <AccessoryCard :content="accessory" class="h-full" />
    </div>
  </div>
</template>

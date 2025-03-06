<script setup lang="ts">
import CardAccesory from "~/components/CustomCards/SmallCard/Card.vue";
import type { Accessory } from "~/constants/accessories";

type ContentProps = {
  accessories: Accessory[];
};

defineProps<ContentProps>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="(accessory, index) in accessories" :key="index">
      <CardAccesory :content="accessory" />
    </div>
  </div>
</template>

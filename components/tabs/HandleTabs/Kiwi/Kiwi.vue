<script setup lang="ts">
import accesories from "~/constants/accesories.json";
import CardAccesory from "~/components/CustomCards/SmallCard/Card.vue";

const kiwiAccesories = computed(() =>
  accesories.filter((item) => item.brand === "Kiwi design"),
);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="accesory in kiwiAccesories" :key="accesory.id">
      <CardAccesory :content="accesory" />
    </div>
  </div>
</template>

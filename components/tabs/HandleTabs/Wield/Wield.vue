<script setup lang="ts">
import accesories from "~/constants/accesories.json";
import CardAccesory from "~/components/CustomCards/SmallCard/Card.vue";

const wieldAccesories = computed(() =>
  accesories.filter((item) => item.brand === "WieldVR"),
);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
    <div v-for="accesory in wieldAccesories" :key="accesory.id">
      <CardAccesory :content="accesory" />
    </div>
  </div>
</template>

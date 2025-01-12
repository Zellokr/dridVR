<script setup lang="ts">
import accesories from "~/constants/accesories.json";
import CardAccesory from "~/components/CustomCards/SmallCard/Card.vue";
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="accesory in accesories" :key="accesory.id">
      <CardAccesory :content="accesory" />
    </div>
  </div>
</template>

<style scoped></style>

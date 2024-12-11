<script setup lang="ts">
import CardAccesory from "~/components/CustomCards/SmallCard/Card.vue";
import accesories from "~/constants/accesories.json";
</script>

<template>
  <div class="flex">
    <TitleContent
      title="Los mejores accesorios para tus Meta Quest"
      class="flex flex-col gap-y-2"
    >
    </TitleContent>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer"
  >
    <div v-for="accesory in accesories" :key="accesory.id">
      <CardAccesory :content="accesory" />
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import CardAccesory from "~/components/CustomCards/SmallCard/Card.vue";
import accesories from "~/constants/accesories.json";

type AccessoriesProps = {
  title?: string;
  subtitle?: string;
};

defineProps<AccessoriesProps>();
</script>

<template>
  <div class="flex justify-start">
    <TitleContent :title="title!">
      <template v-if="subtitle" #subtitle>
        {{ subtitle }}
      </template>
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

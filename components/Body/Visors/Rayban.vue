<script setup lang="ts">
import Card from "~/components/CustomCards/MediumCard/Card.vue";

export type Visor = {
  name: string;
  affiliate_link: string;
  img_link: string;
}

defineProps<{
  visors: Visor[];
  title: string;
  subtitle?: string;
}>()

</script>

<template>
  <div class="relative">
    <TitleContent
      :title="title"
      class="flex flex-col gap-y-2"
    >
      <template #subtitle>
        <p>
          Gafas inteligentes con IA incorporada
        </p>
      </template>
    </TitleContent>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="(visor, index) in visors" :key="index" class="rounded-lg">
        <Card :game="visor" class="bg-gray-700" size-image="96" />
      </div>
    </div>
  </div>
</template>

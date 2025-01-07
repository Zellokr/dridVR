<script setup lang="ts">
import visors from "~/constants/visors.json";
import Card from "~/components/CustomCards/MediumCard/Card.vue";
</script>

<template>
  <div class="relative">
    <TitleContent
      title="Los mejores visores del mercado"
      class="flex flex-col gap-y-2"
    >
      <template #subtitle>
        <p>
          Con la compra de cualquier visor... ¡Obtienes
          <span class="text-yellow-400">30€</span> para gastar en la tienda de
          Meta!
        </p>
      </template>
    </TitleContent>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      <div v-for="visor in visors" :key="visor.id" class="rounded-lg">
        <Card :game="visor" class="bg-gray-700" />
      </div>
    </div>
  </div>
</template>

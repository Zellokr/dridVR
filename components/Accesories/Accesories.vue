<script setup lang="ts">
import accesories from "~/constants/accesories.json";
</script>

<template>
  <div class="py-4">
    <TitleContent title="Accesorios" class="flex flex-col gap-y-2">
      <template #subtitle>
        Con la compra de cualquier visor... ¡Obtienes
        <span class="text-yellow-400">60€</span> para gastar en la tienda de
        Meta!
      </template>
    </TitleContent>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="accesorie in accesories" :key="accesorie.id">
        <Card :game="accesorie" />
      </div>
    </div>
  </div>
</template>

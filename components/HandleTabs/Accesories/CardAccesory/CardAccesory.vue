<script setup lang="ts">
type Accesory = {
  name: string;
  affiliate_link: string;
  img_link: string;
};

type CardAccesoryProps = {
  accesory: Accesory;
};

defineProps<CardAccesoryProps>();
</script>

<template>
  <div
    class="grid grid-cols-12 items-center gap-4 p-4 hover:bg-gray-600 rounded-lg transition-colors"
    role="group"
    :aria-label="`Accesorio: ${accesory.name}`"
  >
    <!-- Imagen del accesorio -->
    <div class="col-span-4 sm:col-span-3">
      <img
        :src="accesory.img_link"
        :alt="accesory.name"
        class="w-full h-20 rounded-md object-cover"
      />
    </div>

    <!-- Detalles del accesorio -->
    <div class="col-span-8 sm:col-span-9 flex flex-col">
      <span
        class="text-white text-lg font-semibold truncate"
        :title="accesory.name"
      >
        {{ accesory.name }}
      </span>
      <span class="text-blue-400"> Meta quest 3</span>
      <!--      <a-->
      <!--        :href="accesory.affiliate_link"-->
      <!--        target="_blank"-->
      <!--        rel="noopener noreferrer"-->
      <!--        class="mt-2 text-sm text-green-300 hover:underline focus:underline"-->
      <!--        aria-label="Más información sobre {{ accesory.name }}"-->
      <!--      >-->
      <!--        Ver más-->
      <!--      </a>-->
    </div>
  </div>
</template>

<style scoped></style>

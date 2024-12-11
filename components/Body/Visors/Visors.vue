<script setup lang="ts">
import visors from "~/constants/visors.json";
import Card from "~/components/CustomCards/MediumCard/Card.vue";
import { ref } from "vue";

// Referencia al contenedor del carrusel
const carousel = ref(null);

// Función para desplazarse a la izquierda
const scrollLeft = () => {
  carousel.value?.scrollBy({
    left: -300, // Ajusta este valor al ancho de cada tarjeta
    behavior: "smooth",
  });
};

// Función para desplazarse a la derecha
const scrollRight = () => {
  carousel.value?.scrollBy({
    left: 300, // Ajusta este valor al ancho de cada tarjeta
    behavior: "smooth",
  });
};
</script>

<template>
  <div class="relative">
    <!-- Título y subtítulo -->
    <TitleContent
      title="Los mejores visores del mercado"
      class="flex flex-col gap-y-2"
    >
      <template #subtitle>
        Con la compra de cualquier visor... ¡Obtienes
        <span class="text-yellow-400">60€</span> para gastar en la tienda de
        Meta!
      </template>
    </TitleContent>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
    >
      <div v-for="visor in visors" :key="visor.id" class="rounded-lg">
        <Card :game="visor" class="bg-gray-700" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

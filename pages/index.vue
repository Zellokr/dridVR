<script setup lang="ts">
import { ref } from "vue";

import { Dialog, DialogContent } from "@/components/ui/dialog";

const dialogOpen = ref(false);

const searchTerm = ref("");
const hasVideo = ref(false);
const hasCrossbuy = ref(false);
const hasHaptic = ref(false);

// Función para verificar si ha pasado un día
function hasOneDayPassed(lastShown) {
  const lastDate = new Date(lastShown);
  const now = new Date();
  const diffInMs = now - lastDate;
  const oneDayInMs = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
  return diffInMs >= oneDayInMs;
}

onMounted(() => {
  if (process.client) {
    const lastShown = localStorage.getItem("dialogLastShown");

    if (!lastShown || hasOneDayPassed(lastShown)) {
      dialogOpen.value = true; // Muestra el diálogo
      localStorage.setItem("dialogLastShown", new Date().toISOString()); // Actualiza la fecha
    }
  }
});
</script>

<template>
  <div class="h-full w-full text-gray-200 font-sans">
    <!-- Diálogo BLACK FRIDAY -->
    <Dialog v-model:open="dialogOpen">
      <DialogTitle class="sr-only" />
      <DialogContent
        class="border border-gray-800 rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl p-8 max-w-md mx-auto mt-10 text-center"
      >
        <div class="relative z-10">
          <!-- Título principal -->
          <div class="text-yellow-400 text-3xl font-extrabold tracking-wide">
            BLACK FRIDAY
          </div>
          <div class="text-gray-300 text-sm font-medium mt-2">
            Se aplica a todos los juegos hasta
            <strong class="text-yellow-300">31/12/24</strong>
          </div>
          <!-- Descuento -->
          <div class="text-8xl font-black text-white mt-4">
            20<span class="text-yellow-400">%</span>
          </div>
          <!-- Botón de llamada a la acción -->
          <DialogClose as-child>
            <button
              class="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:ring-2 focus:ring-yellow-300"
            >
              ¡Explorar ofertas!
            </button>
          </DialogClose>
        </div>
      </DialogContent>
      <DialogDescription class="sr-only" />
    </Dialog>

    <Header />

    <div
      class="md:container grid grid-flow-row-dense grid-cols-4 grid-rows-auto gap-4"
    >
      <div class="col-span-12">
        <Banner />
      </div>

      <div class="col-span-12 row-start-2 rounded-md sticky top-0 z-20">
        <Filters
          v-model:searchTerm="searchTerm"
          v-model:hasVideo="hasVideo"
          v-model:hasCrossbuy="hasCrossbuy"
          v-model:hasHaptic="hasHaptic"
        />
      </div>
      <div class="col-span-12 row-start-3">
        <AllGames
          :filter-search-terms="searchTerm"
          :filter-video="hasVideo"
          :filter-crossbuy="hasCrossbuy"
          :filter-haptic="hasHaptic"
        />
      </div>
    </div>

    <!-- Encabezado -->

    <!--    <div class="container mx-auto flex flex-col gap-y-4 mt-4">-->
    <!--      &lt;!&ndash; Sección de características &ndash;&gt;-->
    <!--      <Features />-->
    <!--      &lt;!&ndash; Sección de accesorios &ndash;&gt;-->
    <!--      <Accesories />-->
    <!--      &lt;!&ndash; Listado de juegos &ndash;&gt;-->
    <!--      <AllGames />-->
    <!--    </div>-->
  </div>
</template>

<style scoped></style>

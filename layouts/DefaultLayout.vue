<script setup lang="ts">
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { ref } from "vue";

const dialogOpen = ref(false);
const hasOneDayPassed = (lastShown) => {
  const lastDate = new Date(lastShown);
  const now = new Date();
  const diffInMs = now - lastDate;
  const oneDayInMs = 24 * 60 * 60 * 1000;
  return diffInMs >= oneDayInMs;
};

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
  <div
    class="min-h-dvh w-full bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900"
  >
    <Dialog v-model:open="dialogOpen">
      <DialogTitle class="sr-only" />
      <DialogContent
        class="border border-gray-800 rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl p-8 max-w-md mx-auto mt-10 text-center"
      >
        <div class="relative z-10">
          <!-- Título principal -->
          <div class="text-yellow-400 text-3xl font-extrabold tracking-wide">
            OFERTAS DE NAVIDAD
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
    <slot />
  </div>
</template>

<style scoped></style>

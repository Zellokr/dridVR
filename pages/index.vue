<script setup lang="ts">
import { ref } from "vue";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const dialogOpen = ref(false);

onMounted(() => {
  if (process.client) {
    const lastShown = localStorage.getItem("dialogLastShown");

    if (!lastShown || hasOneDayPassed(lastShown)) {
      dialogOpen.value = true; // Muestra el diálogo
      localStorage.setItem("dialogLastShown", new Date().toISOString()); // Actualiza la fecha
    }
  }
});

// Función para verificar si ha pasado un día
function hasOneDayPassed(lastShown) {
  const lastDate = new Date(lastShown);
  const now = new Date();
  const diffInMs = now - lastDate;
  const oneDayInMs = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
  return diffInMs >= oneDayInMs;
}
</script>

<template>
  <div class="h-full w-full bg-gray-950 text-gray-200 font-sans">
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
    <!-- Encabezado -->
    <Header />
    <div class="container mx-auto flex flex-col gap-y-4 mt-4">
      <!-- Sección de características -->
      <Features />
      <!-- Sección de accesorios -->
      <Accesories />
      <!-- Listado de juegos -->
      <AllGames />
    </div>
  </div>
</template>

<style scoped>
/* Transición cuando el card de filtro aparece */
.filter-transition-enter-active {
  animation: bounce-in 0.2s ease-out;
}

.filter-transition-leave-active {
  animation: bounce-in 0.2s reverse ease-in;
}

@keyframes bounce-in {
  0% {
    transform: scale(0) translateY(50px); /* Empieza pequeño y desplazado hacia abajo */
    opacity: 0; /* Empieza invisible */
  }
  50% {
    transform: scale(1.1) translateY(-10px); /* Rebote hacia arriba y más grande */
    opacity: 1; /* Se vuelve visible */
  }
  100% {
    transform: scale(1) translateY(0); /* Llega a su tamaño y posición final */
    opacity: 1; /* Totalmente visible */
  }
}

/* Efecto de salida */
.filter-transition-leave-to {
  transform: scale(0) translateY(50px); /* Sale hacia abajo y pequeño */
  opacity: 0;
}
</style>

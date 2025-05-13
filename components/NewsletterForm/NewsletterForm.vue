<script setup>
import { ref } from 'vue'

const showModal = ref(true)

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div class="relative max-w-full w-[90%] bg-[#f1f4f7] sm:w-[600px] lg:px-4">
      <button @click="closeModal"
              class="absolute z-10 lg:top-2 lg:right-1 right-3 top-0 text-gray-800 hover:text-black text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center">
        &times;
      </button>

      <iframe
          title="brevoForm"
          class="w-full h-[500px] rounded "
          src="https://sibforms.com/serve/MUIFACDrndl2myUXWVVFkClABONnpkqVs_cJLZ0Vy1IZBIHLP4ZbZwk9DDGROZJwSOoAcgSFSb0Sn44IB70PLMtk3qYAcJoiLpxuGppl6dbY94MSjSX1CtN3aKGkCr1eiGhfSrd7zEzLOUw00tJ_DmqnLzpRxTVEH0epzxyNjXEK8OgzBPzOs1mr0UrkgWpjCycayfl2wl8oU0i1"
      ></iframe>
    </div>
  </div>

</template>

<style scoped>
/* Estilos generales para el scrollbar */
::-webkit-scrollbar {
  width: 12px; /* Ancho del scrollbar */
  background-color: #1e1e1e; /* Color de fondo del scrollbar */
  border-radius: 6px; /* Redondeo del scrollbar */
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(
      to bottom,
      #4a4a4a,
      #2a2a2a
  ); /* Degradado para el "thumb" */
  border-radius: 6px; /* Redondeo del thumb */
  border: 2px solid #1e1e1e; /* Borde alrededor del thumb */
}
</style>
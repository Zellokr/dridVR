<script setup>
import { ref } from 'vue'

const showModal = ref(true)

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div class="relative max-w-full w-[90%] sm:w-[600px]">
      <button @click="closeModal"
              class="absolute z-10 top-2 right-3 text-gray-800 hover:text-black text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center ">
        &times;
      </button>

      <iframe
          title="brevoForm"
          class="w-full h-[500px] rounded shadow"
          src="https://sibforms.com/serve/MUIFAL-nFSMZm6tG8LOx2PMLVwbvkNhGv8PRk-nhlgAIkV2WIrhJjUc4VkQyfsoR-UnN3JFp32hVlpAy5ipu50flVF1bKCG9vFC6pnIFwmBc6Y8Jt2iplr6iMIYwr83wJPTgYgXHGiaG7_oZnlY5GaApVn38hbyPTaW-Ofks317B7Ko6ehDTatYTSgYBomU6qmAxciXKVQXwfCKt"
      ></iframe>
    </div>
  </div>
</template>


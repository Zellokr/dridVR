<script setup lang="ts">

const goToChannel = () => {
  window.open('https://www.youtube.com/@dridvr', '_blank');
}

</script>

<template>
  <div class="bg-gray-700 h-auto w-full pb-4 rounded-b-full">
    <div class="flex flex-col justify-center items-center gap-y-5 sm:gap-y-3 md:gap-x-8 md:py-8 ">
      <!-- Logo -->
      <img
          src="/img/logo.png"
          alt="Logo"
          width="150"
          height="150"
          class="mt-4 w-28 sm:w-36 md:w-40 max-w-full h-auto cursor-pointer"
          @click="goToChannel"
      >
      <!-- Texto -->
      <div class="text-center md:text-left px-5 md:px-2">
      <span class="text-white text-base sm:text-lg md:text-xl font-bold leading-relaxed">
        ¡Usa estos enlaces de afiliado y consigue un <span class="text-yellow-400">20% de descuento</span> en cualquier juego!
      </span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.custom-color-header{
  background-color: #3b3b3b;
}

</style>
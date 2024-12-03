<script setup lang="ts">
const goToChannel = () => {
  window.open("https://www.youtube.com/@dridvr", "_blank");
};
</script>

<template>
  <div class="w-full pb-4">
    <div
      class="flex flex-col justify-center items-center gap-y-6 py-8 md:gap-y-8"
    >
      <!-- Logo -->
      <img
        src="/img/logo.png"
        alt="Logo"
        width="150"
        height="150"
        class="mt-4 w-28 sm:w-36 md:w-40 h-auto cursor-pointer transition-transform duration-200 hover:scale-105"
        @click="goToChannel"
      />
      <!-- Texto promocional -->
      <!--      <div class="text-center px-5 md:px-2">-->
      <!--        <span-->
      <!--          class="text-white text-lg sm:text-xl md:text-2xl font-bold leading-relaxed block"-->
      <!--        >-->
      <!--          ¡Usa estos enlaces de afiliado y consigue un-->
      <!--          <span class="text-yellow-400">20% de descuento</span> en cualquier-->
      <!--          juego!-->
      <!--        </span>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style scoped>
.custom-color-header {
  background-color: #3b3b3b;
}
</style>

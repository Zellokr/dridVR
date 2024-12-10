<script setup lang="ts"></script>

<template>
  <nav class="flex items-center gap-x-4">
    <NuxtLink
      to="/"
      class="text-white font-semibold text-xl cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      Inicio
    </NuxtLink>
    <NuxtLink
      to="/Games"
      class="text-white font-semibold text-xl cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      Juegos VR
    </NuxtLink>

    <!--    &lt;!&ndash; Navegación a la página de "Visores" &ndash;&gt;-->
    <!--    <NuxtLink-->
    <!--      to="/visores"-->
    <!--      class="text-white font-semibold text-xl cursor-pointer transition-transform duration-200 hover:scale-105"-->
    <!--    >-->
    <!--      Visores-->
    <!--    </NuxtLink>-->

    <!-- Navegación a la página de "Accesorios" -->
    <NuxtLink
      to="/Accessories"
      class="text-white font-semibold text-xl cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      Accesorios
    </NuxtLink>
  </nav>
</template>

<style scoped></style>

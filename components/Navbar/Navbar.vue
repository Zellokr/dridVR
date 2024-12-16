<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <nav class="flex items-center gap-x-4 font-light">
    <NuxtLink
      to="/"
      class="text-white text-2xl cursor-pointer"
      active-class="font-bold"
    >
      Inicio
    </NuxtLink>
    <NuxtLink
      to="/Games"
      class="text-white text-2xl cursor-pointer"
      active-class="font-bold"
    >
      Juegos VR
    </NuxtLink>
    <NuxtLink
      to="/Accessories"
      class="text-white text-2xl cursor-pointer"
      active-class="font-bold"
    >
      Accesorios
    </NuxtLink>
  </nav>
</template>

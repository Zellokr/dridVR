<template>
  <nav class="flex items-center gap-x-4 font-light">
    <NuxtLink
      to="/"
      class="text-white text-2xl cursor-pointer transition-all duration-200 hover:text-primary"
      active-class="font-bold text-primary"
    >
      Inicio
    </NuxtLink>
    <NuxtLink
      to="/games"
      class="text-white text-2xl cursor-pointer transition-all duration-200 hover:text-primary"
      active-class="font-bold text-primary"
    >
      Juegos VR
    </NuxtLink>
    <NuxtLink
      to="/accessories"
      class="text-white text-2xl cursor-pointer transition-all duration-200 hover:text-primary"
      active-class="font-bold text-primary"
    >
      Accesorios
    </NuxtLink>
  </nav>
</template>

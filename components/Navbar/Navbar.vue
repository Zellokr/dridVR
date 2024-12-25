<template>
  <client-only>
    <nav class="flex items-center gap-x-4 font-light">
      <NuxtLink
        to="/"
        class="text-white text-2xl cursor-pointer"
        active-class="font-bold"
      >
        <span>Inicio</span>
      </NuxtLink>
      <NuxtLink
        to="/games"
        class="text-white text-2xl cursor-pointer"
        active-class="font-bold"
      >
        <span>Juegos VR</span>
      </NuxtLink>
      <NuxtLink
        to="/accessories"
        class="text-white text-2xl cursor-pointer"
        active-class="font-bold"
      >
        <span>Accesorios</span>
      </NuxtLink>
    </nav>
  </client-only>
</template>

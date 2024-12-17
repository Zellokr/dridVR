<script setup lang="ts">
import { handleContent } from "~/utils/handleContent";
import SocialsMedia from "~/components/Header/SocialsMedia/SocialsMedia.vue";
import Navbar from "~/components/Navbar/Navbar.vue";
</script>

<template>
  <div class="w-full mb-12">
    <div
      class="flex flex-col justify-center items-center gap-y-6 py-8 md:gap-y-8"
    >
      <nuxt-img
        src="/img/logo.png"
        alt="Drid logo"
        class="rounded-xl cursor-pointer transition-transform duration-200 hover:scale-105 w-auto h-24"
        @click="handleContent('https://www.youtube.com/@dridvr')"
        format="webp"
      />
      <SocialsMedia />
      <Navbar />
    </div>
  </div>
</template>

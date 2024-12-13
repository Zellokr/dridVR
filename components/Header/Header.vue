<script setup lang="ts">
import { handleContent } from "~/utils/handleContent";
import SocialsMedia from "~/components/Header/SocialsMedia/SocialsMedia.vue";
import Navbar from "~/components/Navbar/Navbar.vue";
</script>

<template>
  <div class="w-full mb-12">
    <div
      class="flex flex-col justify-center items-center gap-y-6 py-8 md:gap-y-8"
      id="allgames"
    >
      <img
        src="/img/logo.png"
        alt="Logo"
        width="150"
        height="150"
        class="mt-4 w-28 sm:w-36 md:w-40 h-auto cursor-pointer transition-transform duration-200 hover:scale-105"
        @click="handleContent('https://www.youtube.com/@dridvr')"
      />
      <SocialsMedia />
      <Navbar />
    </div>
  </div>
</template>

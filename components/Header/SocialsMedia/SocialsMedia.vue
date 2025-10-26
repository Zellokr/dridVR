<script setup lang="ts">
import { socialMediaList } from "~/constants/socialMedia";
</script>

<template>
  <div class="flex space-x-3.5">
    <a
      v-for="(social, index) in socialMediaList as any"
      :key="social.id || index"
      :href="social.url"
      target="_blank"
      rel="noopener noreferrer"
      class="transform transition-transform duration-200 hover:scale-125"
    >
      <MdiIcon
        :icon="social.icon"
        preserve-aspect-ratio="xMaxYMax slice"
        class="text-white w-8 h-8 cursor-pointer"
        :aria-label="social.altText"
      />
    </a>
  </div>
</template>

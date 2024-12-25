<script setup lang="ts">
import { socialMediaList } from "~/constants/socialMedia";
</script>

<template>
  <transition-group name="scale" tag="div" class="flex space-x-3.5">
    <div
      v-for="(social, index) in socialMediaList as any"
      :key="social.id || index"
    >
      <a :href="social.url" target="_blank">
        <MdiIcon
          :icon="social.icon"
          class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
          :aria-label="social.altText"
        />
      </a>
    </div>
  </transition-group>
</template>

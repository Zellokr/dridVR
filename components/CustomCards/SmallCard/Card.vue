<script setup lang="ts">
import type { Accessory } from "~/constants/accessories";

defineProps<{ content: Accessory }>();
</script>

<template>
  <NuxtLink
    class="flex flex-col items-center p-4 rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-blue-400"
    :aria-label="`Más información sobre ${content.name}`"
  >
    <img
      :src="content.img_link"
      :alt="content.name"
      class="w-40 h-40 md:w-52 md:h-52 rounded-md object-cover transition-transform duration-300 hover:scale-105"
    />
    <span
      class="text-white text-lg font-semibold truncate mt-2"
      :title="content.name"
    >
      {{ content.name }}
    </span>
    <div
      v-for="(platform, index) in content.platforms"
      :key="index"
      class="text-blue-400 text-sm break-words"
    >
      Para: {{ platform }}
    </div>
    <span class="text-green-400 font-bold">{{ content.discountCode }}</span>
    <span class="font-bold text-lg text-white">Cómpralo en: </span>
    <div class="flex items-center gap-4 mt-2 p-2">
      <a
        v-if="content.affiliate_link"
        :href="content.affiliate_link"
        target="_blank"
      >
        <nuxt-img
          class="w-12 h-11 hover:scale-110 transition-transform"
          :src="content.logo"
        />
      </a>
      <a v-if="content.amazon_link" :href="content.amazon_link" target="_blank">
        <nuxt-img
          class="w-12 h-11 hover:scale-110 transition-transform"
          src="/icons/AmazonIcon.webp"
        />
      </a>
    </div>
  </NuxtLink>
</template>

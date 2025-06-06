<script setup lang="ts">
import type { Accessory } from "~/constants/accessories";

defineProps<{ content: Accessory }>();
</script>

<template>
  <NuxtLink
      class="group flex flex-col dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      :aria-label="`Más información sobre ${content.name}`"
  >
    <!-- Imagen reducida y centrada -->
    <div class="w-full max-w-[180px] md:max-w-[200px] mx-auto overflow-hidden rounded-md">
      <img
          :src="content.img_link"
          :alt="content.name"
          class="w-full h-36 md:h-40 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <div class="mt-4 flex flex-col flex-1 items-center text-center">
      <h3
          class="text-base md:text-lg font-semibold text-gray-900 dark:text-white truncate"
          :title="content.name"
      >
        {{ content.name }}
      </h3>

      <div class="flex flex-wrap justify-center gap-1 text-sm text-blue-600 dark:text-blue-300 mt-1">
        <span v-for="(platform, index) in content.platforms" :key="index">{{ platform }}</span>
      </div>

      <div v-if="content.discountCode" class="text-green-600 dark:text-green-400 font-medium mt-2">
        Código: {{ content.discountCode }}
      </div>

      <div class="mt-auto w-full">
        <span class="text-sm text-gray-700 dark:text-gray-300 font-medium block mt-4">
          Cómpralo en:
        </span>

        <div class="flex justify-center items-center gap-3 mt-2">
          <a
              v-if="content.affiliate_link"
              :href="content.affiliate_link"
              target="_blank"
              rel="noopener noreferrer"
          >
            <nuxt-img
                :src="content.logo"
                class="w-8 h-8 hover:scale-110 transition-transform"
                alt="Affiliate Logo"
            />
          </a>

          <a
              v-if="content.amazon_link"
              :href="content.amazon_link"
              target="_blank"
              rel="noopener noreferrer"
          >
            <nuxt-img
                src="/icons/AmazonIcon.webp"
                class="w-8 h-8 hover:scale-110 transition-transform"
                alt="Amazon"
            />
          </a>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

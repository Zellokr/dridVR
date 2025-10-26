<script setup lang="ts">
import type { Accessory } from "~/constants/accessories";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

type CardProps = {
  content: Accessory;
  class?: HTMLAttributes["class"];
};

const props = defineProps<CardProps>();
</script>

<template>
  <article
    :class="
      cn(
        'group relative w-full bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-2xl hover:border-gray-600 hover:-translate-y-1 transition-all duration-300',
        props.class
      )
    "
  >
    <!-- Image Container -->
    <div class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
      <img
        :src="content.img_link"
        :alt="content.name"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Discount Badge -->
      <div
        v-if="content.discountCode"
        class="absolute top-2 right-2 z-20 px-2.5 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-bold text-white shadow-lg"
      >
        {{ content.discountCode }}
      </div>

      <!-- Platforms Badge -->
      <div
        v-if="content.platforms && content.platforms.length > 0"
        class="absolute bottom-2 left-2 z-20 flex flex-wrap items-center gap-1"
      >
        <span
          v-for="(platform, index) in content.platforms.slice(0, 2)"
          :key="index"
          class="px-2 py-0.5 bg-blue-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white shadow-lg"
        >
          {{ platform }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-2.5 sm:p-3 bg-gray-800">
      <h3
        class="text-xs sm:text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-200 leading-snug mb-2"
        :title="content.name"
      >
        {{ content.name }}
      </h3>

      <!-- Purchase Links -->
      <div
        class="flex items-center justify-center gap-2 pt-2 border-t border-gray-700/50"
      >
        <a
          v-if="content.affiliate_link"
          :href="content.affiliate_link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          :aria-label="`Comprar ${content.name} en tienda oficial`"
        >
          <img
            :src="content.logo"
            class="w-5 h-5 object-contain"
            :alt="content.brand"
          />
        </a>

        <a
          v-if="content.amazon_link"
          :href="content.amazon_link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          aria-label="Comprar en Amazon"
        >
          <img
            src="/icons/AmazonIcon.webp"
            class="w-5 h-5 object-contain"
            alt="Amazon"
          />
        </a>
      </div>
    </div>
  </article>
</template>

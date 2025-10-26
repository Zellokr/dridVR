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
        'group relative w-full bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/60 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300',
        props.class
      )
    "
  >
    <div class="flex flex-col h-full">
      <!-- Image Container - Ampliado -->
      <div class="relative overflow-hidden aspect-square sm:aspect-4/3">
        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10"
        ></div>

        <!-- Image -->
        <img
          :src="content.img_link"
          :alt="content.name"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <!-- Discount Badge Only -->
        <div
          v-if="content.discountCode"
          class="absolute top-3 right-3 z-20 px-2.5 py-1 bg-green-500/95 backdrop-blur-sm rounded-md text-xs font-bold text-white shadow-lg"
        >
          {{ content.discountCode }}
        </div>
      </div>

      <!-- Content Section - Ampliado -->
      <div class="flex-1 p-4 sm:p-5 flex flex-col">
        <!-- Title - Fixed Height -->
        <h3
          class="text-base sm:text-lg font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-200 mb-2 leading-snug min-h-[3rem]"
          :title="content.name"
        >
          {{ content.name }}
        </h3>

        <!-- Platforms - Fixed Height -->
        <div class="min-h-[1.75rem] mb-3">
          <div
            v-if="content.platforms && content.platforms.length > 0"
            class="flex flex-wrap gap-1.5"
          >
            <span
              v-for="(platform, index) in content.platforms"
              :key="index"
              class="px-2 py-0.5 bg-blue-600/20 border border-blue-500/40 rounded text-xs font-medium text-blue-300"
            >
              {{ platform }}
            </span>
          </div>
        </div>

        <!-- Purchase Links - Mejorado -->
        <div
          class="mt-auto flex items-center justify-center gap-3 pt-4 border-t border-gray-700/50"
        >
          <a
            v-if="content.affiliate_link"
            :href="content.affiliate_link"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-11 h-11 rounded-lg bg-gray-700/70 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :aria-label="`Comprar ${content.name}`"
          >
            <img
              :src="content.logo"
              class="w-6 h-6 object-contain"
              :alt="content.brand"
            />
          </a>

          <a
            v-if="content.amazon_link"
            :href="content.amazon_link"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-11 h-11 rounded-lg bg-gray-700/70 hover:bg-orange-500 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Amazon"
          >
            <img
              src="/icons/AmazonIcon.webp"
              class="w-6 h-6 object-contain"
              alt="Amazon"
            />
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

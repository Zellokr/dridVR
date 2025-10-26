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
        'group relative w-full bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300',
        props.class
      )
    "
  >
    <div class="flex flex-col h-full">
      <!-- Compact Image Container -->
      <div class="relative overflow-hidden aspect-[16/9]">
        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-900/40 z-10"
        ></div>

        <!-- Image -->
        <img
          :src="content.img_link"
          :alt="content.name"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        <!-- Top Badges Row -->
        <div
          class="absolute top-1.5 left-1.5 right-1.5 z-20 flex items-start justify-between"
        >
          <!-- Platforms -->
          <div
            v-if="content.platforms && content.platforms.length > 0"
            class="flex flex-wrap gap-1 max-w-[60%]"
          >
            <span
              v-for="(platform, index) in content.platforms.slice(0, 2)"
              :key="index"
              class="px-1.5 py-0.5 bg-blue-500/95 backdrop-blur-sm rounded text-[10px] font-semibold text-white shadow-md"
            >
              {{ platform }}
            </span>
          </div>

          <!-- Discount -->
          <div
            v-if="content.discountCode"
            class="px-2 py-0.5 bg-green-500/95 backdrop-blur-sm rounded text-[10px] font-bold text-white shadow-md flex-shrink-0"
          >
            {{ content.discountCode }}
          </div>
        </div>
      </div>

      <!-- Compact Content -->
      <div class="flex-1 p-2 flex flex-col">
        <!-- Title -->
        <h3
          class="text-[11px] sm:text-xs font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-200 leading-tight mb-1.5"
          :title="content.name"
        >
          {{ content.name }}
        </h3>

        <!-- Purchase Links - Compact -->
        <div
          class="mt-auto flex items-center justify-center gap-1.5 pt-1.5 border-t border-gray-700/30"
        >
          <a
            v-if="content.affiliate_link"
            :href="content.affiliate_link"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-6 h-6 rounded bg-gray-700/50 hover:bg-gray-600 transition-colors"
            :aria-label="`Comprar ${content.name}`"
          >
            <img
              :src="content.logo"
              class="w-3.5 h-3.5 object-contain"
              :alt="content.brand"
            />
          </a>

          <a
            v-if="content.amazon_link"
            :href="content.amazon_link"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center w-6 h-6 rounded bg-gray-700/50 hover:bg-gray-600 transition-colors"
            aria-label="Amazon"
          >
            <img
              src="/icons/AmazonIcon.webp"
              class="w-3.5 h-3.5 object-contain"
              alt="Amazon"
            />
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

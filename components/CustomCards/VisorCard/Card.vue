<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

type Visor = {
  name: string;
  affiliate_link: string;
  img_link: string;
};

type VisorCardProps = {
  visor: Visor;
  class?: HTMLAttributes["class"];
};

const props = defineProps<VisorCardProps>();
</script>

<template>
  <article
    :class="
      cn(
        'group relative w-full bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 hover:bg-gray-800 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300',
        props.class
      )
    "
  >
    <a
      :href="visor.affiliate_link"
      target="_blank"
      rel="noopener noreferrer nofollow"
      class="block"
    >
      <!-- Compact Image Container -->
      <div class="relative overflow-hidden aspect-video">
        <!-- Elegant Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        <!-- Image with smooth zoom -->
        <img
          :src="visor.img_link"
          :alt="visor.name"
          class="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          loading="lazy"
        />

        <!-- Premium Badge -->
        <div
          class="absolute top-2 right-2 z-20 px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 backdrop-blur-sm rounded-full text-xs font-bold text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Ver más
        </div>
      </div>

      <!-- Content Section -->
      <div class="p-3 sm:p-4 bg-gradient-to-br from-gray-800 to-gray-900">
        <div class="flex items-center justify-between gap-3">
          <!-- Title -->
          <h3
            class="text-sm sm:text-base font-bold text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300 leading-tight flex-1"
            :title="visor.name"
          >
            {{ visor.name }}
          </h3>

          <!-- CTA Icon -->
          <div
            class="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 group-hover:bg-purple-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          >
            <UIcon
              name="i-heroicons-arrow-right"
              class="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300"
            />
          </div>
        </div>

        <!-- Subtitle -->
        <p
          class="text-xs text-gray-400 mt-1.5 group-hover:text-gray-300 transition-colors duration-300"
        >
          Visor de Realidad Virtual
        </p>
      </div>
    </a>
  </article>
</template>

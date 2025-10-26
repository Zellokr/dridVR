<script setup lang="ts">
import { handleContent } from "~/utils/handleContent";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import type { SchemaGame } from "~/utils/types";

type CardProps = {
  game: SchemaGame;
} & { class?: HTMLAttributes["class"]; sizeImage?: string };

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
    <a
      :href="game.affiliate_link"
      target="_blank"
      rel="noopener noreferrer nofollow"
      class="block"
    >
      <!-- Image Container -->
      <div class="relative overflow-hidden aspect-[5/5]">
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
        <img
          :src="game.img_link"
          :alt="game.name || 'Game Image'"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <!-- YouTube Badge -->
        <ClientOnly>
          <button
            v-if="game.yt_link"
            :aria-label="`Ver video de ${game.name}`"
            class="absolute top-2 right-2 z-20 bg-red-600 hover:bg-red-500 rounded-full p-2 shadow-lg transform transition-all duration-300 hover:scale-110 active:scale-95"
            @click.stop.prevent="handleContent(game.yt_link)"
          >
            <SvgoYoutubeIcon class="w-4 h-4 text-white" />
          </button>
        </ClientOnly>

        <!-- Feature Badges Overlay -->
        <ClientOnly>
          <div
            v-if="game.crossbuy || game.bhaptics"
            class="absolute bottom-2 left-2 z-20 flex flex-wrap items-center gap-1.5"
          >
            <span
              v-if="game.crossbuy"
              class="flex items-center gap-1 px-2 py-0.5 bg-blue-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white shadow-lg"
            >
              <MdiIcon icon="mdiSync" class="w-3 h-3" />
              <span class="hidden sm:inline">CrossBuy</span>
            </span>
            <span
              v-if="game.bhaptics"
              class="flex items-center gap-1 px-2 py-0.5 bg-purple-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white shadow-lg"
            >
              <MdiIcon icon="mdiVibrate" class="w-3 h-3" />
              <span class="hidden sm:inline">bHaptics</span>
            </span>
          </div>
        </ClientOnly>
      </div>

      <!-- Content -->
      <div class="p-2.5 sm:p-3 bg-gray-800">
        <h3
          class="text-xs sm:text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition-colors duration-200 leading-snug"
          :title="game.name"
        >
          {{ game.name || "Nombre del Juego" }}
        </h3>
      </div>
    </a>
  </article>
</template>

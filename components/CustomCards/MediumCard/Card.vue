<script setup lang="ts">
import { handleContent } from "~/utils/handleContent";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export type GameSchema = {
  name?: string;
  affiliate_link: string;
  img_link: string;
  yt_link?: string;
  crossbuy?: number;
  bhaptics?: number;
};

type CardProps = {
  game: GameSchema;
} & { class?: HTMLAttributes["class"]; sizeImage?: string };

const props = defineProps<CardProps>();

// Compute the image height class properly for Tailwind
const imageHeightClass = computed(() => {
  return props.sizeImage ? `h-${props.sizeImage}` : "h-52";
});
</script>

<template>
  <UCard
    :class="cn('bg-gray-800 text-white shadow-lg overflow-hidden', props.class)"
    :ui="{
      body: {
        padding: '',
      },
    }"
  >
    <a
      :href="game.affiliate_link"
      target="_blank"
      rel="noopener noreferrer nofollow"
      class="block"
    >
      <div class="relative">
        <img
          :src="game.img_link"
          alt="Game Image"
          :class="cn('w-full object-cover h-52', imageHeightClass)"
        />
        <ClientOnly>
          <a
            v-if="game.yt_link"
            :href="game.yt_link"
            class="absolute top-2 right-2 bg-red-600 rounded-full p-2 cursor-pointer transform transition-transform duration-300 hover:scale-110"
            @click.stop.prevent="handleContent(game.yt_link)"
          >
            <SvgoYoutubeIcon />
          </a>
        </ClientOnly>
      </div>
      <div
        class="p-4 h-20 flex justify-between items-center shadow-md bg-gray-800"
      >
        <span class="text-lg font-semibold text-white truncate">
          {{ game.name || "Nombre del Juego" }}
        </span>
        <ClientOnly>
          <div
            class="flex items-center gap-x-2 text-white px-2 py-1 rounded-lg shadow-sm"
          >
            <MdiIcon
              v-if="game.crossbuy"
              icon="mdiSync"
              class="text-white w-4 h-4"
            />
            <MdiIcon
              v-if="game.bhaptics"
              icon="mdiVibrate"
              class="text-white w-4 h-4"
            />
          </div>
        </ClientOnly>
      </div>
    </a>
  </UCard>
</template>

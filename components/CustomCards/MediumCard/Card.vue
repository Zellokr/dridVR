<script setup lang="ts">
import { handleContent } from "~/utils/handleContent";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

export type GameSchema = {
  name?: string;
  affiliate_link: string;
  img_link: string;
  yt_link?: string;
  crossbuy?: boolean;
  bhaptics?: boolean;
};

type CardProps = {
  game: GameSchema;
} & { class?: HTMLAttributes["class"]; sizeImage?: string };

const props = defineProps<CardProps>();

import { Card, CardContent } from "@/components/ui/card";
</script>

<template>
  <Card>
    <CardContent
      :class="
        cn('bg-gray-800 text-white shadow-lg overflow-hidden', props.class)
      "
    >
      <a
        :href="game.affiliate_link"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <img
          :src="game.img_link"
          alt="Game Image"
          class="w-full object-cover"
          :class="[sizeImage ? `h-${sizeImage}` : 'h-52']"
          loading="lazy"
        />
        <a
          v-if="game.yt_link"
          :href="game.yt_link"
          class="absolute top-2 right-2 bg-red-600 rounded-full p-2 cursor-pointer transform transition-transform duration-300 hover:scale-110"
          @click.stop.prevent="handleContent(game.yt_link)"
        >
          <SvgoYoutubeIcon />
        </a>
        <div class="p-4 h-20 flex justify-between items-center shadow-md">
          <span class="text-lg font-semibold text-white truncate">
            {{ game.name || "Nombre del Juego" }}
          </span>
          <div
            v-if="game.crossbuy || game.bhaptics"
            class="flex items-center gap-x-2 text-white px-2 py-1 rounded-lg shadow-sm"
          >
            <MdiIcon
              v-if="game.crossbuy"
              icon="mdiSync"
              preserve-aspect-ratio="xMaxYMax slice"
              class="text-white w-4 h-4"
            />
            <MdiIcon
              v-if="game.bhaptics"
              preserve-aspect-ratio="xMaxYMax slice"
              icon="mdiVibrate"
              class="text-white w-4 h-4"
            />
          </div>
        </div>
      </a>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { handleContent } from "~/utils/handleContent";
type GameSchema = {
  name?: string;
  affiliate_link: string;
  img_link: string;
  yt_link?: string;
  crossbuy?: boolean;
  bhaptics?: boolean;
};

type CardProps = {
  game: GameSchema;
};

defineProps<CardProps>();
</script>

<template>
  <div class="block cursor-pointer shadow-3xl">
    <a
      :href="game.affiliate_link"
      target="_blank"
      rel="noopener noreferrer nofollow"
      class="block"
    >
      <div
        class="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
      >
        <!-- Imagen -->
        <div class="relative">
          <img
            :src="game.img_link"
            alt="Game Image"
            class="w-full h-48 object-cover"
            loading="lazy"
          />
          <div
            v-if="game.yt_link"
            class="absolute top-2 right-2 bg-red-600 rounded-full p-2 cursor-pointer transform transition-transform duration-300 hover:scale-110"
            @click.stop.prevent="handleContent(game.yt_link)"
          >
            <SvgoYoutubeIcon />
          </div>
          <div
            class="p-4 h-20 flex justify-between items-center bg-gray-800 rounded-lg shadow-md"
          >
            <h3 class="text-lg font-semibold text-white truncate">
              {{ game.name || "Nombre del Juego" }}
            </h3>
            <div
              v-if="game.crossbuy || game.bhaptics"
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
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped></style>

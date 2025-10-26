<script setup lang="ts">
import { ref, computed } from "vue";
import ContentGameList from "~/components/ContentGame/ContentGame.vue";
import Features from "~/components/Body/Features/Features.vue";
import { bannerImagesList } from "~/constants/bannerImageList";
import Banner from "~/components/Body/Banner/Banner.vue";
import { featureGames } from "~/constants/features";
import { halloweenGames } from "~/constants/halloween";
import type { SchemaGame } from "~/utils/types";

const searchTerm = ref("");
const hasVideo = ref(false);
const hasCrossbuy = ref(false);
const hasHaptic = ref(false);

// Convertir halloweenGames al formato SchemaGame
const halloweenGamesFormatted = computed<SchemaGame[]>(() => {
  return halloweenGames.map((game) => ({
    ...game,
    crossbuy: Boolean(game.crossbuy),
    bhaptics: Boolean(game.bhaptics),
  }));
});

useHead({
  title: "Juegos VR baratos | Ofertas Meta Quest",
  meta: [
    {
      name: "description",
      content:
        "Aprovecha ofertas exclusivas y descuentos en videojuegos de realidad virtual para Meta Quest con nuestros enlaces de referidos.",
    },
    {
      name: "keywords",
      content:
        "descuentos, videojuegos, VR, Meta Quest, realidad virtual, ofertas, referidos Meta",
    },
    { name: "robots", content: "index, follow" },
    {
      property: "og:title",
      content: "Ofertas y descuentos en videojuegos VR para Meta Quest",
    },
    {
      property: "og:description",
      content:
        "Encuentra los mejores descuentos en videojuegos VR para Meta Quest con nuestros enlaces de referidos.",
    },
    {
      property: "og:image",
      content: "https://juegosquestbaratos.com/img/Banner/banner_image_1.webp",
    },
    { property: "og:url", content: "https://juegosquestbaratos.com/games" },
    { property: "og:type", content: "website" },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Ofertas de juegos VR para Meta Quest",
        description:
          "Descubre descuentos exclusivos en juegos VR para Meta Quest con enlaces de referidos.",
        url: "https://juegosquestbaratos.com/games",
      }),
    },
  ],
});
</script>

<template>
  <NuxtLayout name="default-layout">
    <!-- Hero Banner Section -->
    <section class="w-full">
      <UContainer class="px-4 sm:px-6 lg:px-8">
        <div class="py-6 sm:py-8 lg:py-12">
          <Banner :data-images="bannerImagesList" />
        </div>
      </UContainer>
    </section>

    <!-- Halloween Section -->
    <section class="w-full">
      <UContainer class="px-4 sm:px-6 lg:px-8">
        <div class="py-8 sm:py-12 lg:py-16">
          <!-- Section Header -->
          <div class="mb-8 sm:mb-10">
            <div
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full mb-4"
            >
              <UIcon name="i-lucide-ghost" class="w-4 h-4 text-orange-400" />
              <span class="text-xs font-medium text-orange-300"
                >Especial Halloween</span
              >
            </div>
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
            >
              Juegos de Terror 👻
            </h2>
            <p class="text-base sm:text-lg text-gray-400 max-w-2xl">
              Los juegos más aterradores para vivir Halloween en realidad
              virtual
            </p>
          </div>

          <!-- Halloween Games Grid -->
          <Features :data-list="halloweenGamesFormatted" />
        </div>
      </UContainer>
    </section>

    <!-- Divider -->
    <div
      class="w-full h-px bg-linear-to-r from-transparent via-orange-700 to-transparent my-8"
    ></div>

    <!-- Features Section -->
    <section class="w-full">
      <UContainer class="px-4 sm:px-6 lg:px-8">
        <div class="py-8 sm:py-12 lg:py-16">
          <!-- Section Header -->
          <div class="mb-8 sm:mb-10">
            <div
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4"
            >
              <UIcon name="i-lucide-sparkles" class="w-4 h-4 text-blue-400" />
              <span class="text-xs font-medium text-blue-300"
                >Novedades VR</span
              >
            </div>
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
            >
              Últimas Novedades
            </h1>
            <p class="text-base sm:text-lg text-gray-400 max-w-2xl">
              Los últimos lanzamientos y juegos más populares para tu visor Meta
              Quest
            </p>
          </div>

          <!-- Features Grid -->
          <Features :data-list="featureGames" />
        </div>
      </UContainer>
    </section>

    <!-- Divider -->
    <div
      class="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent my-8"
    ></div>

    <!-- Games Library Section -->
    <section class="w-full pb-20 sm:pb-16">
      <UContainer class="px-4 sm:px-6 lg:px-8">
        <!-- Filters - Sticky en móvil -->
        <div class="mb-8 sm:mb-10 lg:mb-10">
          <Filters
            v-model:searchTerm="searchTerm"
            v-model:hasVideo="hasVideo"
            v-model:hasCrossbuy="hasCrossbuy"
            v-model:hasHaptic="hasHaptic"
          />
        </div>

        <!-- Section Header -->
        <div id="allgames" class="mb-8 sm:mb-10 scroll-mt-24 lg:scroll-mt-24">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
          >
            <div>
              <h2
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2"
              >
                Catálogo Completo
              </h2>
              <p class="text-base sm:text-lg text-gray-400">
                Explora nuestra colección de juegos VR con descuentos
              </p>
            </div>

            <div
              class="flex items-center gap-2 px-3 py-2 bg-gray-800/80 border border-gray-700 rounded-lg"
            >
              <div
                class="w-2 h-2 rounded-full bg-green-500 animate-pulse"
              ></div>
              <span class="text-sm font-medium text-gray-300">Actualizado</span>
            </div>
          </div>
        </div>

        <!-- Games Grid -->
        <ContentGameList
          :filter-search-terms="searchTerm"
          :filter-video="hasVideo"
          :filter-crossbuy="hasCrossbuy"
          :filter-haptic="hasHaptic"
          class="pb-24 lg:pb-0"
        />
      </UContainer>
    </section>
  </NuxtLayout>
</template>

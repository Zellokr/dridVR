<script setup lang="ts">
import { ref } from "vue";
import ContentGameList from "~/components/ContentGame/ContentGame.vue";
import Features from "~/components/Body/Features/Features.vue";
import { bannerImagesList } from "~/constants/bannerImageList";
import Banner from "~/components/Body/Banner/Banner.vue";
import featureGames from "~/constants/features.json";
import featureGoty from "~/constants/goty.json";

const searchTerm = ref("");
const hasVideo = ref(false);
const hasCrossbuy = ref(false);
const hasHaptic = ref(false);

useHead({
  title: "Juegos VR baratos",
  meta: [
    {
      name: "description",
      content:
        "Aprovecha ofertas exclusivas y descuentos en videojuegos de realidad virtual para Meta Quest con nuestros enlaces de referidos.",
    },
    {
      name: "keywords",
      content:
        "descuentos, videojuegos, VR, Meta Quest, realidad virtual, ofertas navidad, referidos Meta",
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
    {
      property: "og:image",
      content: "https://juegosquestbaratos.com/img/Banner/banner_image_2.webp",
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
        mainEntity: "",
      }),
    },
  ],
});
</script>

<template>
  <NuxtLayout name="default-layout">
    <ScrollReveal>
      <div
        class="md:container grid grid-flow-row-dense grid-cols-4 grid-rows-auto gap-4 space-y-8 mx-6"
      >
        <div class="col-span-12 row-start-1">
          <Banner :data-images="bannerImagesList" />
        </div>
        <div class="col-span-12 row-start-3">
          <Features
            :data-list="featureGames"
            title="Últimas Novedades"
            subtitle="Los últimos lanzamientos para tu visor Meta Quest"
          />
        </div>
        <div class="col-span-12 row-start-4">
          <Features
            :data-list="featureGoty"
            title="GOTY"
            subtitle="Nominados como mejor juego del año 2024"
          />
        </div>
        <div class="col-span-12 row-start-5 rounded-md sticky top-0 z-20">
          <Filters
            v-model:searchTerm="searchTerm"
            v-model:hasVideo="hasVideo"
            v-model:hasCrossbuy="hasCrossbuy"
            v-model:hasHaptic="hasHaptic"
          />
        </div>
        <div class="col-span-12 row-start-6">
          <ContentGameList
            :filter-search-terms="searchTerm"
            :filter-video="hasVideo"
            :filter-crossbuy="hasCrossbuy"
            :filter-haptic="hasHaptic"
          />
        </div>
      </div>
    </ScrollReveal>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { bannerImagesList } from "~/constants/bannerImageList";
import ContentGameList from "~/components/ContentGame/ContentGame.vue";
import type { Tab } from "~/components/HandleTabs/types";
import Accesories from "~/components/HandleTabs/Accesories/Accesories.vue";
import Features from "~/components/HandleTabs/Features/Features.vue";
import Visors from "~/components/HandleTabs/Visors/Visors.vue";
import accesories from "~/constants/accesories.json";
import visors from "~/constants/visors.json";

useHead({
  title: "Ofertas y descuentos en videojuegos VR para Meta Quest",
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
    { property: "og:url", content: "https://juegosquestbaratos.com" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Ofertas y descuentos en videojuegos VR para Meta Quest",
    },
    {
      name: "twitter:description",
      content: "Aprovecha las mejores ofertas en juegos VR para Meta Quest.",
    },
    {
      name: "twitter:image",
      content: "https://juegosquestbaratos.com/img/Banner/banner_image_1.webp",
    },
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
        url: "https://juegosquestbaratos.com",
        mainEntity: "",
      }),
    },
  ],
});

const searchTerm = ref("");
const hasVideo = ref(false);
const hasCrossbuy = ref(false);
const hasHaptic = ref(false);

const tabs: Tab[] = [
  {
    label: "Novedades",
    value: "features",
    component: Features,
    icon: "mdiBellRing",
  },
  {
    label: "Visores",
    value: "visors",
    icon: "mdiGlasses",
    component: Visors,
  },
  {
    label: "Accesorios",
    value: "accesories",
    icon: "mdiCableData",
    component: Accesories,
  },
];

const router = useRouter();
</script>

<template>
  <NuxtLayout name="default-layout">
    <div class="h-full w-full text-gray-200 font-sans">
      <div
        class="md:container grid grid-flow-row-dense grid-cols-4 grid-rows-auto gap-4"
      >
        <div class="col-span-12 row-start-2 mx-6 md:mx-0">
          <Banner :data-images="bannerImagesList" />
        </div>
        <div class="col-span-12 row-start-3 mx-6 md:mx-0">
          <TitleContent
            title="Los mejores visores del mercado"
            class="flex flex-col gap-y-2"
          >
            <template #subtitle>
              Con la compra de cualquier visor... ¡Obtienes
              <span class="text-yellow-400">60€</span> para gastar en la tienda
              de Meta!
            </template>
          </TitleContent>
          <CustomGallery :info="visors" />
          <!--          <HandleTabs default-value="visors" :tabs="tabs" />-->
          <!--          <button-->
          <!--            class="w-52 h-52 bg-slate-200"-->
          <!--            @click="router.push('/Accesories')"-->
          <!--          ></button>-->
        </div>
        <div class="col-span-12 row-start-4 mx-6 md:mx-0">
          <TitleContent
            title="Los mejores accesorios para tus Meta Quest"
            class="flex flex-col gap-y-2"
          />
          <CustomGallery :info="accesories" />
          <!--        <Features />-->
        </div>
        <div class="col-span-12 row-start-5 mx-6 md:mx-0">
          <!--        <Visors />-->
        </div>
        <div class="col-span-12 row-start-6 mx-6 md:mx-0" id="allgames">
          <!--          <TitleContent title="Juegos" class="static" />-->
        </div>
        <div class="col-span-12 row-start-7 rounded-md sticky top-0 z-20">
          <!--          <Filters-->
          <!--            v-model:searchTerm="searchTerm"-->
          <!--            v-model:hasVideo="hasVideo"-->
          <!--            v-model:hasCrossbuy="hasCrossbuy"-->
          <!--            v-model:hasHaptic="hasHaptic"-->
          <!--          />-->
        </div>
        <div class="col-span-12 row-start-8">
          <!--          <ContentGameList-->
          <!--            :filter-search-terms="searchTerm"-->
          <!--            :filter-video="hasVideo"-->
          <!--            :filter-crossbuy="hasCrossbuy"-->
          <!--            :filter-haptic="hasHaptic"-->
          <!--          />-->
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
/* Estilos generales para el scrollbar */
::-webkit-scrollbar {
  width: 12px; /* Ancho del scrollbar */
  background-color: #1e1e1e; /* Color de fondo del scrollbar */
  border-radius: 6px; /* Redondeo del scrollbar */
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(
    to bottom,
    #4a4a4a,
    #2a2a2a
  ); /* Degradado para el "thumb" */
  border-radius: 6px; /* Redondeo del thumb */
  border: 2px solid #1e1e1e; /* Borde alrededor del thumb */
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    to bottom,
    #6a6a6a,
    #3a3a3a
  ); /* Cambio de color al pasar el cursor */
}

::-webkit-scrollbar-thumb:active {
  background: linear-gradient(
    to bottom,
    #8a8a8a,
    #5a5a5a
  ); /* Cambio de color al hacer clic */
}

::-webkit-scrollbar-corner {
  background: #1e1e1e; /* Color de la esquina del scrollbar */
}
</style>

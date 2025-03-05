<script setup lang="ts">
import { bannerImagesList } from "~/constants/bannerImageList";
import Accesories from "~/components/Body/Accessories/Accessories.vue";
import Visors from "~/components/Body/Visors/Visors.vue";
import Banner from "~/components/Body/Banner/Banner.vue";

useHead({
  title: "Accesorios para gafas de realidad virtual",
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
      property: "og:url",
      content: "https://juegosquestbaratos.com/accessories",
    },
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
        url: "https://juegosquestbaratos.com/accessories",
        mainEntity: "",
      }),
    },
  ],
});
</script>

<template>
  <NuxtLayout name="default-layout">
    <div class="pb-14">
      <div
        class="md:container grid grid-flow-row-dense grid-cols-4 grid-rows-auto gap-4 space-y-8 mx-6"
      >
        <div class="col-span-12 row-start-1">
          <Banner :data-images="bannerImagesList" :start-index="1" />
        </div>
        <div class="col-span-12 row-start-2">
          <Visors />
        </div>
        <div class="col-span-12 row-start-3">
          <Accesories
            title="Accesorios VR"
            subtitle="Los mejores accesorios para tus Meta Quest"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

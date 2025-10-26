<script setup lang="ts">
import { bannerImagesList } from "~/constants/bannerImageList";
import Accesories from "~/components/Body/Accessories/Accessories.vue";
import MetaQuest from "~/components/Body/Visors/MetaQuest.vue";
import Banner from "~/components/Body/Banner/Banner.vue";
import { visors } from "~/constants/visors";
import Rayban from "~/components/Body/Visors/Rayban.vue";

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

const metaQuestVisors = computed(() => {
  return visors.filter((visor) =>
    visor.name.toLowerCase().includes("meta quest")
  );
});

const raybanVisors = computed(() => {
  return visors.filter((visor) => visor.name.toLowerCase().includes("ray-ban"));
});
</script>

<template>
  <NuxtLayout name="default-layout">
    <!-- Hero Banner Section -->
    <section class="w-full">
      <UContainer class="px-4 sm:px-6 lg:px-8">
        <div class="py-6 sm:py-8 lg:py-12">
          <Banner :data-images="bannerImagesList" :start-index="1" />
        </div>
      </UContainer>
    </section>

    <!-- Meta Quest Visors Section -->
    <section class="w-full">
      <UContainer class="px-4 sm:px-6 lg:px-8">
        <div class="py-8 sm:py-12 lg:py-16">
          <div class="mb-8 sm:mb-10">
            <div
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4"
            >
              <UIcon name="i-lucide-glasses" class="w-4 h-4 text-blue-400" />
              <span class="text-xs font-medium text-blue-300">Visores VR</span>
            </div>
            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
            >
              Los mejores visores del mercado
            </h1>
            <div
              class="flex items-center gap-2 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl"
            >
              <UIcon
                name="i-lucide-gift"
                class="w-5 h-5 text-yellow-400 flex-shrink-0"
              />
              <p class="text-base sm:text-lg text-gray-300">
                Con la compra de cualquier visor... ¡Obtienes
                <span class="font-bold text-yellow-400">30€</span> para gastar
                en la tienda de Meta!
              </p>
            </div>
          </div>

          <MetaQuest :visors="metaQuestVisors" />
        </div>
      </UContainer>
    </section>

    <!-- Divider -->
    <div
      class="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"
    ></div>

    <!-- Ray-Ban Section -->
    <section class="w-full">
      <UContainer class="px-4 sm:px-6 lg:px-8">
        <div class="py-8 sm:py-12 lg:py-16">
          <div class="mb-8 sm:mb-10">
            <div
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4"
            >
              <UIcon name="i-lucide-sparkles" class="w-4 h-4 text-purple-400" />
              <span class="text-xs font-medium text-purple-300"
                >Smart Glasses</span
              >
            </div>
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
            >
              Ray-Ban Meta Smart Glasses
            </h2>
            <p class="text-base sm:text-lg text-gray-400">
              Gafas inteligentes con IA incorporada
            </p>
          </div>

          <Rayban :visors="raybanVisors" />
        </div>
      </UContainer>
    </section>

    <!-- Divider -->
    <div
      class="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"
    ></div>

    <!-- Accessories Section -->
    <section class="w-full pb-20 sm:pb-16">
      <UContainer class="px-4 sm:px-6 lg:px-8">
        <div class="py-8 sm:py-12 lg:py-16">
          <div class="mb-8 sm:mb-10">
            <div
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full mb-4"
            >
              <UIcon
                name="i-lucide-shopping-bag"
                class="w-4 h-4 text-green-400"
              />
              <span class="text-xs font-medium text-green-300"
                >Accesorios Premium</span
              >
            </div>
            <h2
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
            >
              Accesorios VR
            </h2>
            <p class="text-base sm:text-lg text-gray-400">
              Los mejores accesorios para tus Meta Quest
            </p>
          </div>

          <Accesories />
        </div>
      </UContainer>
    </section>
  </NuxtLayout>
</template>

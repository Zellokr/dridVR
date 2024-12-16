<script setup lang="ts">
import { bannerImagesList } from "~/constants/bannerImageList";
import Accesories from "~/components/Body/Accesories/Accesories.vue";
import Banner from "~/components/Body/Banner/Banner.vue";
import visors from "~/constants/visors.json";
</script>

<template>
  <NuxtLayout name="default-layout">
    <ScrollReveal>
      <div class="pb-14">
        <div
          class="md:container grid grid-flow-row-dense grid-cols-4 grid-rows-auto gap-4 space-y-8 mx-6"
        >
          <div class="col-span-12 row-start-1">
            <Banner :data-images="bannerImagesList" :start-index="1" />
          </div>
          <div class="col-span-12 row-start-2">
            <TitleContent
              title="Los mejores visores del mercado"
              class="flex flex-col gap-y-2"
            >
              <template #subtitle>
                Con la compra de cualquier visor... ¡Obtienes
                <span class="text-yellow-400">60€</span> para gastar en la
                tienda de Meta!
              </template>
            </TitleContent>
            <CustomGallery :info="visors" :initial-slide="1" />
          </div>
          <div class="col-span-12 row-start-3">
            <Accesories />
          </div>
        </div>
      </div>
    </ScrollReveal>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ContentGameList from "~/components/ContentGame/ContentGame.vue";
import Features from "~/components/Body/Features/Features.vue";
import { bannerImagesList } from "~/constants/bannerImageList";
import Banner from "~/components/Body/Banner/Banner.vue";

const searchTerm = ref("");
const hasVideo = ref(false);
const hasCrossbuy = ref(false);
const hasHaptic = ref(false);
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
        <div class="col-span-12 row-start-2">
          <Features />
        </div>
        <div class="col-span-12 row-start-3 rounded-md sticky top-0 z-20">
          <Filters
            v-model:searchTerm="searchTerm"
            v-model:hasVideo="hasVideo"
            v-model:hasCrossbuy="hasCrossbuy"
            v-model:hasHaptic="hasHaptic"
          />
        </div>
        <div class="col-span-12 row-start-4">
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

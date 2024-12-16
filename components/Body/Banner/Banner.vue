<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import type { BannerProps } from "~/components/Body/Banner/types";
import Autoplay from "embla-carousel-autoplay";
import { handleContent } from "~/utils/handleContent";

const props = withDefaults(defineProps<BannerProps>(), {
  orientation: "horizontal",
  displayName: false,
  startIndex: 0,
});

import type { EmblaPluginType, EmblaOptionsType } from "embla-carousel";

const opts: EmblaOptionsType = {
  loop: true,
  startIndex: props.startIndex,
  dragFree: false,
  watchDrag: false,
};

const plugin: EmblaPluginType = Autoplay({
  delay: 5000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
  jump: false,
});
</script>

<template>
  <Carousel
    class="w-full relative"
    :plugins="[plugin]"
    :opts="opts"
    @mouseenter="plugin.stop"
    @mouseleave="[plugin.reset(), plugin.play()]"
  >
    <CarouselContent>
      <CarouselItem v-for="(data, index) in dataImages" :key="index">
        <div class="flex flex-col group">
          <nuxt-img
            :src="data.image"
            :alt="data.altText"
            class="rounded-xl cursor-pointer"
            @click="handleContent(data)"
          />
          <!--          <img-->
          <!--            :src="data.image"-->
          <!--            :alt="data.altText"-->
          <!--            class="rounded-xl cursor-pointer"-->
          <!--            @click="handleContent(data)"-->
          <!--          />-->
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious
      v-if="dataImages.length > 1"
      class="absolute left-2 top-1/2 transform -translate-y-1/2 md:left-4 text-black"
    />
    <CarouselNext
      v-if="dataImages.length > 1"
      class="absolute right-2 top-1/2 transform -translate-y-1/2 md:right-4 text-black"
    />
  </Carousel>
</template>

<style scoped></style>

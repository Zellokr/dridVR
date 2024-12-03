<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import type { BannerProps } from "~/components/Banner/types";
import Autoplay from "embla-carousel-autoplay";
import { handleContent } from "~/utils/handleContent";

withDefaults(defineProps<BannerProps>(), {
  orientation: "horizontal",
  displayName: false,
});

import type { EmblaPluginType } from "embla-carousel";

const plugin: EmblaPluginType = Autoplay({
  delay: 5000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});
</script>

<template>
  <Carousel
    class="w-full relative"
    :plugins="[plugin]"
    @mouseenter="plugin.stop"
    @mouseleave="[plugin.reset(), plugin.play()]"
  >
    <CarouselContent>
      <CarouselItem v-for="(data, index) in dataImages" :key="index">
        <div class="flex flex-col group">
          <img
            :src="data.image"
            :alt="data.altText"
            class="w-auto object-cover text-2xl font-semibold rounded-xl cursor-pointer"
            @click="handleContent(data)"
            :sizes="`(max-width: 600px) 480px, (max-width: 1024px) 1024px, 1200px`"
            loading="lazy"
          />
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

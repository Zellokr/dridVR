<script setup lang="ts">
import type { BannerProps } from "~/components/Body/Banner/types";

const props = withDefaults(defineProps<BannerProps>(), {
  orientation: "horizontal",
  startIndex: 0,
});
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="props.dataImages"
    :start-index="props.startIndex"
    :orientation="props.orientation"
    :ui="{
      root: 'relative w-full',
      viewport: 'overflow-hidden',
      container: 'flex -ml-4',
      item: 'min-w-0 shrink-0 grow-0 basis-full pl-4',
      prev: 'absolute start-4 top-1/2 -translate-y-1/2 z-10 bg-black cursor-pointer hover:bg-gray-800',
      next: 'absolute end-4 top-1/2 -translate-y-1/2 z-10 bg-black cursor-pointer hover:bg-gray-800',
    }"
    loop
    arrows
    :prev="{
      color: 'neutral',
      variant: 'solid',
      size: 'lg',
      square: true,
    }"
    :next="{
      color: 'neutral',
      variant: 'solid',
      size: 'lg',
      square: true,
    }"
    :autoplay="{
      delay: 5000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }"
    class="w-full"
  >
    <a
      :href="item.url"
      :target="item.url!.startsWith('http') ? '_blank' : '_self'"
      class="flex flex-col group w-full"
    >
      <img
        :src="item.image"
        :alt="item.altText"
        class="rounded-xl cursor-pointer object-cover w-full"
      />
    </a>
  </UCarousel>
</template>

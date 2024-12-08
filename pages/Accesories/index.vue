<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import test from "~/constants/visors.json";

const config = {
  itemsToShow: 4,
  wrapAround: true,
  transition: 500,
};
</script>

<template>
  <div class="min-h-dvh bg-gray-700 flex justify-center items-center">
    <ClientOnly>
      <div class="w-full max-w-screen-lg">
        <Carousel v-bind="config">
          <Slide v-for="(item, index) in test" :key="index">
            <div
              class="h-auto w-96 flex flex-col items-center justify-center space-y-4"
            >
              <!-- Imagen -->
              <img
                :src="item.img_link"
                alt="Carousel image"
                class="h-72 w-full object-cover rounded-lg shadow-lg"
              />
              <!-- Texto debajo de la imagen -->
              <span class="text-white text-sm text-center">
                {{ item.caption || `Slide ${index + 1}` }}
              </span>
            </div>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </ClientOnly>
  </div>
</template>

<style>
.carousel {
  width: 100%;
}

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 5000px;
  display: flex;
}

.carousel__icon {
  background-color: #8a8a8a;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.2;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 0.4;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide.carousel__slide--next {
  opacity: 0.4;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}
</style>

<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const { isMobile, isDesktop } = useDevice();

type dataCard = {
  name: string;
  affiliate_link: string;
  img_link: string;
};

type CardAccesoryProps = {
  info: dataCard[];
  initialSlide?: number;
};

const props = withDefaults(defineProps<CardAccesoryProps>(), {
  initialSlide: 2,
});

const displayCards = computed(() => {
  if (isMobile) return 1;
  if (isDesktop) return 4;
});

const config = {
  itemsToShow: displayCards.value,
  wrapAround: true,
  transition: 500,
  initialSlide: props.initialSlide,
};
</script>

<template>
  <ClientOnly>
    <div>
      <Carousel v-bind="config">
        <Slide v-for="(item, index) in info" :key="index">
          <div
            class="h-auto w-96 flex flex-col items-center justify-center space-y-4"
          >
            <!-- Imagen -->
            <a
              :href="item.affiliate_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                :src="item.img_link"
                alt="Carousel image"
                class="h-72 w-full object-cover shadow-lg"
              />
            </a>
            <!-- Texto debajo de la imagen -->
            <span class="text-white text-lg text-center font-bold">
              {{ item.name }}
            </span>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </ClientOnly>
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
  //background-color: #8a8a8a;
  background-color: white;
  border-radius: 25%;
  transform: translate(25rem);
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.2;
  transform: rotateY(-10deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(10deg) scale(0.9);
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

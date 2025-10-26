<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface ScrollRevealProps {
  threshold?: number;
  delay?: number;
  duration?: number;
}

const props = withDefaults(defineProps<ScrollRevealProps>(), {
  threshold: 0.15,
  delay: 0,
  duration: 700,
});

const element = ref<HTMLElement | null>(null);
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;

const onIntersect = (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0];
  if (entry && entry.isIntersecting && !isVisible.value) {
    isVisible.value = true;
    // Desconectar el observer una vez que el elemento es visible
    observer?.disconnect();
  }
};

onMounted(() => {
  if (element.value) {
    observer = new IntersectionObserver(onIntersect, {
      threshold: props.threshold,
      rootMargin: "0px 0px -50px 0px",
    });
    observer.observe(element.value);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div
    ref="element"
    :class="[
      'transition-all ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    ]"
    :style="{
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
    }"
  >
    <slot />
  </div>
</template>

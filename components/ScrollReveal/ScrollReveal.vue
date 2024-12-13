<template>
  <div
    ref="element"
    :class="[
      'transition-opacity duration-1000 ease-in-out',
      { 'opacity-0': !isVisible, 'opacity-100': isVisible },
    ]"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const element = ref(null);
const isVisible = ref(false);

const onIntersect = (entries) => {
  if (entries[0].isIntersecting) {
    isVisible.value = true;
  }
};

onMounted(() => {
  const observer = new IntersectionObserver(onIntersect, { threshold: 0.2 });
  observer.observe(element.value);

  // Cleanup
  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

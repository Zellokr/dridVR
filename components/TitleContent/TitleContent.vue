<script setup lang="ts">
type TitleContentProps = {
  id?: string;
  title: string;
  subtitle?: string;
};

defineProps<TitleContentProps>();
</script>

<template>
  <!-- Título de juegos -->
  <div :id="id">
    <h1
      class="text-white text-4xl md:text-5xl font-bold text-center md:text-left"
    >
      {{ title }}
    </h1>

    <h2
      v-if="subtitle?.length !== 0"
      class="text-white text-lg md:text-2xl mb-4"
    >
      <slot name="subtitle" />
    </h2>
  </div>
</template>

<style scoped></style>

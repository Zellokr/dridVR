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
  <div :id="id" class="flex flex-col">
    <span class="text-white text-3xl md:text-4xl font-bold">
      {{ title }}
    </span>

    <span
      v-if="subtitle?.length !== 0"
      class="text-white text-lg md:text-2xl mb-4"
    >
      <slot name="subtitle" />
    </span>
  </div>
</template>

<style scoped></style>

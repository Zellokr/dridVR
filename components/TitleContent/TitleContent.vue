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
  <div
    :id="id"
    class="flex flex-col gap-y-4 w-full justify-center items-center my-8"
  >
    <h1 class="text-white text-4xl md:text-5xl font-bold px-4 text-center">
      {{ title }}
    </h1>

    <h2 v-if="subtitle" class="text-white text-lg px-16 md:text-2xl mb-4">
      <slot name="subtitle" />
    </h2>
  </div>
</template>

<style scoped></style>

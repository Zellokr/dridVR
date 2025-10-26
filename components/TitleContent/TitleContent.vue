<script setup lang="ts">
type TitleContentProps = {
  id?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
};

const props = withDefaults(defineProps<TitleContentProps>(), {
  align: "left",
});

const alignmentClass = computed(() => {
  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  return alignments[props.align];
});
</script>

<template>
  <div :id="id" :class="['flex flex-col gap-y-2', alignmentClass]">
    <h2
      class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight"
    >
      {{ title }}
    </h2>
    <div
      v-if="subtitle || $slots.subtitle"
      class="text-base sm:text-lg text-gray-400"
    >
      <slot name="subtitle">
        {{ subtitle }}
      </slot>
    </div>
  </div>
</template>

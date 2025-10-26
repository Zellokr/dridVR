<script setup lang="ts">
import Form from "./Form/Form.vue";

defineProps<{
  displayModal: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <UModal :model-value="displayModal" @update:model-value="emit('close')">
    <UCard>
      <template #header>
        <h3 class="text-xl font-semibold">¡Suscríbete a nuestra newsletter!</h3>
        <p class="text-sm text-muted mt-1">
          Mantente actualizado de las últimas novedades sobre VR.
        </p>
      </template>

      <Form />
    </UCard>
  </UModal>
</template>

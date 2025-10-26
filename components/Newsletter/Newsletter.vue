<script setup lang="ts">
import Form from "./Form/Form.vue";

const props = defineProps<{
  displayModal: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const isOpen = computed({
  get: () => props.displayModal,
  set: (value: boolean) => {
    if (!value) {
      emit("close");
    }
  },
});

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click.self="handleClose"
    >
      <div
        class="absolute inset-0 bg-black/80 backdrop-blur-sm"
        @click="handleClose"
      ></div>

      <div
        class="relative z-50 w-full max-w-md bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden"
        @click.stop
      >
        <div class="p-6 pb-4 border-b border-gray-700">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20"
              >
                <UIcon name="i-lucide-mail" class="w-5 h-5 text-blue-400" />
              </div>
              <h3 class="text-xl font-bold text-white">
                ¡Suscríbete a nuestra newsletter!
              </h3>
            </div>
            <button
              @click="handleClose"
              class="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700"
              aria-label="Cerrar"
            >
              <UIcon name="i-lucide-x" class="w-5 h-5" />
            </button>
          </div>
          <p class="text-sm text-gray-400">
            Mantente actualizado de las últimas novedades sobre VR, ofertas
            exclusivas y lanzamientos de juegos.
          </p>
        </div>

        <div class="p-6">
          <div class="space-y-4">
            <div
              class="flex items-center gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20"
            >
              <UIcon
                name="i-lucide-sparkles"
                class="w-5 h-5 text-blue-400 flex-shrink-0"
              />
              <span class="text-sm font-medium text-white"
                >Newsletter exclusiva de VR</span
              >
            </div>
            <Form @success="handleClose" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

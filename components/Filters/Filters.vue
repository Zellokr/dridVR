<script setup lang="ts">
import { ref, computed } from "vue";

// Estado de los filtros y búsqueda
const searchTerm = ref("");
const hasVideo = ref(false);
const hasCrossbuy = ref(false);
const hasHaptic = ref(false);

// Emisión de eventos utilizando defineEmits
const emit = defineEmits<{
  (event: "update:searchTerm", value: string): void;
  (event: "update:hasVideo", value: boolean): void;
  (event: "update:hasCrossbuy", value: boolean): void;
  (event: "update:hasHaptic", value: boolean): void;
}>();

// Función para resetear filtros
const deactivateFilters = () => {
  hasVideo.value = false;
  hasCrossbuy.value = false;
  hasHaptic.value = false;
  emit("update:hasVideo", hasVideo.value);
  emit("update:hasCrossbuy", hasCrossbuy.value);
  emit("update:hasHaptic", hasHaptic.value);
};

// Eliminar el texto al activar los filtros
const removeTextWhenClickSwitch = () => {
  if (hasVideo.value || hasCrossbuy.value || hasHaptic.value) {
    searchTerm.value = "";
    emit("update:searchTerm", searchTerm.value);
  }
};

// Computados para emitir los valores cuando cambian
const computedSearchTerm = computed(() => {
  return searchTerm.value;
});
const computedHasVideo = computed(() => {
  return hasVideo.value;
});
const computedHasCrossbuy = computed(() => {
  return hasCrossbuy.value;
});
const computedHasHaptic = computed(() => {
  return hasHaptic.value;
});

// Emisión de los cambios de los filtros de manera reactiva
watch(
  [
    computedSearchTerm,
    computedHasVideo,
    computedHasCrossbuy,
    computedHasHaptic,
  ],
  ([newSearchTerm, newHasVideo, newHasCrossbuy, newHasHaptic]) => {
    emit("update:searchTerm", newSearchTerm);
    emit("update:hasVideo", newHasVideo);
    emit("update:hasCrossbuy", newHasCrossbuy);
    emit("update:hasHaptic", newHasHaptic);
  },
);
</script>

<template>
  <div
    class="bg-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mx-6 md:mx-0 border border-slate-700 gap-x-8"
  >
    <!-- Input de búsqueda -->
    <div class="">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Busca tu juego"
        @click="deactivateFilters"
        class="bg-gray-700 text-white p-2 rounded-lg w-full"
      />
    </div>

    <!-- Filtros -->
    <div class="flex justify-evenly">
      <!-- Filtro Youtube -->
      <div class="">
        <label for="filterYoutube" class="text-white flex items-center">
          <span class="mr-2">Youtube</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            class="w-5 h-5 text-white"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.54 6.42a2.42 2.42 0 00-2.38-2.42H3.84A2.42 2.42 0 001.46 6.42v11.16a2.42 2.42 0 002.38 2.42h16.32a2.42 2.42 0 002.38-2.42zM9.5 16.57V7.43L16 12z"
            />
          </svg>
        </label>
        <div
          class="toggle-label w-12 h-6 rounded-full relative cursor-pointer transition-colors"
          :class="hasVideo ? 'bg-blue-500' : 'bg-gray-300'"
          @click="
            hasVideo = !hasVideo;
            removeTextWhenClickSwitch();
          "
        >
          <div
            class="dot w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-transform"
            :class="hasVideo ? 'transform translate-x-6' : ''"
          ></div>
        </div>
      </div>

      <!-- Filtro CrossBuy -->
      <div class="">
        <label for="filterCrossbuy" class="text-white flex items-center">
          <span class="mr-2">CrossBuy</span>
          <MdiIcon icon="mdiSync" class="text-white w-4 h-4" />
        </label>
        <div
          class="toggle-label w-12 h-6 rounded-full relative cursor-pointer transition-colors"
          :class="hasCrossbuy ? 'bg-blue-500' : 'bg-gray-300'"
          @click="
            hasCrossbuy = !hasCrossbuy;
            removeTextWhenClickSwitch();
          "
        >
          <div
            class="dot w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-transform"
            :class="hasCrossbuy ? 'transform translate-x-6' : ''"
          ></div>
        </div>
      </div>

      <!-- Filtro Haptic -->
      <div class="">
        <label for="filterVibrate" class="text-white flex items-center">
          <span class="mr-2">bHaptics</span>
          <MdiIcon icon="mdiVibrate" class="text-white w-4 h-4" />
        </label>
        <div
          class="toggle-label w-12 h-6 rounded-full relative cursor-pointer transition-colors"
          :class="hasHaptic ? 'bg-blue-500' : 'bg-gray-300'"
          @click="
            hasHaptic = !hasHaptic;
            removeTextWhenClickSwitch();
          "
        >
          <div
            class="dot w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-transform"
            :class="hasHaptic ? 'transform translate-x-6' : ''"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

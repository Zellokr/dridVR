<script setup lang="ts">
import { ref } from 'vue';

const searchTerm = ref('');
const hasVideo = ref(false)
const hasCrossbuy = ref(false)

// Definir los eventos y sus tipos usando `defineEmits`
const emit = defineEmits<{
  (event: 'update:searchTerm', value: string): void;
  (event: 'update:hasVideo', value: boolean): void;
  (event: 'update:hasCrossbuy', value: boolean): void;
}>();

const deactivateFilters = () => {
  hasVideo.value = false
  hasCrossbuy.value = false
  emit('update:hasVideo', hasVideo.value)
  emit('update:hasCrossbuy', hasCrossbuy.value)
}

// Emitir los valores cuando cambian
watch(searchTerm, (newVal) => emit('update:searchTerm', newVal));
watch(hasVideo, (newVal) => emit('update:hasVideo', newVal));
watch(hasCrossbuy, (newVal) => emit('update:hasCrossbuy', newVal));

</script>

<template>
  <div class="flex  items-center justify-center flex-wrap gap-4">
    <!-- Input de Búsqueda -->
    <div class="flex justify-center items-center">
      <input
          v-model="searchTerm"
          type="text"
          placeholder="Filtrar..."
          @click="deactivateFilters"
          class="bg-gray-700 text-white p-2 rounded-lg w-full"
      />
    </div>

    <div class="flex items-center md:justify-around gap-x-4">
      <!-- Filtro Youtube -->
      <div class="flex justify-center items-center w-full ">
        <div class="flex items-center">
          <label for="filterYoutube" class="text-white mr-2 flex items-center">
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
          <input
              id="youtube"
              type="checkbox"
              v-model="hasVideo"
              class="toggle-checkbox hidden"
          />
          <div
              class="toggle-label w-12 h-6 rounded-full relative cursor-pointer transition-colors"
              :class="hasVideo ? 'bg-blue-500' : 'bg-gray-300'"
              @click="hasVideo = !hasVideo; hasCrossbuy = false; searchTerm = ''"
          >
            <div
                class="dot w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-transform"
                :class="hasVideo ? 'transform translate-x-6' : ''"
            />
          </div>
        </div>
      </div>

      <!-- Filtro Crossbuy -->
      <div class="flex justify-center items-center w-full ">
        <div class="flex items-center">
          <label for="crossbuy" class="text-white mr-2 flex items-center">
            <span class="mr-2">CrossBuy</span>
            <MdiIcon icon="mdiSync" class="text-white w-4 h-4" />
          </label>
          <input
              id="filterCrossbuy"
              type="checkbox"
              v-model="hasCrossbuy"
              class="toggle-checkbox hidden"
          />
          <div
              class="toggle-label w-12 h-6 rounded-full relative cursor-pointer transition-colors"
              :class="hasCrossbuy ? 'bg-blue-500' : 'bg-gray-300'"
              @click="hasCrossbuy = !hasCrossbuy; hasVideo = false; searchTerm = ''"
          >
            <div
                class="dot w-6 h-6 bg-white rounded-full absolute top-0 left-0 transition-transform"
                :class="hasCrossbuy ? 'transform translate-x-6' : ''"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
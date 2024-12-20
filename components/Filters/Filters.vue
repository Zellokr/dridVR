<script setup lang="ts">
import { ref, computed } from "vue";
import { redirectToContent } from "~/utils/handleContent";
const { isMobile } = useDevice();

const searchTerm = ref("");
const hasVideo = ref(false);
const hasCrossbuy = ref(false);
const hasHaptic = ref(false);

const emit = defineEmits<{
  (event: "update:searchTerm", value: string): void;
  (event: "update:hasVideo", value: boolean): void;
  (event: "update:hasCrossbuy", value: boolean): void;
  (event: "update:hasHaptic", value: boolean): void;
}>();

const deactivateFilters = () => {
  hasVideo.value = false;
  hasCrossbuy.value = false;
  hasHaptic.value = false;
  emit("update:hasVideo", hasVideo.value);
  emit("update:hasCrossbuy", hasCrossbuy.value);
  emit("update:hasHaptic", hasHaptic.value);
  if (isMobile) redirectToContent("allgames");
};

const removeTextWhenClickSwitch = () => {
  if (hasVideo.value || hasCrossbuy.value || hasHaptic.value) {
    searchTerm.value = "";
    emit("update:searchTerm", searchTerm.value);
    if (isMobile) redirectToContent("allgames");
  }
};

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
    class="bg-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-slate-700 fixed bottom-0 left-0 w-full z-20 gap-x-8 md:relative md:mx-0 rounded-t-lg md:rounded-t-none"
  >
    <div class="flex items-center bg-gray-700 text-white rounded-lg w-full">
      <MdiIcon icon="mdiMagnify" class="text-white w-5 h-5 ml-3" />
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Busca tu juego"
        @click="deactivateFilters"
        class="bg-transparent text-white p-2 pl-3 w-full focus:outline-none"
      />
    </div>
    <div
      class="flex justify-evenly gap-x-8 md:gap-x-0 md:justify-evenly w-full"
    >
      <div class="flex flex-col">
        <label for="filterYoutube" class="text-white flex items-center">
          <span class="mr-2">Youtube</span>
          <SvgoYoutubeIcon class="scale-125 text-red-600"></SvgoYoutubeIcon>
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
      <div class="flex flex-col">
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
      <div class="flex flex-col">
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

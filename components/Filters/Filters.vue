<script setup lang="ts">
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
  if (isMobile) {
    const element = document.getElementById("allgames");
    element?.scrollIntoView({ behavior: "smooth" });
  }
  hasVideo.value = false;
  hasCrossbuy.value = false;
  hasHaptic.value = false;
  emit("update:hasVideo", hasVideo.value);
  emit("update:hasCrossbuy", hasCrossbuy.value);
  emit("update:hasHaptic", hasHaptic.value);
};

const removeTextWhenClickSwitch = () => {
  if (hasVideo.value || hasCrossbuy.value || hasHaptic.value) {
    searchTerm.value = "";
    emit("update:searchTerm", searchTerm.value);
    if (isMobile) {
      const element = document.getElementById("allgames");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }
};

watch(searchTerm, (newValue: string) => {
  emit("update:searchTerm", newValue);
});

watch(hasVideo, (newValue: boolean) => {
  emit("update:hasVideo", newValue);
  removeTextWhenClickSwitch();
});

watch(hasCrossbuy, (newValue: boolean) => {
  emit("update:hasCrossbuy", newValue);
  removeTextWhenClickSwitch();
});

watch(hasHaptic, (newValue: boolean) => {
  emit("update:hasHaptic", newValue);
  removeTextWhenClickSwitch();
});
</script>

<template>
  <div
    class="bg-gray-800/95 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-slate-700 fixed bottom-0 left-0 w-full z-20 gap-x-8 md:relative md:mx-0 rounded-t-lg md:rounded-lg shadow-xl"
  >
    <!-- Search Input -->
    <UInput
      v-model="searchTerm"
      icon="i-lucide-search"
      placeholder="Busca tu juego..."
      size="lg"
      color="primary"
      @focus="deactivateFilters"
      :ui="{
        base: 'bg-gray-700 text-white placeholder-gray-400 border-gray-600',
        icon: { base: 'text-gray-400' },
      }"
    />

    <!-- Filters -->
    <div class="flex justify-evenly gap-x-4 md:gap-x-6 w-full">
      <!-- YouTube Filter -->
      <div class="flex flex-col items-center gap-y-2">
        <div class="flex items-center gap-x-1.5 text-white text-sm">
          <span>Youtube</span>
          <SvgoYoutubeIcon class="w-5 h-5 text-red-600" />
        </div>
        <USwitch v-model="hasVideo" color="primary" size="md" />
      </div>

      <!-- CrossBuy Filter -->
      <div class="flex flex-col items-center gap-y-2">
        <div class="flex items-center gap-x-1.5 text-white text-sm">
          <span>CrossBuy</span>
          <MdiIcon icon="mdiSync" class="w-4 h-4 text-white" />
        </div>
        <USwitch v-model="hasCrossbuy" color="primary" size="md" />
      </div>

      <!-- bHaptics Filter -->
      <div class="flex flex-col items-center gap-y-2">
        <div class="flex items-center gap-x-1.5 text-white text-sm">
          <span>bHaptics</span>
          <MdiIcon icon="mdiVibrate" class="w-4 h-4 text-white" />
        </div>
        <USwitch v-model="hasHaptic" color="primary" size="md" />
      </div>
    </div>
  </div>
</template>

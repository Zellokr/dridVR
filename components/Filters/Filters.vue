<script setup lang="ts">
const { isMobile } = useDevice();

const searchTerm = ref("");
const hasVideo = ref(false);
const hasCrossbuy = ref(false);
const hasHaptic = ref(false);
const isExpanded = ref(false);

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
  <!-- Mobile Sticky Bottom / Desktop Normal -->
  <div
    class="lg:relative fixed lg:static bottom-0 left-0 right-0 z-50 lg:z-auto lg:bg-gradient-to-br lg:from-gray-800 lg:to-gray-900 bg-gray-900/98 backdrop-blur-xl border-t-2 lg:border-t-0 lg:border lg:border-gray-700/50 border-gray-600/70 lg:rounded-2xl shadow-2xl lg:shadow-2xl shadow-black/60 overflow-hidden max-h-[85vh] lg:max-h-none overflow-y-auto lg:overflow-visible"
  >
    <!-- Decorative gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"
    ></div>

    <div class="relative p-3 sm:p-4 lg:p-7">
      <!-- Mobile: Compact Header with Toggle -->
      <div class="lg:hidden">
        <button
          @click="isExpanded = !isExpanded"
          class="w-full flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800 transition-colors"
        >
          <div class="flex items-center gap-2">
            <UIcon
              name="i-lucide-sliders-horizontal"
              class="w-5 h-5 text-blue-400"
            />
            <span class="text-sm font-semibold text-white">Filtros</span>
            <div
              v-if="hasVideo || hasCrossbuy || hasHaptic"
              class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-xs font-bold text-white"
            >
              {{ [hasVideo, hasCrossbuy, hasHaptic].filter(Boolean).length }}
            </div>
          </div>
          <UIcon
            :name="isExpanded ? 'i-lucide-chevron-down' : 'i-lucide-chevron-up'"
            class="w-5 h-5 text-gray-400 transition-transform"
          />
        </button>
      </div>

      <!-- Filters Content -->
      <div :class="['lg:block', isExpanded ? 'block mt-3' : 'hidden']">
        <!-- Search Section -->
        <div class="mb-4 lg:mb-6">
          <label class="hidden lg:block text-sm font-medium text-gray-300 mb-3">
            <UIcon name="i-lucide-search" class="inline w-4 h-4 mr-1.5" />
            Buscar juegos
          </label>
          <div class="relative group">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10"
            >
              <UIcon
                name="i-lucide-gamepad-2"
                class="w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-300"
              />
            </div>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Busca por nombre del juego..."
              class="w-full pl-12 pr-12 py-3.5 bg-gray-900/70 border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 hover:border-gray-600 hover:bg-gray-900"
              @focus="deactivateFilters"
            />
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              leave-active-class="transition-all duration-150 ease-in"
              enter-from-class="opacity-0 scale-90"
              leave-to-class="opacity-0 scale-90"
            >
              <button
                v-if="searchTerm.length > 0"
                @click="
                  searchTerm = '';
                  emit('update:searchTerm', searchTerm);
                "
                class="absolute inset-y-0 right-3 flex items-center justify-center w-8 h-8 my-auto text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                aria-label="Limpiar búsqueda"
              >
                <UIcon name="i-lucide-x" class="w-4 h-4" />
              </button>
            </Transition>
          </div>
        </div>

        <!-- Filters Section -->
        <div class="space-y-4">
          <div class="hidden lg:flex items-center gap-2 mb-4">
            <div
              class="flex items-center justify-center w-8 h-8 bg-blue-500/10 rounded-lg"
            >
              <UIcon
                name="i-lucide-sliders-horizontal"
                class="w-4 h-4 text-blue-400"
              />
            </div>
            <h3 class="text-base font-semibold text-white">
              Filtros avanzados
            </h3>
          </div>

          <!-- Filter Pills Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <!-- YouTube Filter -->
            <button
              @click="
                hasVideo = !hasVideo;
                emit('update:hasVideo', hasVideo);
                removeTextWhenClickSwitch();
              "
              :class="[
                'group relative overflow-hidden rounded-xl p-4 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]',
                hasVideo
                  ? 'bg-gradient-to-br from-red-500/20 to-red-600/10 border-2 border-red-500/50 shadow-lg shadow-red-500/20'
                  : 'bg-gray-800/50 border-2 border-gray-700/50 hover:border-red-500/30 hover:bg-gray-800/70',
              ]"
            >
              <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="flex items-center gap-2">
                  <SvgoYoutubeIcon
                    :class="[
                      'w-5 h-5 transition-colors',
                      hasVideo ? 'text-red-400' : 'text-red-500',
                    ]"
                  />
                  <span
                    :class="[
                      'text-sm font-semibold transition-colors',
                      hasVideo ? 'text-red-300' : 'text-gray-400',
                    ]"
                    >YouTube</span
                  >
                </div>

                <!-- Custom Toggle -->
                <div class="flex items-center gap-2">
                  <div
                    :class="[
                      'relative w-11 h-6 rounded-full transition-colors duration-300',
                      hasVideo ? 'bg-red-500' : 'bg-gray-700',
                    ]"
                  >
                    <div
                      :class="[
                        'absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300',
                        hasVideo ? 'translate-x-5' : 'translate-x-0',
                      ]"
                    ></div>
                  </div>
                </div>
              </div>
            </button>

            <!-- CrossBuy Filter -->
            <button
              @click="
                hasCrossbuy = !hasCrossbuy;
                emit('update:hasCrossbuy', hasCrossbuy);
                removeTextWhenClickSwitch();
              "
              :class="[
                'group relative overflow-hidden rounded-xl p-4 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]',
                hasCrossbuy
                  ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20'
                  : 'bg-gray-800/50 border-2 border-gray-700/50 hover:border-blue-500/30 hover:bg-gray-800/70',
              ]"
            >
              <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="flex items-center gap-2">
                  <MdiIcon
                    icon="mdiSync"
                    :class="[
                      'w-5 h-5 transition-colors',
                      hasCrossbuy ? 'text-blue-400' : 'text-gray-400',
                    ]"
                  />
                  <span
                    :class="[
                      'text-sm font-semibold transition-colors',
                      hasCrossbuy ? 'text-blue-300' : 'text-gray-400',
                    ]"
                    >CrossBuy</span
                  >
                </div>

                <!-- Custom Toggle -->
                <div class="flex items-center gap-2">
                  <div
                    :class="[
                      'relative w-11 h-6 rounded-full transition-colors duration-300',
                      hasCrossbuy ? 'bg-blue-500' : 'bg-gray-700',
                    ]"
                  >
                    <div
                      :class="[
                        'absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300',
                        hasCrossbuy ? 'translate-x-5' : 'translate-x-0',
                      ]"
                    ></div>
                  </div>
                </div>
              </div>
            </button>

            <!-- bHaptics Filter -->
            <button
              @click="
                hasHaptic = !hasHaptic;
                emit('update:hasHaptic', hasHaptic);
                removeTextWhenClickSwitch();
              "
              :class="[
                'group relative overflow-hidden rounded-xl p-4 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]',
                hasHaptic
                  ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20'
                  : 'bg-gray-800/50 border-2 border-gray-700/50 hover:border-purple-500/30 hover:bg-gray-800/70',
              ]"
            >
              <div class="relative z-10 flex flex-col items-center gap-2">
                <div class="flex items-center gap-2">
                  <MdiIcon
                    icon="mdiVibrate"
                    :class="[
                      'w-5 h-5 transition-colors',
                      hasHaptic ? 'text-purple-400' : 'text-gray-400',
                    ]"
                  />
                  <span
                    :class="[
                      'text-sm font-semibold transition-colors',
                      hasHaptic ? 'text-purple-300' : 'text-gray-400',
                    ]"
                    >bHaptics</span
                  >
                </div>

                <!-- Custom Toggle -->
                <div class="flex items-center gap-2">
                  <div
                    :class="[
                      'relative w-11 h-6 rounded-full transition-colors duration-300',
                      hasHaptic ? 'bg-purple-500' : 'bg-gray-700',
                    ]"
                  >
                    <div
                      :class="[
                        'absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300',
                        hasHaptic ? 'translate-x-5' : 'translate-x-0',
                      ]"
                    ></div>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <!-- End Filters Content -->

      <!-- Active Filters Banner -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-2"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="hasVideo || hasCrossbuy || hasHaptic"
          class="mt-5 p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/30 rounded-xl"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div
                class="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg flex-shrink-0"
              >
                <UIcon name="i-lucide-filter-x" class="w-4 h-4 text-blue-400" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-gray-400 mb-1">
                  Filtros activos
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-if="hasVideo"
                    class="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded-md text-xs font-medium text-red-300"
                  >
                    <SvgoYoutubeIcon class="w-3 h-3" />
                    YouTube
                  </span>
                  <span
                    v-if="hasCrossbuy"
                    class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-md text-xs font-medium text-blue-300"
                  >
                    <MdiIcon icon="mdiSync" class="w-3 h-3" />
                    CrossBuy
                  </span>
                  <span
                    v-if="hasHaptic"
                    class="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-md text-xs font-medium text-purple-300"
                  >
                    <MdiIcon icon="mdiVibrate" class="w-3 h-3" />
                    bHaptics
                  </span>
                </div>
              </div>
            </div>
            <button
              @click="deactivateFilters"
              class="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-500/50 rounded-lg text-sm font-medium text-blue-300 hover:text-blue-200 transition-all duration-200 flex-shrink-0"
            >
              <UIcon name="i-lucide-x" class="w-4 h-4" />
              <span class="hidden sm:inline">Limpiar</span>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

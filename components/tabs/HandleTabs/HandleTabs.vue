<script setup lang="ts">
import type { Tab } from "~/components/tabs/HandleTabs/types";

const { isMobile } = useDevice();

const props = defineProps<{
  tabs: Tab[];
  defaultValue: string;
}>();

const selectedTab = ref(props.defaultValue);
</script>

<template>
  <ClientOnly>
    <div class="w-full">
      <!-- Tabs Header -->
      <div
        class="flex items-center gap-2 border-b border-gray-700/50 mb-8 overflow-x-auto"
      >
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="selectedTab = tab.value"
          :class="[
            'relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base transition-all duration-300 hover:text-white whitespace-nowrap',
            selectedTab === tab.value ? 'text-white' : 'text-gray-400',
          ]"
        >
          <MdiIcon
            v-if="tab.icon && !isMobile"
            :icon="tab.icon"
            :class="[
              'w-5 h-5 transition-colors',
              selectedTab === tab.value ? 'text-blue-400' : 'text-gray-500',
            ]"
          />
          <span>{{ tab.label }}</span>

          <!-- Active indicator -->
          <div
            v-if="selectedTab === tab.value"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-full"
          ></div>
        </button>
      </div>

      <!-- Tabs Content -->
      <div class="py-4">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          v-show="selectedTab === tab.value"
        >
          <component :is="tab.component!" v-bind="tab.props!" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

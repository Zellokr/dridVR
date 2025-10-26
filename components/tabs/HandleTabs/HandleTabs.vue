<script setup lang="ts">
import type { Tab } from "~/components/tabs/HandleTabs/types";

const { isMobile } = useDevice();

defineProps<{
  tabs: Tab[];
  defaultValue: string;
}>();
</script>

<template>
  <client-only>
    <UTabs :default-value="defaultValue" :items="tabs" class="w-full">
      <template #default="{ item }">
        <div class="inline-flex items-center gap-x-4">
          <span class="text-sm md:text-lg">{{ item.label }}</span>

          <MdiIcon
            v-if="item.icon && !isMobile"
            :icon="item.icon"
            class="text-white w-6 h-6"
            preserve-aspect-ratio="xMaxYMax slice"
          />
        </div>
      </template>

      <template #item="{ item }">
        <div class="p-4 shadow-xl">
          <component :is="item.component!" v-bind="item.props!" />
        </div>
      </template>
    </UTabs>
  </client-only>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import type { Tab } from "~/components/tabs/HandleTabs/types";

const { isMobile } = useDevice();

defineProps<{
  tabs: Tab[];
  defaultValue: string;
}>();
</script>

<template>
  <client-only>
    <Tabs :default-value="defaultValue">
      <TabsList class="grid w-full lg:grid-cols-5 grid-cols-3 gap-x-1">
        <TabsTrigger v-for="tab in tabs" :key="tab.value" :value="tab.value">
          <div class="inline-flex items-center gap-x-4">
            <span class="text-sm md:text-lg">{{ tab.label }}</span>

            <MdiIcon
              preserve-aspect-ratio="xMaxYMax slice"
              v-if="tab.icon && !isMobile"
              :icon="tab.icon"
              class="text-white w-6 h-6"
            />
          </div>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="p-4 shadow-xl"
      >
        <component :is="tab.component!" v-bind="tab.props!" />
      </TabsContent>
    </Tabs>
  </client-only>
</template>

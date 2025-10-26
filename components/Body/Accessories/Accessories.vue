<script setup lang="ts">
import HandleTabs from "~/components/tabs/HandleTabs/HandleTabs.vue";
import AccessoryTab from "~/components/tabs/HandleTabs/AccessoryTab/AccessoryTab.vue";

import type { Tab } from "~/components/tabs/HandleTabs/types";
import { accessories } from "~/constants/accessories";

const wieldVrAccessories = computed(() => {
  return accessories.filter((item) => item.brand === "WieldVR");
});

const kiwiAccesories = computed(() => {
  return accessories.filter((item) => item.brand === "Kiwi design");
});

const tabs: Tab[] = [
  {
    value: "WieldVR",
    label: "WieldVR",
    component: AccessoryTab,
    props: { accessories: wieldVrAccessories.value },
  },
  {
    value: "Kiwi Design",
    label: "Kiwi Design",
    component: AccessoryTab,
    props: { accessories: kiwiAccesories.value },
  },
];
</script>

<template>
  <div v-if="tabs.length > 0" class="w-full">
    <HandleTabs :default-value="tabs[0]?.value || 'WieldVR'" :tabs="tabs" />
  </div>
</template>

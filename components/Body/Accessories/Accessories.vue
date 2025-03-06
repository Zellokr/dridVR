<script setup lang="ts">
import HandleTabs from "~/components/tabs/HandleTabs/HandleTabs.vue";
import type { Tab } from "~/components/tabs/HandleTabs/types";

import { accessories } from "~/constants/accessories";
import Content from "~/components/Tabs/HandleTabs/AccessoryTab/AccessoryTab.vue";

type AccessoriesProps = {
  title?: string;
  subtitle?: string;
};

defineProps<AccessoriesProps>();

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
    component: Content,
    props: { accessories: wieldVrAccessories.value },
  },
  {
    value: "Kiwi Design",
    label: "Kiwi Design",
    component: Content,
    props: { accessories: kiwiAccesories.value },
  },
];
</script>

<template>
  <div class="flex justify-start">
    <TitleContent :title="title!">
      <template v-if="subtitle" #subtitle>
        {{ subtitle }}
      </template>
    </TitleContent>
  </div>
  <HandleTabs :default-value="tabs[0].value" :tabs="tabs"> </HandleTabs>
</template>

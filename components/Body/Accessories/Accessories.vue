<script setup lang="ts">
import HandleTabs from "~/components/tabs/HandleTabs/HandleTabs.vue";
import type { Tab } from "~/components/tabs/HandleTabs/types";
import Kiwi from "~/components/tabs/HandleTabs/Kiwi/Kiwi.vue";
import Wield from "~/components/tabs/HandleTabs/Wield/Wield.vue";

type AccessoriesProps = {
  title?: string;
  subtitle?: string;
};

defineProps<AccessoriesProps>();

const tabs: Tab[] = [
  {
    value: "WieldVR",
    label: "WieldVR",
    component: Wield,
  },
  {
    value: "Kiwi Design",
    label: "Kiwi Design",
    component: Kiwi,
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

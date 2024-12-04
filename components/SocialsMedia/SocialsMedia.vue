<script setup lang="ts">
import { handleContent } from "~/utils/handleContent";
</script>

<template>
  <div class="flex space-x-3.5">
    <transition-group name="scale">
      <MdiIcon
        icon="mdiInstagram"
        class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
        @click="handleContent('https://www.youtube.com/@dridvr')"
      />
      <MdiIcon
        icon="mdiTwitter"
        class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
        @click="handleContent('https://twitter.com/DriDGG')"
      />
      <MdiIcon
        icon="mdiYoutube"
        class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
        @click="handleContent('https://www.youtube.com/@dridvr')"
      />
      <MdiIcon
        icon="mdiTwitch"
        class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
        @click="handleContent('https://www.twitch.tv/dridgg')"
      />
    </transition-group>
  </div>
</template>

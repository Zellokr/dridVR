<script setup lang="ts">
import { handleContent } from "~/utils/handleContent";
</script>

<template>
  <transition-group name="scale" tag="div" class="flex space-x-3.5">
    <MdiIcon
      key="instagram"
      icon="mdiInstagram"
      class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
      @click="handleContent('https://www.instagram.com/dridgg/')"
    />
    <MdiIcon
      key="twitter"
      icon="mdiTwitter"
      class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
      @click="handleContent('https://twitter.com/DriDGG')"
    />
    <MdiIcon
      key="youtube"
      icon="mdiYoutube"
      class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
      @click="handleContent('https://www.youtube.com/@dridvr')"
    />
    <MdiIcon
      key="twitch"
      icon="mdiTwitch"
      class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
      @click="handleContent('https://www.twitch.tv/dridgg')"
    />
  </transition-group>
</template>

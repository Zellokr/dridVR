<template>
  <transition-group name="scale" tag="div" class="flex space-x-3.5">
    <a href="https://www.instagram.com/dridgg/" target="_blank">
      <MdiIcon
        key="instagram"
        icon="mdiInstagram"
        class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
        aria-label="instagram"
      />
    </a>

    <a href="https://twitter.com/DriDGG" target="_blank">
      <MdiIcon
        key="twitter"
        icon="mdiTwitter"
        class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
        aria-label="twitter"
      />
    </a>
    <a href="https://www.youtube.com/@dridvr" target="_blank">
      <MdiIcon
        key="youtube"
        icon="mdiYoutube"
        class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
        aria-label="youtube"
      />
    </a>
    <a href="https://www.twitch.tv/dridgg" target="_blank">
      <MdiIcon
        key="twitch"
        icon="mdiTwitch"
        class="text-white w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-125"
        aria-label="twitch"
      />
    </a>
  </transition-group>
</template>

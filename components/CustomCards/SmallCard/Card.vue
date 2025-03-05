<script setup lang="ts">
type SmallCardSchema = {
  name: string;
  affiliate_link: string;
  img_link: string;
  amazon_link?: string;
  logo?: string;
};

type CardProps = {
  content: SmallCardSchema;
};

defineProps<CardProps>();
</script>

<template>
  <NuxtLink
    class="block group p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    aria-label="Más información sobre {{ content.name }}"
  >
    <div class="grid grid-cols-12 gap-4 items-center">
      <div class="col-span-4 sm:col-span-3">
        <img
          :src="content.img_link"
          :alt="content.name"
          class="w-full sm:h-24 rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div class="col-span-8 sm:col-span-9 flex flex-col">
        <span
          class="text-white text-lg font-semibold truncate"
          :title="content.name"
        >
          {{ content.name }}
        </span>
        <span class="text-blue-400 text-sm"> Meta Quest 3 </span>
        <div class="p-1 mt-2">
          <div class="flex space-x-3.5 text-green-400 text-sm font-bold">
            <div class="flex items-center space-x-3.5">
              <a :href="content.affiliate_link" target="_blank">
                <nuxt-img
                  class="w-8 h-8 cursor-pointer transition-transform duration-300 hover:scale-110"
                  :src="content.logo"
                />
              </a>
              <a
                v-if="content.amazon_link"
                :href="content.amazon_link"
                target="_blank"
              >
                <nuxt-img
                  class="w-8 h-8 cursor-pointer transition-transform duration-300 hover:scale-110"
                  alt="Compra en amazon"
                  src="/icons/AmazonIcon.webp"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {ref} from "vue";

const searchTerm = ref('');
const hasVideo = ref(false)
const hasCrossbuy = ref(false)

import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'

</script>

<template>
  <div class="h-full w-full bg-gray-900 ">
    <Dialog default-open>
      <DialogContent class="border border-gray-700 rounded-lg bg-gradient-to-br from-gray-800 to-black text-center text-white p-6">
            <!-- Content -->
            <div class="relative z-10">
              <!-- Main Title -->
              <div class="text-yellow-500 text-2xl font-bold tracking-wide">
                BLACK FRIDAY
              </div>
              <div class="text-gray-300 text-sm font-medium mt-1">DISCOUNT CARD</div>
              <!-- Discount -->
              <div class="text-8xl font-extrabold text-white mt-4">
                20<span class="text-yellow-500">%</span>
              </div>
            </div>
      </DialogContent>
    </Dialog>
    <Header />
    <Features />
    <Accesories />
    <div class="sticky top-0 z-20 mb-4">
      <Filters
          v-model:searchTerm="searchTerm"
          v-model:hasVideo="hasVideo"
          v-model:hasCrossbuy="hasCrossbuy"
      />
    </div>
    <AllGames :search-term="searchTerm" :has-video="hasVideo" :has-crossbuy="hasCrossbuy" />
  </div>
</template>

<style scoped>

</style>
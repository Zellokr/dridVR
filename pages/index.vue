<script setup lang="ts">
import {ref} from "vue";
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'

const searchTerm = ref('');
const hasVideo = ref(false)
const hasCrossbuy = ref(false)


</script>

<template>
  <div class="h-full w-full bg-gray-900 ">
    <Dialog default-open>
      <DialogTitle />
      <DialogContent class="border border-gray-700 rounded-lg bg-gradient-to-br from-gray-800 to-black text-center text-white p-6">
            <!-- Content -->
            <div class="relative z-10">
              <!-- Main Title -->
              <div class="text-yellow-500 text-2xl font-bold tracking-wide">
                BLACK FRIDAY
              </div>
              <div class="text-gray-300 text-sm  font-semibold mt-1">Se aplica a todos los juegos hasta <strong>31/12/24</strong> </div>
              <!-- Discount -->
              <div class="text-8xl font-extrabold text-white">
                20<span class="text-yellow-500">%</span>
              </div>
            </div>
      </DialogContent>
      <DialogDescription />
    </Dialog>
    <Header />
    <Features />
    <Accesories />
    <Filters
          v-model:searchTerm="searchTerm"
          v-model:hasVideo="hasVideo"
          v-model:hasCrossbuy="hasCrossbuy"
    />
    <AllGames :search-term="searchTerm" :has-video="hasVideo" :has-crossbuy="hasCrossbuy" />
  </div>
</template>

<style scoped>

</style>
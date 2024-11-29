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
  <div class="h-full w-full bg-gray-950 text-gray-100 font-sans">
    <Dialog default-open>
      <!-- Dialog Title -->
      <DialogTitle class="sr-only" />

      <!-- Dialog Content -->
      <DialogContent
          class="border border-gray-800 rounded-xl bg-gradient-to-br from-gray-900 to-black shadow-xl p-8 max-w-md mx-auto mt-10 text-center"
      >
        <!-- Content -->
        <div class="relative z-10">
          <!-- Main Title -->
          <div class="text-yellow-500 text-3xl font-extrabold tracking-wider">
            BLACK FRIDAY
          </div>
          <div class="text-gray-400 text-sm font-medium mt-2">
            Se aplica a todos los juegos hasta <strong class="text-yellow-400">31/12/24</strong>
          </div>
          <!-- Discount -->
          <div class="text-8xl font-black text-white mt-4">
            20<span class="text-yellow-500">%</span>
          </div>
          <!-- Call to Action -->
          <DialogClose as-child>
            <button
                class="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              ¡Explorar ofertas!
            </button>
          </DialogClose>

        </div>
      </DialogContent>

      <DialogDescription class="sr-only" />
    </Dialog>
    <Header class="border-b border-gray-800 bg-gray-900 shadow-sm " />
    <Features class="py-8 bg-gray-950" />
    <Accesories class="py-8 bg-gray-950" />
    <Filters
        v-model:searchTerm="searchTerm"
        v-model:hasVideo="hasVideo"
        v-model:hasCrossbuy="hasCrossbuy"
    />
    <AllGames
        :search-term="searchTerm"
        :has-video="hasVideo"
        :has-crossbuy="hasCrossbuy"
        class="pt-8"
    />
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import accesories from '@/public/accesories.json';

interface Accesories {
  name: string
  link: string
  img_link: string
}


</script>

<template>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-white text-5xl font-bold py-8 mb-2">Accesorios</h1>
    </div>

    <div class="flex justify-center items-center gap-x-8 flex-wrap gap-y-4">
      <transition-group name="fade" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-8">
        <!-- Itera sobre los datos filtrados -->
        <div
            v-for="(accessory, index) in accesories"
            :key="index"
        >
          <div class="block cursor-pointer">
            <!-- Enlace de la card principal -->
            <a
                :href="accessory.link"
                target="_blank"
                rel="noopener noreferrer"
                class="block"
            >
              <div class="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden max-w-xs transform transition-transform duration-300 hover:-translate-y-2">
                <!-- Imagen -->
                <div class="relative">
                  <img :src="accessory.img_link" alt="Game Image" class="w-full h-48 object-cover" />
                  <!-- Ícono de video -->
                </div>
                <!-- Contenido -->
                <div class="p-4 h-20">
                  <h3 class="text-lg font-semibold mb-2 text-white ">
                    {{ accessory.name || "Nombre del Accesorio" }}
                  </h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </transition-group>
    </div>
</template>

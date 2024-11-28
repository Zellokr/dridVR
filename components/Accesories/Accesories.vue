<script setup lang="ts">
import accesories from '@/public/accesories.json';

</script>

<template>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-white text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold py-8">Accesorios</h1>
      <span class="text-white text-2xl mb-4">Con la compra de cualquier visor... ¡Obtienes <span class="text-yellow-400">60€</span> para gastar en la tienda de Meta!</span>
    </div>


    <div class="flex justify-center items-center flex-wrap gap-y-2">
      <transition-group name="fade" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
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
                <div class="p-4 h-16">
                  <h3 class="text-lg font-semibold text-white ">
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

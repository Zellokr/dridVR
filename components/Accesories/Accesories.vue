<script setup lang="ts">
import accesories from "@/public/accesories.json";
</script>

<template>
  <div class="py-4">
    <TitleContent title="Accesorios" class="flex flex-col gap-y-2">
      <template #subtitle>
        Con la compra de cualquier visor... ¡Obtienes
        <span class="text-yellow-400">60€</span> para gastar en la tienda de
        Meta!
      </template>
    </TitleContent>
    <CardGames :game-records="accesories"></CardGames>
    <!--    <div class="flex items-center flex-wrap gap-y-2">-->
    <!--      <transition-group-->
    <!--        name="fade"-->
    <!--        tag="div"-->
    <!--        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"-->
    <!--      >-->
    <!--        &lt;!&ndash; Itera sobre los datos filtrados &ndash;&gt;-->
    <!--        <div v-for="(accessory, index) in accesories" :key="index">-->
    <!--          <div class="block cursor-pointer">-->
    <!--            &lt;!&ndash; Enlace de la card principal &ndash;&gt;-->
    <!--            <a-->
    <!--              :href="accessory.link"-->
    <!--              target="_blank"-->
    <!--              rel="noopener noreferrer"-->
    <!--              class="block"-->
    <!--            >-->
    <!--              <div-->
    <!--                class="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden max-w-xs transform transition-transform duration-300 hover:-translate-y-2"-->
    <!--              >-->
    <!--                &lt;!&ndash; Imagen &ndash;&gt;-->
    <!--                <div class="relative">-->
    <!--                  <img-->
    <!--                    :src="accessory.img_link"-->
    <!--                    alt="Game Image"-->
    <!--                    class="w-full h-48 object-cover"-->
    <!--                  />-->
    <!--                  &lt;!&ndash; Ícono de video &ndash;&gt;-->
    <!--                </div>-->
    <!--                &lt;!&ndash; Contenido &ndash;&gt;-->
    <!--                <div class="p-4 h-16">-->
    <!--                  <h3 class="text-lg font-semibold text-white">-->
    <!--                    {{ accessory.name || "Nombre del Accesorio" }}-->
    <!--                  </h3>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </a>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </transition-group>-->
    <!--    </div>-->
  </div>
</template>

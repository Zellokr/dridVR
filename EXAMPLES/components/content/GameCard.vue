<!--
  GameCard Component

  Tarjeta para mostrar información de un juego VR

  @component
  @example
  <GameCard :game="gameData" />
-->

<script setup lang="ts">
import type { Game } from "~/types/game";

interface Props {
  /**
   * Objeto con la información del juego
   */
  game: Game;

  /**
   * Variante visual de la tarjeta
   * @default 'outline'
   */
  variant?: "solid" | "outline" | "soft" | "subtle";

  /**
   * Mostrar badges de características
   * @default true
   */
  showBadges?: boolean;

  /**
   * Lazy load de imagen
   * @default true
   */
  lazyLoad?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "outline",
  showBadges: true,
  lazyLoad: true,
});

/**
 * Emitido cuando el usuario hace clic en el botón de ver oferta
 */
const emit = defineEmits<{
  click: [game: Game];
}>();

const handleClick = () => {
  emit("click", props.game);
};
</script>

<template>
  <UCard
    :variant="variant"
    class="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
  >
    <!-- Imagen del juego -->
    <div class="relative aspect-video overflow-hidden rounded-lg mb-4">
      <NuxtImg
        :src="game.imgLink"
        :alt="`Portada del juego ${game.name} para Meta Quest VR`"
        format="webp"
        quality="80"
        :loading="lazyLoad ? 'lazy' : 'eager'"
        sizes="xs:100vw sm:50vw md:33vw lg:25vw"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      <!-- Badge de video si está disponible -->
      <UBadge
        v-if="game.ytLink"
        color="error"
        class="absolute top-2 right-2 backdrop-blur-sm"
        icon="i-lucide-video"
        aria-label="Video disponible"
      >
        Video
      </UBadge>
    </div>

    <!-- Título del juego -->
    <h3
      class="text-lg font-semibold line-clamp-2 mb-3 min-h-[3.5rem] group-hover:text-primary transition-colors"
    >
      {{ game.name }}
    </h3>

    <!-- Footer: Badges y botón de acción -->
    <template #footer>
      <div class="flex items-center justify-between gap-2">
        <!-- Badges de características -->
        <div v-if="showBadges" class="flex gap-1.5 flex-wrap">
          <UBadge
            v-if="game.crossbuy"
            color="success"
            variant="soft"
            size="sm"
            icon="i-lucide-repeat"
            aria-label="Compatible con Crossbuy"
          >
            Crossbuy
          </UBadge>

          <UBadge
            v-if="game.bhaptics"
            color="info"
            variant="soft"
            size="sm"
            icon="i-lucide-vibrate"
            aria-label="Soporte háptico"
          >
            Haptics
          </UBadge>
        </div>

        <!-- Botón para ver oferta -->
        <UButton
          :to="game.affiliateLink"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          size="sm"
          trailing-icon="i-lucide-external-link"
          @click="handleClick"
          aria-label="`Ver"
          oferta
          de
          ${game.name}`
        >
          Ver oferta
        </UButton>
      </div>
    </template>
  </UCard>
</template>

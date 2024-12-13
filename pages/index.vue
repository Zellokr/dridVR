<script setup lang="ts">
import { bannerImagesList } from "~/constants/bannerImageList";

import Banner from "~/components/Body/Banner/Banner.vue";

useHead({
  title: "Ofertas y descuentos en videojuegos VR para Meta Quest",
  meta: [
    {
      name: "description",
      content:
        "Aprovecha ofertas exclusivas y descuentos en videojuegos de realidad virtual para Meta Quest con nuestros enlaces de referidos.",
    },
    {
      name: "keywords",
      content:
        "descuentos, videojuegos, VR, Meta Quest, realidad virtual, ofertas navidad, referidos Meta",
    },
    { name: "robots", content: "index, follow" },
    {
      property: "og:title",
      content: "Ofertas y descuentos en videojuegos VR para Meta Quest",
    },
    {
      property: "og:description",
      content:
        "Encuentra los mejores descuentos en videojuegos VR para Meta Quest con nuestros enlaces de referidos.",
    },
    {
      property: "og:image",
      content: "https://juegosquestbaratos.com/img/Banner/banner_image_1.webp",
    },
    {
      property: "og:image",
      content: "https://juegosquestbaratos.com/img/Banner/banner_image_2.webp",
    },
    { property: "og:url", content: "https://juegosquestbaratos.com" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Ofertas y descuentos en videojuegos VR para Meta Quest",
    },
    {
      name: "twitter:description",
      content: "Aprovecha las mejores ofertas en juegos VR para Meta Quest.",
    },
    {
      name: "twitter:image",
      content: "https://juegosquestbaratos.com/img/Banner/banner_image_1.webp",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Ofertas de juegos VR para Meta Quest",
        description:
          "Descubre descuentos exclusivos en juegos VR para Meta Quest con enlaces de referidos.",
        url: "https://juegosquestbaratos.com",
        mainEntity: "",
      }),
    },
  ],
});
</script>

<template>
  <NuxtLayout name="default-layout">
    <div class="pb-14">
      <div
        class="md:container grid grid-flow-row-dense grid-cols-4 grid-rows-auto gap-y-28 mx-6"
      >
        <div class="col-span-12 row-start-1">
          <Banner :data-images="bannerImagesList" />
        </div>

        <ScrollReveal class="col-span-12 row-start-2">
          <div
            class="grid grid-cols-1 md:grid-cols-2 place-content-between place-items-center gap-y-28"
          >
            <h1
              class="text-white font-semibold text-2xl max-w-[30rem] break-words"
            >
              En nuestra página web encontrarás una selección exclusiva de los
              mejores juegos de realidad virtual. A través de nuestra
              plataforma, te ofrecemos enlaces de afiliados con descuentos
              especiales, para que disfrutes de tus títulos favoritos al mejor
              precio. Nuestro objetivo es brindarte una experiencia cómoda y
              accesible, mientras ahorras en tus compras
            </h1>
            <img src="/drid1.jpg" alt="" class="rounded-xl h-full" />
          </div>
        </ScrollReveal>
        <!--        <ScrollReveal class="col-span-12 row-start-3">-->
        <!--          <div-->
        <!--            class="grid grid-cols-2 place-content-between place-items-center"-->
        <!--          >-->
        <!--            <img src="/drid.jpg" alt="" class="rounded-xl h-96" />-->
        <!--            <div class="text-white font-semibold w-10/12 break-all">-->
        <!--              ¡Hola! Mi nombre es Yeray, y los videojuegos siempre han sido una-->
        <!--              parte fundamental de mi vida. Durante varios años fui jugador-->
        <!--              profesional, dedicando mi tiempo y esfuerzo a competir al más alto-->
        <!--              nivel. Esa experiencia no solo me enseñó la importancia de la-->
        <!--              dedicación y el trabajo en equipo, sino también me permitió vivir-->
        <!--              de cerca la evolución de la industria de los videojuegos. Hoy en-->
        <!--              día, me he enfocado en algo que me apasiona aún más: compartir mis-->
        <!--              conocimientos y entusiasmo sobre videojuegos de realidad virtual-->
        <!--              (VR). En mi canal de YouTube, hablo de las últimas novedades,-->
        <!--              analizo los lanzamientos más interesantes y ofrezco consejos para-->
        <!--              disfrutar al máximo esta tecnología revolucionaria. Si eres fan de-->
        <!--              los videojuegos, la realidad virtual o simplemente quieres-->
        <!--              mantenerte informado sobre este mundo en constante cambio, ¡te-->
        <!--              invito a unirte a mi comunidad! Juntos exploraremos el futuro del-->
        <!--              gaming.-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </ScrollReveal>-->
        <!--        <div class="col-span-12 row-start-2">-->
        <!--          <Visors />-->
        <!--        </div>-->
        <!--        <div class="col-span-12 row-start-3">-->
        <!--          <TitleContent title="Accesorios para tus Meta Quest">-->
        <!--            <template #subtitle>-->
        <!--              Mejora tu visor Meta Quest con los siguiente accesorios de Kiwi-->
        <!--              Design-->
        <!--            </template>-->
        <!--          </TitleContent>-->
        <!--          <CustomGallery :info="accesories" />-->
        <!--        </div>-->
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
/* Estilos generales para el scrollbar */
::-webkit-scrollbar {
  width: 12px; /* Ancho del scrollbar */
  background-color: #1e1e1e; /* Color de fondo del scrollbar */
  border-radius: 6px; /* Redondeo del scrollbar */
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(
    to bottom,
    #4a4a4a,
    #2a2a2a
  ); /* Degradado para el "thumb" */
  border-radius: 6px; /* Redondeo del thumb */
  border: 2px solid #1e1e1e; /* Borde alrededor del thumb */
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    to bottom,
    #6a6a6a,
    #3a3a3a
  ); /* Cambio de color al pasar el cursor */
}

::-webkit-scrollbar-thumb:active {
  background: linear-gradient(
    to bottom,
    #8a8a8a,
    #5a5a5a
  ); /* Cambio de color al hacer clic */
}

::-webkit-scrollbar-corner {
  background: #1e1e1e; /* Color de la esquina del scrollbar */
}
</style>

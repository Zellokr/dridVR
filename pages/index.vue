<script setup lang="ts">
import { bannerImagesList } from "~/constants/bannerImageList";
import Newsletter from "~/components/Newsletter/Newsletter.vue";
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

const showNewsletter = ref(true)
const loading = ref(false)

onMounted(async () => {

  const userId = localStorage.getItem('contactId');

  if (userId) {
    showNewsletter.value = false;
    return
  }

  try {
    loading.value = true
    const res = await $fetch('/api/contacts');

    if (res.success) {
      const isUserInList = res.data.contacts.some((user: any) => user.id === userId);

      if (!isUserInList) {
        const lastShown = localStorage.getItem('newsletterLastShown');
        const now = new Date();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        if (lastShown) {
          const lastShownDate = new Date(lastShown);
          const diff = now.getTime() - lastShownDate.getTime();
          showNewsletter.value = diff >= oneWeek;
        } else {
          showNewsletter.value = true;
        }
      }
      loading.value = false
    }
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
  }

});

const handleCloseModal = () => {
  showNewsletter.value = false
  const now = new Date()
  localStorage.setItem('newsletterLastShown', now.toISOString())
}

</script>

<template>
  <NuxtLayout name="default-layout" v-if="!loading">
    <div class="pb-14" >
      <div v-if="showNewsletter">
        <Newsletter :display-modal="showNewsletter" @close="handleCloseModal" />
      </div>
      <div
        class="md:container grid grid-flow-row-dense grid-cols-4 grid-rows-auto gap-y-28 md:gap-y-28 mx-6"
      >
        <div class="col-span-12 row-start-1">
          <Banner :data-images="bannerImagesList" />
        </div>
        <ScrollReveal class="col-span-12 row-start-2">
          <nuxt-link to="/games">
            <div
              class="grid grid-cols-1 lg:grid-cols-2 place-content-between place-items-center gap-y-14 md:gap-x-8"
            >
              <nuxt-img
                src="/img/ImagenWebJuegos.webp"
                alt="Imagen de 3 juegos de realidad virtual, el primero es Batman Arkham Shadow, el segundo es Asgard's Wrath y el tercero es Metro Awakening"
                class="rounded-xl cursor-pointer order-2 lg:order-1 xl:order-1 object-cover"
              />
              <div class="flex flex-col gap-y-4 order-1">
                <span class="text-white font-bold text-xl md:text-4xl"
                  >Juega más, paga menos</span
                >
                <p
                  class="text-white font-light text-lg w-full lg:max-w-[30rem] break-words"
                >
                  Cualquier juego que compres desde aquí tendrá un descuento
                  automático, gracias a mis enlaces de afiliados de Meta, algo
                  que te hará pagar menos, de forma legal y me estarás apoyando
                  a mi, directamente
                </p>
              </div>
            </div>
          </nuxt-link>
        </ScrollReveal>
        <ScrollReveal class="col-span-12 row-start-3">
          <nuxt-link to="/accessories">
            <div
              class="grid grid-cols-1 lg:grid-cols-2 place-items-center content-center gap-y-14"
            >
              <div class="flex flex-col gap-y-4 lg:order-2 xl:order-2">
                <span class="text-white font-bold text-xl md:text-4xl"
                  >El mejor visor, con regalo</span
                >
                <p
                  class="text-white font-light text-lg w-full lg:max-w-[30rem] break-words"
                >
                  Al comprar desde aquí un visor Meta Quest 3, Meta Quest 3S o
                  Meta Quest Pro, obtendrás 30 euros en tu cartera en la Meta
                  Store, para que puedas comprar algunos y estrenar tu visor
                  como se merece.
                </p>
              </div>
              <nuxt-img
                src="/img/visoresmetaquestimagen.webp"
                alt="Imagen de las gafas de realidad virtual Meta Quest 3"
                class="rounded-xl cursor-pointer order-2"
              />
            </div>
          </nuxt-link>
        </ScrollReveal>
        <ScrollReveal class="col-span-12 row-start-4">
          <nuxt-link to="/accessories">
            <div
              class="grid grid-cols-1 lg:grid-cols-2 place-content-between place-items-center gap-y-14"
            >
              <nuxt-img
                src="/img/Wield.jpg"
                format="webp"
                alt="Imagen con accesorios de realidad virtual con el marca de accesorios Kiwi Design"
                class="rounded-xl cursor-pointer order-2 lg:order-1 xl:order-1"
              />
              <div class="flex flex-col gap-y-4 order-1">
                <span class="text-white font-bold text-xl md:text-4xl"
                  >Apunten, ¡fuego!</span
                >
                <p
                  class="text-white font-light text-lg w-full lg:max-w-[30rem] break-words"
                >
                  Con el Onestock de WieldVR apuntar ya no será un problema,
                  gracias a su adaptable diseño, y fácil aprendizaje,
                  no perderás ningún segundo intentando encontrar el punto de mira,
                  será tan sencillo como apuntar y ¡disparar!
                </p>
              </div>
            </div>
          </nuxt-link>
        </ScrollReveal>
      </div>
    </div>
  </NuxtLayout>
</template>



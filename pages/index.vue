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

const showNewsletter = ref(true);
const loading = ref(true);
const contentReady = ref(false);

onMounted(async () => {
  const userId = localStorage.getItem("contactId");

  if (userId) {
    showNewsletter.value = false;
  }

  try {
    const res = await $fetch("/api/contacts");

    if (res.success) {
      const contacts = (res as any).data?.contacts || [];
      const isUserInList = contacts.some((user: any) => user.id === userId);

      if (!isUserInList && !userId) {
        const lastShown = localStorage.getItem("newsletterLastShown");
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
    }
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
  } finally {
    loading.value = false;
    // Pequeño delay para transición suave
    setTimeout(() => {
      contentReady.value = true;
    }, 100);
  }
});

const handleCloseModal = () => {
  showNewsletter.value = false;
  const now = new Date();
  localStorage.setItem("newsletterLastShown", now.toISOString());
};
</script>

<template>
  <NuxtLayout name="default-layout">
    <ClientOnly>
      <Newsletter
        v-if="showNewsletter && !loading"
        :display-modal="showNewsletter"
        @close="handleCloseModal"
      />
    </ClientOnly>

    <div v-if="loading" class="min-h-screen">
      <UContainer class="py-8 sm:py-12 lg:py-16">
        <div class="space-y-16 sm:space-y-20 lg:space-y-24">
          <USkeleton class="h-48 sm:h-64 lg:h-80 w-full rounded-xl" />

          <div
            v-for="i in 3"
            :key="i"
            class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          >
            <USkeleton class="h-64 sm:h-80 w-full rounded-xl" />
            <div class="space-y-4">
              <USkeleton class="h-8 sm:h-10 w-3/4" />
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-5/6" />
              <USkeleton class="h-4 w-4/6" />
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <div
      v-else
      class="min-h-screen transition-opacity duration-500"
      :class="contentReady ? 'opacity-100' : 'opacity-0'"
    >
      <UContainer class="py-8 sm:py-12 lg:py-16">
        <div class="space-y-16 sm:space-y-20 lg:space-y-24">
          <section aria-label="Banner principal">
            <Banner :data-images="bannerImagesList" />
          </section>

          <ScrollReveal>
            <UCard
              as="article"
              class="overflow-hidden group hover:ring-2 hover:ring-primary/50 transition-all duration-300"
            >
              <NuxtLink
                to="/games"
                class="block"
                aria-label="Ver catálogo de juegos VR"
              >
                <div
                  class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-4 sm:p-6 lg:p-8"
                >
                  <div
                    class="order-2 lg:order-1 relative overflow-hidden rounded-xl"
                  >
                    <img
                      src="/img/ImagenWebJuegos.webp"
                      alt="Imagen de 3 juegos de realidad virtual: Batman Arkham Shadow, Asgard's Wrath y Metro Awakening"
                      class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="640"
                      height="480"
                    />
                  </div>

                  <div class="order-1 lg:order-2 space-y-4 sm:space-y-6">
                    <h2
                      class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight"
                    >
                      Juega más, paga menos
                    </h2>
                    <p
                      class="text-base sm:text-lg text-gray-300 leading-relaxed max-w-prose"
                    >
                      Cualquier juego que compres desde aquí tendrá un descuento
                      automático, gracias a mis enlaces de afiliados de Meta,
                      algo que te hará pagar menos, de forma legal y me estarás
                      apoyando a mí, directamente.
                    </p>
                    <UButton
                      color="primary"
                      size="lg"
                      trailing-icon="i-lucide-arrow-right"
                      class="mt-4"
                    >
                      Ver juegos
                    </UButton>
                  </div>
                </div>
              </NuxtLink>
            </UCard>
          </ScrollReveal>

          <ScrollReveal>
            <UCard
              as="article"
              class="overflow-hidden group hover:ring-2 hover:ring-primary/50 transition-all duration-300"
            >
              <NuxtLink
                to="/accessories"
                class="block"
                aria-label="Ver visores Meta Quest"
              >
                <div
                  class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-4 sm:p-6 lg:p-8"
                >
                  <div class="order-1 space-y-4 sm:space-y-6">
                    <h2
                      class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight"
                    >
                      El mejor visor, con regalo
                    </h2>
                    <p
                      class="text-base sm:text-lg text-gray-300 leading-relaxed max-w-prose"
                    >
                      Al comprar desde aquí un visor Meta Quest 3, Meta Quest 3S
                      o Meta Quest Pro, obtendrás 30 euros en tu cartera en la
                      Meta Store, para que puedas comprar algunos juegos y
                      estrenar tu visor como se merece.
                    </p>
                    <UButton
                      color="primary"
                      size="lg"
                      trailing-icon="i-lucide-arrow-right"
                      class="mt-4"
                    >
                      Ver visores
                    </UButton>
                  </div>

                  <div class="order-2 relative overflow-hidden rounded-xl">
                    <img
                      src="/img/visoresmetaquestimagen.webp"
                      alt="Gafas de realidad virtual Meta Quest 3"
                      class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="640"
                      height="480"
                    />
                  </div>
                </div>
              </NuxtLink>
            </UCard>
          </ScrollReveal>

          <ScrollReveal>
            <UCard
              as="article"
              class="overflow-hidden group hover:ring-2 hover:ring-primary/50 transition-all duration-300"
            >
              <NuxtLink
                to="/accessories"
                class="block"
                aria-label="Ver accesorios VR"
              >
                <div
                  class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center p-4 sm:p-6 lg:p-8"
                >
                  <div
                    class="order-2 lg:order-1 relative overflow-hidden rounded-xl"
                  >
                    <img
                      src="/img/Wield.jpg"
                      alt="Accesorios de realidad virtual marca Kiwi Design"
                      class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="640"
                      height="480"
                    />
                  </div>

                  <div class="order-1 lg:order-2 space-y-4 sm:space-y-6">
                    <h2
                      class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight"
                    >
                      Apunten, ¡fuego!
                    </h2>
                    <p
                      class="text-base sm:text-lg text-gray-300 leading-relaxed max-w-prose"
                    >
                      Con el Onestock de WieldVR apuntar ya no será un problema,
                      gracias a su adaptable diseño, y fácil aprendizaje, no
                      perderás ningún segundo intentando encontrar el punto de
                      mira, será tan sencillo como apuntar y ¡disparar!
                    </p>
                    <UButton
                      color="primary"
                      size="lg"
                      trailing-icon="i-lucide-arrow-right"
                      class="mt-4"
                    >
                      Ver accesorios
                    </UButton>
                  </div>
                </div>
              </NuxtLink>
            </UCard>
          </ScrollReveal>
        </div>
      </UContainer>
    </div>
  </NuxtLayout>
</template>

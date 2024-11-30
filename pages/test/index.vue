<template>
  <div
    class="relative flex size-full min-h-screen flex-col bg-[#1A1A1A] dark group/design-root overflow-x-hidden font-sans"
  >
    <div class="layout-container flex h-full grow flex-col">
      <!-- Header -->

      <!-- Content -->
      <div class="px-40 flex flex-1 justify-center py-5">
        <div
          class="layout-content-container flex flex-col max-w-[960px] flex-1"
        >
          <!-- Section Content -->
          <div class="grid grid-cols-1 gap-4">hola</div>

          <!-- Buttons -->
          <div class="flex gap-3 p-3 flex-wrap pr-4">
            <ButtonGroup />
          </div>

          <!-- Releases -->
          <h2
            class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
          >
            Nuevos lanzamientos
          </h2>
          <ReleaseGrid />

          <!-- Wishlist -->
          <h2
            class="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
          >
            Tu lista de deseos
          </h2>
          <WishlistGrid />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// You can define data or composables here to control the dynamic parts if needed.
</script>

<style scoped>
/* Scoped styles here if necessary */
</style>

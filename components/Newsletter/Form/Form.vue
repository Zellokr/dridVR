<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const emit = defineEmits<{
  success: [];
}>();

const schema = z.object({
  email: z.string().email("El correo electrónico debe ser válido"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: "",
});

const message = ref("");
const success = ref<boolean | null>(null);
const loading = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  message.value = "";
  success.value = null;

  try {
    const res = await $fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: event.data.email,
      }),
    });

    if (res.success) {
      if (typeof window !== "undefined" && "data" in res && res.data) {
        localStorage.setItem("contactId", String((res.data as any).id));
      }
      success.value = true;
      message.value =
        "¡Te has suscrito con éxito! Pronto recibirás noticias sobre VR.";

      // Limpiar form después de éxito
      state.email = "";

      // Emitir evento de éxito y cerrar modal después de 2 segundos
      setTimeout(() => {
        emit("success");
      }, 2000);
    } else {
      success.value = false;
      message.value = "El email que has introducido ya está suscrito";
    }
  } catch (error) {
    success.value = false;
    message.value = "Error al procesar la suscripción. Intenta nuevamente.";
    console.error("Error en suscripción:", error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="w-full">
    <div
      v-if="success === true"
      class="flex flex-col items-center justify-center py-8 px-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
    >
      <div
        class="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/50 mb-4"
      >
        <UIcon name="i-lucide-check-circle-2" class="w-8 h-8 text-green-400" />
      </div>
      <h4 class="text-lg font-semibold text-white mb-2">
        ¡Suscripción exitosa!
      </h4>
      <p class="text-sm text-gray-400 text-center max-w-xs">
        {{ message }}
      </p>
    </div>

    <UForm
      v-else
      :schema="schema"
      :state="state"
      class="space-y-5"
      @submit="onSubmit"
    >
      <div class="space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-300">
          Tu correo electrónico
          <span class="text-red-400">*</span>
        </label>
        <div class="relative group">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
          >
            <UIcon
              name="i-lucide-mail"
              class="w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors"
            />
          </div>
          <input
            id="email"
            v-model="state.email"
            type="email"
            placeholder="tu@email.com"
            autocomplete="email"
            :disabled="loading"
            class="w-full pl-12 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:border-gray-600 focus:bg-gray-900"
          />
        </div>
      </div>

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95 -translate-y-2"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 -translate-y-2"
      >
        <div
          v-if="success === false"
          class="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          <UIcon
            name="i-lucide-alert-circle"
            class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-red-300">{{ message }}</p>
          </div>
          <button
            @click="
              success = null;
              message = '';
            "
            class="flex-shrink-0 text-red-400 hover:text-red-300 transition-colors"
            aria-label="Cerrar alerta"
          >
            <UIcon name="i-lucide-x" class="w-4 h-4" />
          </button>
        </div>
      </Transition>

      <button
        type="submit"
        :disabled="!state.email || loading"
        class="w-full relative overflow-hidden group py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
      >
        <span
          class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 opacity-0 group-hover:opacity-20 transition-opacity duration-200"
        ></span>
        <span class="relative flex items-center justify-center gap-2">
          <UIcon
            v-if="loading"
            name="i-lucide-loader-2"
            class="w-5 h-5 animate-spin"
          />
          <UIcon v-else name="i-lucide-send" class="w-5 h-5" />
          <span>{{ loading ? "Enviando..." : "Suscribirse ahora" }}</span>
        </span>
      </button>
    </UForm>
  </div>
</template>

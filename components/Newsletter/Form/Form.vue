<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

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
      message.value = "¡Te has suscrito con éxito!";

      // Limpiar form después de éxito
      state.email = "";
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
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email" required>
      <UInput
        v-model="state.email"
        type="email"
        placeholder="tu@email.com"
        icon="i-lucide-mail"
        size="lg"
      />
    </UFormField>

    <UAlert
      v-if="success !== null"
      :color="success ? 'success' : 'error'"
      :icon="success ? 'i-lucide-check-circle' : 'i-lucide-alert-circle'"
      :title="message"
    />

    <UButton type="submit" color="primary" size="lg" block :loading="loading">
      Suscribirse
    </UButton>
  </UForm>
</template>

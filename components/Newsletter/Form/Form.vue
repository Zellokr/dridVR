<script setup lang="ts">
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  email: z.string({
    required_error: 'El correo electrónico es obligatorio',
  }).email({
    message: 'El correo electrónico debe ser un correo electrónico válido',
  }),
}));

const { isFieldDirty, handleSubmit, meta } = useForm({
  validationSchema: formSchema,
})

const message = ref('')
const response = ref(null)

const onSubmit = handleSubmit(async (values) => {
  const res = await $fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: values.email
    }),
  })
  if (res.success) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('contactId', res.data.id)
    }
    response.value = true
    message.value = "¡Te has suscrito con éxito!"
  } else {
    response.value = false
    message.value = "El email que has introducido ya está suscrito"
    console.log('No se recibieron datos correctamente')
  }
})

</script>

<template>
  <form class="space-y-3" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="Inserta tu email" v-bind="componentField" />
        </FormControl>
        <FormDescription />
        <FormMessage class="text-red-600 text-sm" />
      </FormItem>
    </FormField>
    <p v-if="response !== null"
       class=" text-black w-full p-2 rounded-lg font-semibold"
       :class="{
      'bg-red-300/80': !response,
      'bg-green-300': response,
    }">
      {{message}}
    </p>
    <Button type="submit" :disabled="!meta.valid" variant="secondary" class="cursor-pointer">
      Suscribirse
    </Button>
  </form>
</template>

<style scoped>

</style>
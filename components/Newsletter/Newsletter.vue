<script setup lang="ts">
import Form from './Form/Form.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

defineProps<{
  displayModal: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

</script>

<template>
  <client-only>
    <Dialog :open="displayModal" @update:open="emit('close')">
      <DialogContent
          class="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6 overflow-y-auto max-h-[90vh]"
      >
        <DialogHeader>
          <DialogTitle>¡Suscríbete a nuestra newsletter!</DialogTitle>
          <DialogDescription>
            Mantente actualizado de las últimas novedades sobre VR.
          </DialogDescription>
        </DialogHeader>
        <Form />
      </DialogContent>
    </Dialog>
  </client-only>
</template>

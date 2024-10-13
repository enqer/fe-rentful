<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: false,
  },
});
const emits = defineEmits(['update:modelValue']);
</script>
<template>
  <div>
    <div class="tw-flex tw-gap-x-1 tw-font-medium">
      {{ label }}
      <div v-if="required" class="tw-text-red-500">*</div>
    </div>
    <q-input
      :model-value="modelValue"
      :rules="[(val: string) => val !== '' || 'Nieprawidłowe dane']"
      outlined
      dense
      hide-bottom-space
      @update:model-value="emits('update:modelValue', $event)"
    />
  </div>
</template>

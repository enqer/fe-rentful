<script setup lang="ts">
defineProps<{
  label: string;
}>();

const model = defineModel<string>();
</script>
<template>
  <q-input
    v-model="model"
    :rules="[(val: string) => (val && val.length > 0) || 'Pole nie może być puste']"
    :label="label"
    class="tw-mb-5 first-letter:tw-capitalize"
    lazy-rules
    outlined
  />
</template>

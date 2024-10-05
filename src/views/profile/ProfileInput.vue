<script setup lang="ts">
import type { PropType } from 'vue';
defineProps({
  label: {
    type: String,
    required: true,
  },
  rules: {
    type: Array as PropType<Array<(val: string) => boolean | string>>,
    default: () => [
      (val: string) => (val && val.length > 0) || 'Pole nie może być puste',
    ],
  },
});
const model = defineModel<string>();
</script>
<template>
  <q-input
    v-model="model"
    :rules="rules"
    :label="label"
    class="tw-mb-4 tw-capitalize"
    lazy-rules
    hide-bottom-space
    outlined
  />
</template>

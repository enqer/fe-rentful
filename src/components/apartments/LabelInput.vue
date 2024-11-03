<script setup lang="ts">
import type { PropType } from 'vue';
import RequiredLabel from '../RequiredLabel.vue';

type Type =
  | 'text'
  | 'password'
  | 'textarea'
  | 'email'
  | 'search'
  | 'tel'
  | 'file'
  | 'number'
  | 'url'
  | 'time'
  | 'date'
  | 'datetime-local';

defineProps({
  label: {
    type: String,
    required: true,
  },
  rules: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Array as PropType<((val: any) => boolean | string)[]>,
    default: () => [],
    required: false,
  },
  type: {
    type: String as PropType<Type>,
    required: true,
  },
});
const modelValue = defineModel<string | number>('modelValue');
</script>

<template>
  <div>
    <RequiredLabel :label="label" />
    <q-input
      v-model="modelValue"
      :rules="rules"
      :type="type"
      min="0"
      step="0.01"
      outlined
      dense
      hide-bottom-space
    >
      <template #append>
        <slot />
      </template>
    </q-input>
  </div>
</template>

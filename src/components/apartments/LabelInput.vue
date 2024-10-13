<script setup lang="ts">
import type { PropType } from 'vue';
import RequiredLabel from '../RequiredLabel.vue';
defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, null] as PropType<string | number | null>,
    required: true,
  },
  rules: {
    type: Array as PropType<((val: string | number | null) => boolean | string)[]>,
    default: () => [],
    required: false,
  },
});
const emits = defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <RequiredLabel :label="label" />
    <q-input
      :model-value="modelValue"
      :rules="rules"
      outlined
      dense
      hide-bottom-space
      @update:model-value="emits('update:modelValue', $event)"
    >
      <template v-if="$slots.default" #append>
        <slot />
      </template>
    </q-input>
  </div>
</template>

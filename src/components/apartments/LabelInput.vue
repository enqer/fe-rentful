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
</script>

<template>
  <div>
    <RequiredLabel :label="label" />
    <q-input :model-value="modelValue" :rules="rules" outlined dense hide-bottom-space>
      <template v-if="$slots.default" #append>
        <slot />
      </template>
    </q-input>
  </div>
</template>

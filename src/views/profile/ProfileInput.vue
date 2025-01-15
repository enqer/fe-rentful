<script setup lang="ts">
import { copyToClipboard } from 'quasar';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});
const val = defineModel<string>();
</script>
<template>
  <q-input
    v-model="val"
    :label="label"
    class="tw-mb-4 tw-capitalize"
    stack-label
    lazy-rules
    hide-bottom-space
    outlined
    dense
  >
    <template #append>
      <q-icon
        name="content_copy"
        size="xs"
        class="cursor-pointer"
        @click="copyToClipboard(label)"
      >
        <q-tooltip> Skopiuj </q-tooltip>
      </q-icon>
    </template>
  </q-input>
</template>

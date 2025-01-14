<script setup lang="ts">
import { copyToClipboard } from 'quasar';

defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <q-input
    :label="label"
    class="tw-mb-4 tw-capitalize"
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

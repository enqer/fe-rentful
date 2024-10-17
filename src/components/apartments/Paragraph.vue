<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="tw-w-3/4 tw-my-4">
    <div class="text-h6">{{ label }}</div>
    <q-separator />
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div
    class="tw-text-primary tw-px-4 tw-py-2 tw-border tw-border-primary tw-border-solid tw-rounded-md tw-font-medium hover:tw-text-white hover:tw-bg-primary tw-transition-all tw-duration-500"
  >
    {{ label }}: {{ value }}
  </div>
</template>

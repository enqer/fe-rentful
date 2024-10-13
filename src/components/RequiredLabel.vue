<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="tw-flex tw-gap-x-1 tw-font-medium">
    {{ label }}
    <div class="tw-text-red-500">*</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="tw-flex tw-gap-x-1 tw-font-medium tw-text-base 2xl:tw-text-sm">
    {{ label }}
    <div class="tw-text-red-500">*</div>
  </div>
</template>

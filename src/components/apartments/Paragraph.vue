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
    <div
      class="tw-font-semibold tw-text-base sm:tw-text-lg md:tw-text-xl xl:tw-text-base"
    >
      {{ label }}
    </div>
    <q-separator />
  </div>
</template>

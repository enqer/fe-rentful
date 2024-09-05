<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>
<template>
  <div class="tw-mb-8">
    <span class="tw-text-2xl tw-font-medium tw-capitalize">{{ label }}</span>
    <q-separator />
  </div>
</template>

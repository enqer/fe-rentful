<script setup lang="ts">
defineProps<{
  name: string;
  path: string;
}>();
</script>
<template>
  <router-link
    :to="path"
    class="tw-no-underline tw-text-sm tw-font-medium first-letter:tw-capitalize hover:tw-underline tw-text-primary"
  >
    {{ name }}
  </router-link>
</template>

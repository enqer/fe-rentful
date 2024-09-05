<script setup lang="ts">
defineProps<{
  name: string;
  path: string;
}>();
</script>
<template>
  <router-link
    :to="path"
    class="sm:tw-no-underline tw-underline-offset-3 tw-text-sm tw-font-medium first-letter:tw-capitalize hover:tw-underline tw-text-primary"
  >
    {{ name }}
  </router-link>
</template>

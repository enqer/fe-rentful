<script setup lang="ts">
defineProps<{
  path: string;
  name: string;
}>();
</script>
<template>
  <router-link
    :to="path"
    class="tw-no-underline tw-text-lg tw-font-semibold tw-capitalize hover:tw-text-gray-600 ease-in-out tw-transition-all tw-duration-500 tw-text-primary"
  >
    {{ name }}
  </router-link>
</template>

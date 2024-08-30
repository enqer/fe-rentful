<script setup lang="ts">
defineProps<{
  name: string;
  path: string;
}>();
</script>
<template>
  <router-link :to="path" class="tw-no-underline tw-capitalize tw-text-third">
    <q-item v-close-popup class="tw-h-0 tw-py-0" clickable>
      <q-item-section
        class="tw-flex tw-flex-row tw-justify-start tw-gap-x-1 tw-items-center hover:tw-text-blue-500"
      >
        <q-item-label>
          {{ name }}
        </q-item-label>
        <q-icon class="tw-text-third" name="arrow_outward" />
      </q-item-section>
    </q-item>
  </router-link>
</template>

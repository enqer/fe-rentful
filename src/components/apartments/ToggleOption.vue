<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
const switched = defineModel<boolean>('switched');
</script>
<template>
  <div class="tw-flex tw-items-center sm:tw-text-lg 2xl:tw-text-base">
    <q-toggle
      v-model="switched"
      :label="label"
      :icon="icon"
      size="lg"
      color="primary"
      dense
      left-label
    />
  </div>
</template>
<style>
.q-btn .q-focus-helper {
  display: none;
}
</style>

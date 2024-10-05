<script setup lang="ts">
defineProps({
  step: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div class="tw-flex tw-justify-end">
    <q-btn
      :label="step === 3 ? 'Zakończ' : 'Dalej'"
      class="sm:tw-text-lg xl:tw-text-base !tw-bg-primary tw-px-6"
      color="primary"
      type="submit"
    />
  </div>
</template>

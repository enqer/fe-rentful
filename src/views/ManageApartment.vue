<script setup lang="ts">
import TenantItem from '@/components/TenantItem.vue';

const props = defineProps({
  apartmentId: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div class="tw-flex tw-flex-col tw-gap-5">
    <q-card class="tw-p-4">
      <div>
        <div class="tw-text-xl tw-font-semibold">Panel właściciela</div>
        <q-separator />
      </div>
    </q-card>
    <div class="tw-p-4">
      <div class="tw-flex tw-gap-10 tw-justify-evenly tw-p-4">
        <TenantItem v-for="(item, index) in [1, 2, 3]" :key="index" />
      </div>
    </div>
  </div>
</template>

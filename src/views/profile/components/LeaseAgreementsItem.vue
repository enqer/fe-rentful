<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(true);
</script>
<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      icon="description"
      label="Account settings"
      caption="John Doe"
      hide-expand-icon
      expand-separator
    >
      <q-card class="tw-bg-gray-300 tw-p-1">
        <q-card-section class="tw-bg-white tw-rounded"> </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

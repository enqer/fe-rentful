<script setup lang="ts">
import type { Address } from '@/types';
import { ref } from 'vue';
import AddressInput from './AddressInput.vue';
const address = ref<Address | null>(null);

async function submit() {}
</script>
<template>
  <main>
    <div class="tw-mb-8">
      <span class="tw-text-2xl tw-font-medium">Adres zamieszkania</span>
      <q-separator />
    </div>
    <form @submit="submit">
      <address-input :v-model="address?.postalCode" label="kod pocztowy" />
    </form>
  </main>
</template>

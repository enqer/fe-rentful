<script setup lang="ts">
import type { Address } from '@/types';
import { ref } from 'vue';
import AddressInput from './AddressInput.vue';
import ProfileHeader from './ProfileHeader.vue';
const address = ref<Address | null>(null);

async function submit() {}
</script>
<template>
  <main>
    <profile-header label="adres zamieszkania" />
    <form @submit="submit">
      <address-input :v-model="address?.postalCode" label="kod pocztowy" />
    </form>
  </main>
</template>

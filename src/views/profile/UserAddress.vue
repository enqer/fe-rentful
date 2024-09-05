<script setup lang="ts">
import type { Address } from '@/types';
import { ref } from 'vue';
import ProfileInput from './ProfileInput.vue';
import ProfileHeader from './ProfileHeader.vue';
const address = ref<Address | null>(null);

async function submit() {}
</script>
<template>
  <main>
    <profile-header label="adres zamieszkania" />
    <form class="tw-flex tw-justify-center" @submit="submit">
      <div class="tw-w-4/5">
        <profile-input :v-model="address?.postalCode" label="kod pocztowy" />
        <profile-input :v-model="address?.city" label="miejscowość" />
        <profile-input :v-model="address?.street" label="ulica" />
        <profile-input :v-model="address?.buildingNumber" label="numer domu" />
        <div class="tw-flex tw-justify-center">
          <q-btn
            class="!tw-bg-primary tw-px-7 tw-text-white tw-capitalize"
            label="zapisz"
          />
        </div>
      </div>
    </form>
  </main>
</template>

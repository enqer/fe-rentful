<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { changeUserAddressAsync, getUserAddressAsync } from '@/api/UserApi';
import { useNotify } from '@/composables/useNotify';
import type { Address } from '@/types/models';

import ProfileInput from './ProfileInput.vue';
import PageHeader from '@/components/PageHeader.vue';

const { showSuccess, showWarning } = useNotify();

const address = ref<Address | null>(null);
const loading = ref(false);

async function submit() {
  if (address.value == null) {
    return;
  }
  const result = await changeUserAddressAsync(address.value);
  if (result?.status === 200) {
    showSuccess('Zmiana adresu', 'Operacja powiodła się');
    await setUserAddress();
    return;
  }
  showWarning('Zmiana adresu', 'Operacja nie powiodła się');
}

async function setUserAddress() {
  loading.value = true;
  const result = await getUserAddressAsync();
  address.value = result?.data ?? null;
  loading.value = false;
}

onMounted(async () => await setUserAddress());
</script>
<template>
  <main>
    <page-header label="adres zamieszkania" />
    <q-form class="tw-flex tw-justify-center" @submit="submit">
      <div v-if="address" class="tw-w-4/5">
        <profile-input
          v-model="address.postalCode"
          :rules="[ (val: string) => val && val.length > 0]"
          label="kod pocztowy"
          lazy-rules
        />
        <profile-input
          v-model="address.city"
          :rules="[ (val: string) => val && val.length > 0]"
          label="miejscowość"
        />
        <profile-input
          v-model="address.street"
          :rules="[ (val: string) => val && val.length > 0]"
          label="ulica"
        />
        <profile-input
          v-model="address.buildingNumber"
          :rules="[ (val: string) => val && val.length > 0]"
          label="numer budynku"
        />
        <profile-input
          v-model="address.country"
          :rules="[ (val: string) => val && val.length > 0]"
          label="Kraj"
        />
        <div class="tw-flex tw-justify-center">
          <q-btn
            class="!tw-bg-primary tw-px-7 tw-text-white tw-capitalize"
            label="zapisz"
            type="submit"
          />
        </div>
      </div>
    </q-form>
    <q-inner-loading v-show="loading" color="primary" />
  </main>
</template>

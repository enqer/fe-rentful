<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getUserInfoAsync } from '@/api/UserApi';
import type { UserDetails } from '@/types/models/User';

import PageHeader from '@/components/PageHeader.vue';
import ProfileInput from './ProfileInput.vue';

const userDetails = ref<UserDetails>();
const loading = ref(false);

async function setUserDetails() {
  loading.value = true;
  const result = await getUserInfoAsync();
  userDetails.value = result?.data;
  loading.value = false;
}

onMounted(async () => await setUserDetails());
</script>
<template>
  <main>
    <page-header label="dane użytkownika" />
    <form class="tw-flex tw-justify-center">
      <div v-if="userDetails" class="tw-w-4/5">
        <profile-input v-model="userDetails.globalId" label="Guid" readonly />
        <profile-input v-model="userDetails.email" label="Email" readonly />
        <profile-input v-model="userDetails.firstName" label="Imię" readonly />
        <profile-input v-model="userDetails.lastName" label="Nazwisko" readonly />
      </div>
    </form>
    <q-inner-loading :showing="loading" color="primary" />
  </main>
</template>

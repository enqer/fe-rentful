<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import ProfileInput from './ProfileInput.vue';
import { getUserInfoAsync } from '@/api/UserApi';
import type { UserInfo } from '@/types/models/User';

const userDetails = ref<UserInfo>();
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
        <profile-input :label="userDetails.globalId" readonly />
        <profile-input :label="userDetails.email" readonly />
        <profile-input :label="userDetails.firstName" readonly />
        <profile-input :label="userDetails.lastName" readonly />
      </div>
    </form>
    <q-inner-loading :showing="loading" color="primary" />
  </main>
</template>

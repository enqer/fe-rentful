<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import NavigationItem from './NavigationItem.vue';
import { ref } from 'vue';

const isDarkMode = ref(false);
</script>
<template>
  <main class="tw-flex tw-justify-between tw-mx-20">
    <div class="tw-flex tw-items-center">
      <Logo class="tw-size-18 tw-mr-10" />
      <div class="tw-text-2xl tw-flex tw-gap-x-7">
        <navigation-item path="/dashboard" name="Dashboard" />
        <navigation-item path="/login" name="login" />
        <navigation-item path="/register" name="register" />
      </div>
    </div>
    <div class="tw-bg-black tw-px-6 tw-flex tw-items-center">
      <q-toggle v-model="isDarkMode" checked-icon="lock" />
      <p class="tw-m-0 tw-capitalize">rick sorkin</p>
    </div>
  </main>
</template>

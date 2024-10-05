<script setup lang="ts">
import type { UserDetails } from '@/types/models';
import { ref } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import ProfileInput from './ProfileInput.vue';

const userDetails = ref<UserDetails | null>(null);

async function submit() {}
</script>
<template>
  <main>
    <page-header label="dane użytkownika" />
    <form class="tw-flex tw-justify-center" @submit="submit">
      <div class="tw-w-4/5">
        <profile-input :v-model="userDetails?.firstName" label="imię" />
        <profile-input :v-model="userDetails?.lastName" label="nazwisko" />
        <profile-input :v-model="userDetails?.email" label="email" />
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

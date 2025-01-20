<script setup lang="ts">
import { ref } from 'vue';

import router from '@/router';

import Logo from '../../components/Logo.vue';
import { RouterNameEnum } from '@/types/enums';
import { resetPasswordAsync } from '@/api/UserApi';
const email = ref('');
const showForm = ref(true);

function switchToLogin() {
  router.push(RouterNameEnum.Login);
}

async function resetPassword() {
  if (email.value.length === 0) {
    return;
  }
  const result = await resetPasswordAsync(email.value);
  showForm.value = result?.status !== 200;
}
</script>
<template>
  <div class="tw-w-full tw-justify-center tw-items-center tw-flex">
    <main
      class="tw-relative tw-w-full lg:tw-w-3/4 xl:tw-w-4/6 2xl:tw-w-3/5 tw-rounded-xl tw-p-6 lg:tw-py-10 lg:tw-px-20 tw-flex-col xl:tw-flex-row tw-flex lg:tw-shadow-2xl !tw-bg-white"
    >
      <div class="tw-flex tw-flex-col tw-items-center xl:tw-items-start">
        <Logo class="tw-size-36 sm:tw-size-52 md:tw-size-56 xl:tw-size-42" />
        <p class="tw-text-lg sm:tw-text-2xl md:tw-text-3xl xl:tw-text-2xl tw-font-medium">
          Resetowanie hasła
        </p>
      </div>
      <div v-if="showForm" class="tw-w-full tw-flex tw-justify-center tw-items-center">
        <div class="tw-w-1/2 tw-flex tw-flex-col">
          <div class="tw-text-gray-400 tw-font-medium">Wpisz email</div>
          <q-input v-model="email" outlined dense />
          <q-btn
            color="primary"
            label="Potwierdź"
            class="tw-mt-5"
            @click="resetPassword"
          />
        </div>
      </div>
      <div v-else class="tw-text-center tw-text-base tw-text-gray-600 tw-font-semibold">
        Na adres email {{ email }} wysłaliśmy wiadomość z nowym zresetowanym hasłem
      </div>
      <div
        class="tw-cursor-pointer text-right tw-absolute tw-bottom-5 tw-left-5 tw-text-gray-500"
        @click="switchToLogin"
      >
        <q-icon name="arrow_back" />
        Powrót do logowania
      </div>
    </main>
  </div>
</template>

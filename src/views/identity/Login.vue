<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { LoginUser } from '@/types/models/Identity';
import { ResponseStatusEnum, RouterNameEnum } from '@/types/enums';
import { useUser } from '@/composables/useUser';
import router from '@/router';
import { auth, rememberMe } from '@/services/LocalStorageService';
import { loginUserAsync } from '@/api/IdentityApi';

import Logo from '@/components/Logo.vue';


const { isLogged } = useUser();

const email = ref('');
const password = ref('');
const isRememberMe = ref(false);

async function login() {
  const user: LoginUser = {
    email: email.value,
    password: password.value,
  };
  if (isRememberMe.value) {
    rememberMe.value = isRememberMe.value;
  }
  const result = await loginUserAsync(user);
  if (result?.status === ResponseStatusEnum.Ok) {
    if (isRememberMe.value) {
      rememberMe.value = isRememberMe.value;
    }
    auth.value = result.data;
    router.push(RouterNameEnum.Announcements);
  }
}

function switchToRegister(){
  router.push(RouterNameEnum.Register)
}

onMounted(() => {
  if (rememberMe.value && isLogged()) {
    router.push(RouterNameEnum.Announcements);
  }
});
</script>
<template>
  <div class="column justify-center items-center">
    <main
      class="tw-w-full tw-h-full md:tw-w-3/4 lg:tw-w-1/2 tw-p-6 tw-flex tw-flex-col tw-justify-between"
    >
      <q-card
        class="tw-relative tw-flex tw-flex-col justify-between no-shadow !xl:tw-shadow-2xl xl:tw-py-10 xl:tw-px-20"
      >
        <div class="q-pa-md col-6 tw-flex tw-flex-col tw-items-center">
          <Logo class="tw-size-52 md:tw-size-72 xl:tw-size-52" />
          <p class="tw-text-3xl md:tw-text-4xl xl:tw-text-3xl tw-font-medium">
            Zaloguj się
          </p>
        </div>
        <q-form class="q-gutter-md col-6" @submit="login">
          <q-input
            v-model="email"
            :rules="[(val: string) => (val && val.length > 0) || 'Pole nie może zostać puste']"
            class="md:tw-text-2xl"
            label="Email"
            lazy-rules
            hide-bottom-space
            outlined
          />
          <q-input
            v-model="password"
            :rules="[(val: string) => (val !== null && val !== '') || 'Pole nie może zostać puste']"
            class="md:tw-text-2xl"
            label="Hasło"
            outlined
            hide-bottom-space
            lazy-rules
          />
          <div class="tw-flex justify-between md:tw-text-lg xl:tw-text-base">
            <div class="row items-center">
              <q-checkbox v-model="isRememberMe" />
              <q-item-label>Zapamiętaj mnie</q-item-label>
            </div>
            <div class="row items-center">
              <q-item-label class="cursor-pointer hover:tw-text-gray-500">
                Nie pamiętam hasła
              </q-item-label>
            </div>
          </div>
          <div class="tw-flex tw-justify-center md:tw-mt-6">
            <q-btn
              class="text-capitalize tw-px-6 tw-py-2 md:tw-text-xl"
              label="Zaloguj"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
        <div class="tw-absolute tw-bottom-5 tw-right-5 tw-cursor-pointer text-right tw-text-gray-500" @click="switchToRegister">
          Zarejestruj się 
          <q-icon name="arrow_forward" />
        </div>
      </q-card>
    </main>
  </div>
</template>

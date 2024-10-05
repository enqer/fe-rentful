<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import Logo from '../../components/Logo.vue';
import { ref } from 'vue';
import { passwordRegex, emailRegex, lettersRegex } from '../../constants/Regex';
import { identityApi } from '../../api/IdentityApi';
import BtnStepForm from '@/components/identity/BtnStepForm.vue';
import type { RegisterUser } from '@/types/models';
import router from '@/router';
import { ResponseStatusEnum, RouterNameEnum } from '@/types/enums';

const { width } = useWindowSize();
const { registerUserAsync } = identityApi();

const step = ref(1);
const stepper = ref();
const email = ref('');
const firstname = ref('');
const lastname = ref('');
const password = ref('');
const passwordRepeat = ref('');
const isPasswordHide = ref(true);

async function registerUser() {
  const user: RegisterUser = {
    email: email.value,
    firstName: firstname.value,
    lastName: lastname.value,
    password: password.value,
  };
  const result = await registerUserAsync(user);
  if (result?.status === ResponseStatusEnum.Ok) {
    router.push(RouterNameEnum.Login);
  }
}
</script>
<template>
  <q-page class="tw-w-full tw-justify-center tw-items-center tw-flex">
    <main
      class="tw-w-full lg:tw-w-3/4 xl:tw-w-4/6 2xl:tw-w-3/5 tw-rounded-xl tw-p-6 lg:tw-py-10 lg:tw-px-20 tw-flex-col xl:tw-flex-row tw-flex tw-justify-between lg:tw-shadow-2xl !tw-bg-white"
    >
      <div class="tw-flex tw-flex-col tw-items-center xl:tw-items-start">
        <Logo class="tw-size-36 sm:tw-size-52 md:tw-size-56 xl:tw-size-42" />
        <p class="tw-text-lg sm:tw-text-2xl md:tw-text-3xl xl:tw-text-2xl tw-font-medium">
          Zarejestruj się
        </p>
      </div>
      <div class="">
        <q-stepper
          ref="stepper"
          v-model="step"
          :vertical="width < 640"
          class="no-shadow"
          animated
        >
          <q-step :name="1" :done="step > 1" title="Podaj email" active-icon="mail">
            <q-form @submit="stepper.next()">
              <q-input
                v-model="email"
                :rules="[(val: string) => (val && emailRegex.test(val)) || 'Nieprawidłowy email']"
                label="Email"
                lazy-rules
                outlined
              />
              <btn-step-form :step="step" />
            </q-form>
          </q-step>
          <q-step :name="2" :done="step > 2" title="Dane osobowe" icon="edit">
            <q-form @submit="stepper.next()">
              <q-input
                v-model="firstname"
                :rules="[(val: string) => (val && lettersRegex.test(val)) || 'Pole musi składać się z liter']"
                label="Imię"
                lazy-rules
                outlined
              />
              <q-input
                v-model="lastname"
                :rules="[(val: string) => (val && lettersRegex.test(val)) || 'Pole musi składać się z liter']"
                label="Nazwisko"
                lazy-rules
                outlined
              />
              <btn-step-form :step="step" />
            </q-form>
          </q-step>
          <q-step :name="3" title="Utwórz hasło" icon="lock" active-icon="lock">
            <q-form @submit="registerUser">
              <q-input
                v-model="password"
                :rules="[(val: string) => (val && passwordRegex.test(val)) || 'Hasło: min. 8 znaków, min. 1 duża litera, min. 1 mała litera, min. 1 cyfra, min. 1 znak specjalny']"
                :type="isPasswordHide ? 'password' : 'text'"
                label="Hasło"
                lazy-rules
                outlined
              >
                <template #append>
                  <q-icon
                    :name="isPasswordHide ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="isPasswordHide = !isPasswordHide"
                  />
                </template>
              </q-input>
              <q-input
                v-model="passwordRepeat"
                :rules="[(val: string) => (val && val === password) || 'Hasła nie są takie same']"
                :type="isPasswordHide ? 'password' : 'text'"
                label="Powtórz hasło"
                lazy-rules
                outlined
              >
                <template #append>
                  <q-icon
                    :name="isPasswordHide ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="isPasswordHide = !isPasswordHide"
                  />
                </template>
              </q-input>
              <btn-step-form :step="step" />
            </q-form>
          </q-step>
        </q-stepper>
      </div>
    </main>
  </q-page>
</template>

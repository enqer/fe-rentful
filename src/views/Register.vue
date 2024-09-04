<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import Logo from '@/components/Logo.vue';
import { ref } from 'vue';
import { passwordRegex, emailRegex, lettersRegex } from '@/services/regexService';
const { width } = useWindowSize();

const step = ref(1);
const stepper = ref();
const email = ref('');
const firstname = ref('');
const lastname = ref('');
const emailRef = ref();
const password = ref('');
const firstnameRef = ref();
const lastnameRef = ref();
const passwordRef = ref();
const passwordRepeatRef = ref();

const passwordRepeat = ref('');
const isPasswordHide = ref(true);
const isPasswordRepeatHide = ref(true);

function onContinueStep() {
  switch (step.value) {
    case 1:
      emailRef.value.validate();
      if (!emailRef.value.hasError) {
        stepper.value.next();
      }
      break;
    case 2:
      isPasswordHide.value = true;
      isPasswordRepeatHide.value = true;
      firstnameRef.value.validate();
      lastnameRef.value.validate();
      if (!firstnameRef.value.hasError && !lastnameRef.value.hasError) {
        stepper.value.next();
      }
      break;
    case 3:
      passwordRef.value.validate();
      passwordRepeatRef.value.validate();
      if (!passwordRef.value.hasError && !passwordRepeatRef.value.hasError) {
        console.log('end');
      }
      break;
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
            <q-input
              ref="emailRef"
              v-model="email"
              :rules="[(val: string) => (val && emailRegex.test(val)) || 'Pole nie może być puste']"
              label="Email"
              lazy-rules
              outlined
            />
          </q-step>

          <q-step :name="2" :done="step > 2" title="Dane osobowe" icon="edit">
            <q-input
              ref="firstnameRef"
              v-model="firstname"
              :rules="[(val: string) => (val && lettersRegex.test(val)) || 'Pole nie może być puste']"
              label="Imię"
              lazy-rules
              outlined
            />
            <q-input
              ref="lastnameRef"
              v-model="lastname"
              :rules="[(val: string) => (val && lettersRegex.test(val)) || 'Pole nie może być puste']"
              label="Nazwisko"
              lazy-rules
              outlined
            />
          </q-step>

          <q-step :name="3" title="Utwórz hasło" icon="lock" active-icon="lock">
            <q-input
              ref="passwordRef"
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
              ref="passwordRepeatRef"
              v-model="passwordRepeat"
              :rules="[(val: string) => (val && val === password) || 'Hasła nie są takie same']"
              :type="isPasswordRepeatHide ? 'password' : 'text'"
              :class="[
                passwordRef != undefined && passwordRef.hasError ? 'tw-mt-8' : 'tw-mt-2',
              ]"
              label="Powtórz hasło"
              lazy-rules
              outlined
            >
              <template #append>
                <q-icon
                  :name="isPasswordRepeatHide ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="isPasswordRepeatHide = !isPasswordRepeatHide"
                />
              </template>
            </q-input>
          </q-step>

          <template #navigation>
            <q-stepper-navigation class="row tw-justify-end">
              <q-btn
                v-if="step > 1"
                class="q-ml-md sm:tw-text-lg xl:tw-text-base"
                label="Powrót"
                flat
                @click="stepper.previous()"
              />
              <q-btn
                :label="step === 4 ? 'Zakończ' : 'Dalej'"
                class="sm:tw-text-lg xl:tw-text-base !tw-bg-primary tw-px-6"
                color="primary"
                @click="onContinueStep()"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </main>
  </q-page>
</template>

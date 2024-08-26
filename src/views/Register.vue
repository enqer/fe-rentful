<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import Logo from '@/components/Logo.vue';
import { ref } from 'vue';

const { width } = useWindowSize();
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const lettersRegex = /^[a-zA-Z]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
const isPasswordHide = ref(false);
const isPasswordRepeatHide = ref(false);

function onContinueStep() {
  switch (step.value) {
    case 1:
      emailRef.value.validate();
      if (!emailRef.value.hasError) {
        stepper.value.next();
      }
      break;
    case 2:
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
  <q-page class="tw-w-full tw-justify-center tw-items-center tw-flex tw-bg-gray-100">
    <main
      class="tw-w-full md:tw-w-1/2 tw-rounded-xl tw-p-6 tw-flex-col md:tw-flex-row tw-flex tw-justify-between tw-shadow-md !tw-bg-white"
    >
      <div class="tw-flex tw-flex-col tw-justify-between">
        <div>
          <Logo class="tw-size-36" />
          <p class="tw-text-lg">Zarejestruj się</p>
        </div>
        <div>
          <p>Regulamin</p>
        </div>
      </div>
      <div class="">
        <q-stepper
          ref="stepper"
          v-model="step"
          :vertical="width < 760"
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
              :type="isPasswordHide ? 'text' : 'password'"
              label="Hasło"
              lazy-rules
              outlined
            >
              <template #append>
                <q-icon
                  :name="isPasswordHide ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPasswordHide = !isPasswordHide"
                />
              </template>
            </q-input>
            <q-input
              ref="passwordRepeatRef"
              v-model="passwordRepeat"
              :rules="[(val: string) => (val && val === password) || 'Hasła nie są takie same']"
              :type="isPasswordRepeatHide ? 'text' : 'password'"
              class="tw-mt-4"
              label="Powtórz hasło"
              lazy-rules
              outlined
            >
              <template #append>
                <q-icon
                  :name="isPasswordRepeatHide ? 'visibility_off' : 'visibility'"
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
                class="q-ml-sm"
                label="Powrót"
                flat
                @click="stepper.previous()"
              />
              <q-btn
                :label="step === 4 ? 'Zakończ' : 'Dalej'"
                class="test !tw-bg-primary"
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

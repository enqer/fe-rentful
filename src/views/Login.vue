<script setup lang="ts">
import { ref } from 'vue';
import Logo from '@/components/Logo.vue';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

async function onSubmit() {}

async function onReset() {}
</script>
<template>
  <q-page class="column justify-center items-center">
    <main
      class="tw-w-full tw-h-full md:tw-w-3/4 lg:tw-w-1/2 tw-p-6 tw-flex tw-flex-col tw-justify-between"
    >
      <q-card
        class="tw-flex tw-flex-col justify-between no-shadow !xl:tw-shadow-2xl xl:tw-py-10 xl:tw-px-20"
      >
        <div class="q-pa-md col-6 tw-flex tw-flex-col tw-items-center">
          <Logo class="tw-size-52 md:tw-size-72 xl:tw-size-52" />
          <p class="tw-text-3xl md:tw-text-4xl xl:tw-text-3xl tw-font-medium">
            Zaloguj się
          </p>
        </div>
        <q-form class="q-gutter-md col-6" @submit="onSubmit" @reset="onReset">
          <q-input
            v-model="email"
            :rules="[(val: string) => (val && val.length > 0) || 'Pole nie może zostać puste']"
            class="md:tw-text-2xl"
            label="Email"
            lazy-rules
            outlined
          />
          <q-input
            v-model="password"
            :rules="[(val: string) => (val !== null && val !== '') || 'Pole nie może zostać puste']"
            class="md:tw-text-2xl"
            label="Hasło"
            outlined
            lazy-rules
          />
          <div class="tw-flex justify-between md:tw-text-xl xl:tw-text-base">
            <div class="row items-center">
              <q-checkbox v-model="rememberMe" />
              <q-item-label>Zapamiętaj mnie</q-item-label>
            </div>
            <div class="row items-center">
              <q-item-label class="cursor-pointer"> Nie pamiętam hasła </q-item-label>
            </div>
          </div>
          <div class="tw-flex tw-justify-center md:tw-mt-8">
            <q-btn
              class="text-capitalize tw-px-6 tw-py-2 md:tw-text-xl"
              label="Zaloguj"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </q-card>
    </main>
  </q-page>
</template>

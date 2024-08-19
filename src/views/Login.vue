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
    <main>
      <q-card class="q-pa-md row justify-between">
        <div class="q-pa-md col-6">
          <Logo />
          <p>Zaloguj się</p>
        </div>
        <q-form class="q-gutter-md col-6" @submit="onSubmit" @reset="onReset">
          <q-input
            v-model="email"
            :rules="[(val: string) => (val && val.length > 0) || 'Pole nie może zostać puste']"
            label="Email"
            lazy-rules
            outlined
          />
          <q-input
            v-model="password"
            :rules="[(val: string) => (val !== null && val !== '') || 'Pole nie może zostać puste']"
            label="Hasło"
            outlined
            lazy-rules
          />
          <div class="row justify-between">
            <div class="q-pa-md row items-center">
              <q-checkbox v-model="rememberMe" />
              <q-item-label>Zapamiętaj mnie</q-item-label>
            </div>
            <div class="q-pa-md row items-center">
              <q-item-label class="cursor-pointer">Nie pamiętam hasła</q-item-label>
            </div>
          </div>
          <div class="row justify-end">
            <q-btn
              class="q-mr-sm text-capitalize"
              label="Reset"
              type="reset"
              color="primary"
              flat
            />
            <q-btn class="text-capitalize" label="Dalej" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card>
      <div class="row justify-between">
        <div>
          <p>Pomoc</p>
        </div>
        <div class="row">
          <p>Prywatność</p>
          <p>Warunki</p>
        </div>
      </div>
    </main>
  </q-page>
</template>

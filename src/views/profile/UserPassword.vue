<script setup lang="ts">
import { ref } from 'vue';
import { passwordRegex } from '@/services/regexService';
import ProfileHeader from './ProfileHeader.vue';

const passwordRef = ref();
const passwordRepeatRef = ref();
const password = ref('');
const passwordRepeat = ref('');
const isPasswordHide = ref(true);
const isPasswordRepeatHide = ref(true);

function changePassword() {
  passwordRef.value.validate();
  if (!passwordRef.value.hasError) {
    console.log('submit');
  }
}
</script>
<template>
  <main>
    <profile-header label="zmień hasło" />
    <form>
      <q-input
        ref="passwordRef"
        v-model="password"
        :rules="[(val: string) => (val && passwordRegex.test(val)) || 'Hasło: min. 8 znaków, min. 1 duża litera, min. 1 mała litera, min. 1 cyfra, min. 1 znak specjalny']"
        :type="isPasswordHide ? 'password' : 'text'"
        class="tw-mb-5"
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
      <div class="tw-flex tw-justify-center">
        <q-btn
          class="!tw-bg-primary tw-px-7 tw-text-white tw-capitalize"
          label="Zmień"
          @click="changePassword"
        />
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import router from '@/router/index';

async function switchToLogin() {
  router.push('/login');
}
async function switchToRegister() {
  router.push('/register');
}
</script>
<template>
  <q-page class="column justify-center">
    <div
      class="row items-center justify-evenly full-height tw-grow-1 tw-flex-wrap sm:tw-flex-col md:tw-flex-row"
    >
      <div class="tw-w-4/5 md:tw-w-1/2 row tw-justify-start md:tw-justify-center">
        <logo class="md:tw-size-[420px] tw-size-32" />
      </div>
      <div class="tw-w-4/5 md:tw-w-1/2 row tw-justify-center">
        <div class="tw-flex-col tw-w-3/4">
          <h3 class="tw-font-extrabold tw-text-7xl tw-leading-25 tw-pb-8">
            Lorem ipsum dolor sit amet.
          </h3>
          <div>
            <h5 class="tw-font-extrabold tw-text-3xl tw-pb-8 !tw-text-primary">
              Dołącz już dziś.
            </h5>
            <q-btn
              class="text-capitalize tw-rounded-3xl tw-w-72 tw-p-2"
              label="Utwórz konto"
              type="submit"
              @click="switchToRegister()"
            />
            <div class="tw-mt-8">
              <p class="hover:tw-underline">Masz już konto?</p>
              <q-btn
                class="text-capitalize tw-rounded-3xl tw-w-72 tw-p-2 !tw-bg-green-500"
                label="Zaloguj się"
                type="submit"
                @click="switchToLogin()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row tw-gap-x-4 tw-justify-center">
      <p class="hover:tw-underline tw-cursor-pointer">Informacje</p>
      <p class="hover:tw-underline tw-cursor-pointer">Zasady użytkowania</p>
      <p class="hover:tw-underline tw-cursor-pointer">Polityka prywatności</p>
      <p>© 2024 Rentful</p>
    </div>
  </q-page>
</template>

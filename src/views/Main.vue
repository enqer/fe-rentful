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
      class="tw-flex tw-flex-col lg:tw-flex-row items-center full-height tw-my-10 tw-gap-y-14 md:tw-gap-y-8 tw-grow-1 tw-flex-wrap"
    >
      <div class="tw-w-4/5 lg:tw-w-1/2 row tw-justify-start lg:tw-justify-center">
        <logo
          class="tw-size-42 sm:tw-size-36 md:tw-size-52 lg:tw-size-96 xl:tw-size-96 2xl:tw-size-3/6"
        />
      </div>
      <div class="tw-w-full lg:tw-w-1/2 row tw-justify-center">
        <div class="tw-flex-col tw-w-3/4">
          <h3
            class="tw-font-extrabold tw-text-5xl lg:tw-text-6xl xl:tw-text-7xl tw-leading-15 lg:tw-leading-20 xl:tw-leading-25 2xl:tw-leading-30 tw-pb-8 tw-my-5 sm:tw-my-0"
          >
            Wynajem pod kontrolą.
          </h3>
          <div>
            <h5
              class="tw-font-extrabold tw-text-xl xl:tw-text-2xl 2xl:tw-text-3xl tw-pb-8 !tw-text-primary"
            >
              Dołącz już dziś
            </h5>
            <div class="tw-flex tw-flex-col tw-items-center 2xl:tw-w-4/5">
              <q-btn
                class="text-capitalize tw-rounded-3xl tw-w-full sm:tw-w-3/5 lg:tw-w-3/4 xl:tw-w-3/5 tw-p-2"
                label="Utwórz konto"
                type="submit"
                @click="switchToRegister()"
              />
              <div
                class="tw-flex tw-items-center tw-justify-center tw-w-full sm:tw-w-3/5 lg:tw-w-3/4 xl:tw-w-3/5 tw-m-2"
              >
                <q-separator class="tw-h-[2px] tw-w-2/5" />
                <p class="tw-m-0 tw-px-2">lub</p>
                <q-separator class="tw-h-[2px] tw-w-2/5" />
              </div>
              <q-btn
                class="text-capitalize tw-text-white tw-rounded-3xl tw-w-full sm:tw-w-3/5 lg:tw-w-3/4 xl:tw-w-3/5 tw-p-2 !tw-bg-primary"
                label="Zaloguj się"
                type="submit"
                @click="switchToLogin()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tw-flex tw-gap-x-4 tw-justify-center tw-whitespace-nowrap tw-flex-wrap">
      <p class="hover:tw-underline tw-cursor-pointer">Informacje</p>
      <p class="hover:tw-underline tw-cursor-pointer">Zasady użytkowania</p>
      <p class="hover:tw-underline tw-cursor-pointer">Polityka prywatności</p>
      <p>© 2024 Rentful</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ProfileItem from './ProfileItem.vue';
</script>
<template>
  <q-page class="tw-flex tw-justify-center lg:tw-m-10">
    <main
      class="tw-flex tw-flex-col tw-w-full lg:tw-w-4/5 xl:tw-w-3/4 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-p-5"
    >
      <div class="tw-flex tw-flex-col tw-w-full tw-gap-y-3 tw-mb-10">
        <span class="tw-text-3xl tw-font-semibold tw-capitalize">profil</span>
        <span class="tw-text-lg tw-text-gray-500 first-letter:tw-capitalize">
          zarządzaj danymi i preferencjami
        </span>
        <q-separator />
      </div>
      <div class="tw-flex-col lg:tw-flex-row tw-flex tw-gap-y-10 tw-justify-between">
        <div
          class="tw-flex-row tw-flex lg:tw-flex-col tw-items-center lg:tw-items-start tw-gap-3"
        >
          <profile-item path="/details" name="dane użytkownika" />
          <profile-item path="/address" name="Adres zamieszkania" />
          <profile-item path="/address-correspondence" name="adres korespondencyjny" />
          <profile-item path="/password" name="Hasło" />
        </div>
        <div class="tw-w-full lg:tw-w-3/4">
          <router-view />
        </div>
      </div>
    </main>
  </q-page>
</template>

<script setup lang="ts">
import ProfileItem from './ProfileItem.vue';
</script>
<template>
  <q-page class="tw-flex tw-justify-center tw-m-10">
    <main
      class="tw-flex tw-flex-col tw-w-2/3 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-p-5"
    >
      <div class="tw-flex tw-flex-col tw-w-full tw-gap-y-3 tw-mb-10">
        <span class="tw-text-3xl tw-font-semibold tw-capitalize">profil</span>
        <span class="tw-text-lg tw-text-gray-500 first-letter:tw-capitalize">
          zarządzaj danymi i preferencjami
        </span>
        <q-separator />
      </div>
      <div class="tw-flex tw-justify-between">
        <div class="tw-flex tw-flex-col tw-gap-y-3 tw-h-1/4">
          <profile-item path="/details" name="dane użytkownika" />
          <profile-item path="/address" name="Adres zamieszkania" />
          <profile-item path="/address-correspondence" name="adres korespondencyjny" />
          <profile-item path="/password" name="Hasło" />
        </div>
        <div class="tw-w-3/4">
          <router-view />
        </div>
      </div>
    </main>
  </q-page>
</template>

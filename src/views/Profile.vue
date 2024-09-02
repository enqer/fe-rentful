<script setup lang="ts">
import ProfileItem from '@/components/ProfileItem.vue';
</script>
<template>
  <q-page class="tw-flex tw-justify-center tw-m-10">
    <main
      class="tw-flex tw-flex-col tw-w-2/3 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-p-5"
    >
      <div class="tw-flex tw-flex-col tw-w-full tw-gap-y-3 tw-mb-10">
        <span class="tw-text-3xl tw-font-semibold tw-capitalize">profile</span>
        <span class="tw-text-lg tw-text-gray-500 first-letter:tw-capitalize">
          manage your profile settings and preferences.
        </span>
        <q-separator />
      </div>
      <div class="tw-flex tw-justify-between">
        <div class="tw-flex tw-flex-col tw-gap-y-3 tw-h-1/4">
          <profile-item path="/" name="Dane" />
          <profile-item path="/" name="Adres zamieszkania" />
          <profile-item path="/" name="adres korespondencyjny" />
          <profile-item path="/" name="Hasło" />
        </div>
        <div class="tw-w-3/4">pqweqwe</div>
      </div>
    </main>
  </q-page>
</template>

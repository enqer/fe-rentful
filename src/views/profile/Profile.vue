<script setup lang="ts">
import SelectPageItem from '@/components/SelectPageItem.vue';
import { RouterUrlEnum } from '@/types/enums';
</script>
<template>
  <div class="tw-flex tw-justify-center lg:tw-m-10">
    <main
      class="tw-flex tw-flex-col tw-w-full lg:tw-w-4/5 xl:tw-w-3/4 tw-border tw-border-solid tw-border-gray-300 tw-rounded-lg tw-p-5"
    >
      <div class="tw-flex tw-flex-col tw-w-full tw-gap-y-3 tw-mb-10">
        <span class="tw-text-3xl tw-font-semibold tw-capitalize">profil</span>
        <span class="tw-text-lg tw-text-gray-500 first-letter:tw-capitalize">
          zarządzaj swoim profilem
        </span>
        <q-separator />
      </div>
      <div class="tw-flex-col lg:tw-flex-row tw-flex tw-gap-y-10 tw-justify-between">
        <div
          class="tw-flex-row tw-flex lg:tw-flex-col tw-items-center lg:tw-items-start tw-gap-3 tw-flex-wrap"
        >
          <select-page-item
            :path="RouterUrlEnum.ProfileDetails"
            name="dane użytkownika"
          />

          <select-page-item
            :path="RouterUrlEnum.ProfileAddress"
            name="Adres zamieszkania"
          />
          <select-page-item :path="RouterUrlEnum.ProfilePrivacy" name="Hasło" />
          <select-page-item
            :path="RouterUrlEnum.ProfileReservations"
            name="rezerwacje spotkań"
          />
          <select-page-item
            :path="RouterUrlEnum.ProfileLeaseAgreements"
            name="Otrzymane umowy"
          />
        </div>
        <div class="tw-w-full lg:tw-w-3/4">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

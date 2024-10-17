<script setup lang="ts">
defineProps<{
  contactId?: number;
}>();
</script>
<template>
  <q-card class="tw-w-1/4 tw-h-full tw-bg-gray-800">
    <div class="tw-p-5">
      <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-mb-6">
        <q-avatar class="tw-m-4">
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
        <div>
          <span class="tw-text-lg tw-capitalize tw-block">rick sorkin</span>
        </div>
      </div>
      <div class="tw-flex tw-justify-center tw-gap-x-5">
        <div class="tw-flex tw-flex-col tw-items-center tw-cursor-pointer">
          <q-icon name="person" size="lg" />
          <span class="tw-capitalize tw-block">profil</span>
        </div>
        <div class="tw-flex tw-flex-col tw-items-center tw-cursor-pointer">
          <q-icon name="person_off" size="lg" />
          <span class="tw-capitalize tw-block">zablokuj</span>
        </div>
        <div class="tw-flex tw-flex-col tw-items-center tw-cursor-pointer">
          <q-icon name="manage_accounts" size="lg" />
          <span class="tw-capitalize tw-block">zarządzaj</span>
        </div>
      </div>
      <q-list>
        <q-expansion-item
          class="tw-text-base hover:!tw-bg-transparent"
          label="Dostosuj czat"
        >
          <q-card class="!tw-bg-transparent">
            <q-card-section class="tw-flex tw-flex-col">
              <span class="tw-cursor-pointer">Zmień motyw</span>
              <span class="tw-cursor-pointer">Zmień ikonę emoji</span>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          class="tw-text-base hover:!tw-bg-transparent"
          label="Prywatność i pomoc"
        >
          <q-card class="!tw-bg-transparent">
            <q-card-section class="tw-flex tw-flex-col">
              <span class="tw-cursor-pointer">Zweryfikuj</span>
              <span class="tw-cursor-pointer">Zgłoś</span>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </q-card>
</template>
<style scoped></style>

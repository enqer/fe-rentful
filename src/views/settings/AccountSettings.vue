<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import { ref } from 'vue';

const isPolishLang = ref(true);
</script>
<template>
  <main>
    <page-header label="konto" />
    <div class="tw-flex tw-flex-col tw-gap-y-10">
      <div class="tw-flex tw-gap-x-10">
        <div class="tw-w-1/3">
          <span class="tw-text-base">Język</span>
        </div>
        <div class="q-gutter-sm tw-flex tw-flex-col">
          <q-radio v-model="isPolishLang" :val="true" label="Polski" />
          <q-radio v-model="isPolishLang" :val="false" label="Angielski" />
        </div>
      </div>
      <div class="tw-flex tw-gap-x-10">
        <q-btn label="Usuń konto" color="primary" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import { ref } from 'vue';

const isNotifyTurnOn = ref(true);
const isAutoDeleteNotify = ref(false);
</script>
<template>
  <main>
    <page-header label="powiadomienia" />
    <div class="tw-flex tw-flex-col tw-gap-y-10">
      <div class="tw-flex tw-gap-x-10">
        <div class="tw-w-1/3">
          <span class="tw-text-base">Wyświetlanie powiadomień</span>
        </div>
        <div class="q-gutter-sm tw-flex tw-flex-col">
          <q-radio v-model="isNotifyTurnOn" :val="true" label="Włącz" />
          <q-radio v-model="isNotifyTurnOn" :val="false" label="Wyłącz" />
        </div>
      </div>
      <div class="tw-flex tw-gap-x-10">
        <div class="tw-w-1/3">
          <span class="tw-text-base">
            Automatycznie usuwaj powiadomienia po przeczytaniu
          </span>
        </div>
        <div class="q-gutter-sm tw-flex tw-flex-col">
          <q-radio v-model="isAutoDeleteNotify" :val="true" label="Włącz" />
          <q-radio v-model="isAutoDeleteNotify" :val="false" label="Wyłącz" />
        </div>
      </div>
    </div>
  </main>
</template>

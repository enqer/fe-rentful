<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import type { PrivacyOptions } from '@/types/models';
import { ref } from 'vue';

const analysis = ref(false);
const contacts = ref(false);
const marketing = ref(true);
const polls = ref(true);
const sharing = ref(false);
</script>
<template>
  <main>
    <page-header label="prywatność" />
    <div class="tw-flex tw-flex-col tw-gap-y-10">
      <q-checkbox
        v-model="analysis"
        label="Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z Polityką Prywatności."
      />
      <q-checkbox
        v-model="marketing"
        label="Wyrażam zgodę na otrzymywanie materiałów marketingowych."
      />
      <q-checkbox
        v-model="contacts"
        label="Wyrażam zgodę na dostęp do moich kontaktów."
      />
      <q-checkbox
        v-model="sharing"
        label="Wyrażam zgodę na udostępnianie moich danych partnerom zewnętrznym w celu realizacji usług."
      />
      <q-checkbox
        v-model="polls"
        label="Wyrażam zgodę na uczestnictwo w badaniach i ankietach."
      />
    </div>
  </main>
</template>

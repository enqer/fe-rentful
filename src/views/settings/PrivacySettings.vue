<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import type { PrivacyOptions } from '@/types/models';
import { ref } from 'vue';

const privacy = ref<PrivacyOptions | null>({
  analysis: false,
  contacts: true,
  marketing: true,
  polls: true,
  sharing: false,
});
</script>
<template>
  <main>
    <page-header label="prywatność" />
    <div class="tw-flex tw-flex-col tw-gap-y-10">
      <q-checkbox
        :v-model="privacy?.analysis"
        label="Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z Polityką Prywatności."
      />
      <q-checkbox
        :v-model="privacy?.marketing"
        label="Wyrażam zgodę na otrzymywanie materiałów marketingowych."
      />
      <q-checkbox
        :v-model="privacy?.contacts"
        label="Wyrażam zgodę na dostęp do moich kontaktów."
      />
      <q-checkbox
        :v-model="privacy?.sharing"
        label="Wyrażam zgodę na udostępnianie moich danych partnerom zewnętrznym w celu realizacji usług."
      />
      <q-checkbox
        :v-model="privacy?.polls"
        label="Wyrażam zgodę na uczestnictwo w badaniach i ankietach."
      />
    </div>
  </main>
</template>

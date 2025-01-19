<script setup lang="ts">
import { addReportAsync } from '@/api/ReportApi';
import { useNotify } from '@/composables/useNotify';
import { ReportTypeEnum } from '@/types/enums';
import type { NewReport } from '@/types/models/Report';
import { ref } from 'vue';

const reportOptions = [
  {
    label: 'Dowolny',
    value: ReportTypeEnum.Any,
  },
  {
    label: 'Usterka',
    value: ReportTypeEnum.Failure,
  },
  {
    label: 'Płatność',
    value: ReportTypeEnum.Payment,
  },
];

const props = defineProps({
  agreementId: {
    type: Number,
    required: true,
  },
});

const { showSuccess, showWarning } = useNotify();

const selectedReport = ref<{ label: string; value: ReportTypeEnum } | null>(null);
const description = ref('');
const showDialog = defineModel<boolean>();
const loading = ref(false);

async function addReport() {
  loading.value = true;
  const newReport: NewReport = {
    description: description.value,
    type: selectedReport.value?.value ?? 0,
    agreementId: props.agreementId,
  };

  const result = await addReportAsync(newReport);
  loading.value = true;
  if (result?.status === 200) {
    showSuccess('Zgłoszenie', 'Pomyślnie dodano zgłoszenie');
    showDialog.value = false;
    return;
  }
  showWarning('Zgłoszenie', 'Operacja nie powiodła się');
}
</script>
<template>
  <q-dialog
    v-model="showDialog"
    @hide="
      selectedReport = null;
      description = '';
    "
  >
    <q-card class="tw-p-4 tw-min-w-1/4">
      <div class="tw-flex tw-justify-between tw-items-center">
        <div class="tw-text-base">Dodaj zgłoszenie</div>
        <q-btn icon="close" flat @click="showDialog = false" />
      </div>
      <q-separator />
      <div class="tw-flex tw-flex-col tw-gap-y-4 tw-my-4">
        <div>
          <div>Rodzaj zgłoszenia:</div>
          <q-select v-model="selectedReport" :options="reportOptions" outlined dense />
        </div>
        <div>
          <div>Opis:</div>
          <q-input v-model="description" type="textarea" outlined dense />
        </div>
      </div>
      <div class="tw-flex tw-justify-end">
        <q-btn label="Anuluj" color="primary" flat no-caps @click="showDialog = false" />
        <q-btn
          :disabled="!selectedReport || description.length === 0"
          label="Wyślij zgłoszenie"
          color="primary"
          no-caps
          @click="addReport"
        />
      </div>
    </q-card>
    <q-inner-loading :showing="loading" color="primary" />
  </q-dialog>
</template>

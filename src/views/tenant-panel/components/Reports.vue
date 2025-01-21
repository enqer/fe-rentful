<script setup lang="ts">
import { getReportsAsync, resolveReportAsync } from '@/api/ReportApi';
import type { Report, ResolveReport } from '@/types/models/Report';
import { onMounted, ref } from 'vue';
import { REPORT_COLUMNS } from '../constants/Columns';
import { ReportStatusEnum, ReportTypeEnum } from '@/types/enums';
import { useNotify } from '@/composables/useNotify';

const options = [
  {
    label: 'Odrzucone',
    value: ReportStatusEnum.Rejected,
  },
  {
    label: 'Rozwiązane',
    value: ReportStatusEnum.Resolved,
  },
];

const props = defineProps({
  agreementId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
});

const { showSuccess, showWarning } = useNotify();

const reports = ref<Report[]>([]);
const showDialog = ref(false);
const loading = ref(false);
const description = ref('');
const selectedStatus = ref(ReportStatusEnum.Unresolved);
const selectedReportId = ref<number>();
const tableKey = ref<number>(0);

async function setReports() {
  const result = await getReportsAsync(props.agreementId);
  reports.value = result?.data ?? [];
}

async function resolveReport() {
  if (!selectedStatus.value || !selectedReportId.value) {
    return;
  }
  const report: ResolveReport = {
    feedback: description.value,
    reportId: selectedReportId.value,
    status: selectedStatus.value,
  };
  const result = await resolveReportAsync(report);
  if (result?.status === 200) {
    showSuccess('Powiodło się', 'Rozwiązano zgłoszenie');
    await setReports();
    tableKey.value++;
    showDialog.value = false;
    return;
  }
  showWarning('Nie powiodł się', 'Zgłoszenie nie rozpatrzone');
}

function getStatusName(status: ReportStatusEnum) {
  switch (status) {
    case ReportStatusEnum.Rejected:
      return 'Odrzucony';
    case ReportStatusEnum.Unresolved:
      return 'Nierozwiązany';
    case ReportStatusEnum.Resolved:
      return 'Rozwiązany';
  }
}

function getTypeName(status: ReportTypeEnum) {
  switch (status) {
    case ReportTypeEnum.Any:
      return 'Dowolny';
    case ReportTypeEnum.Failure:
      return 'Usterka';
    case ReportTypeEnum.Payment:
      return 'Płatności';
  }
}

onMounted(async () => await setReports());
</script>
<template>
  <div>
    <q-table
      :key="tableKey"
      :title="title.length > 0 ? title : ''"
      :rows="reports"
      :columns="REPORT_COLUMNS"
      row-key="id"
      table-header-class="bg-primary tw-text-white"
      title-class="tw-text-base"
    >
      <template #header="scope">
        <q-tr :props="scope" class="bg-primary tw-text-white">
          <q-th v-for="col in scope.cols" :key="col.name" :props="scope">
            {{ col.label }}
          </q-th>
          <q-th auto-width />
        </q-tr>
      </template>
      <template #body="scope">
        <q-tr :props="scope">
          <q-td
            v-for="col in scope.cols"
            :key="col.name"
            :props="scope"
            class="tw-font-medium tw-text-base"
            auto-width
          >
            <div v-if="col.name === 'status'">{{ getStatusName(col.value) }}</div>
            <div v-else-if="col.name === 'type'">{{ getTypeName(col.value) }}</div>
            <div v-else>
              {{ col.value }}
            </div>
          </q-td>
          <q-td auto-width>
            <q-btn
              :icon="scope.expand ? 'remove' : 'add'"
              size="sm"
              color="blue-9"
              round
              dense
              @click="scope.expand = !scope.expand"
            />
            <q-btn
              icon="more_vert"
              size="sm"
              class="tw-ml-4"
              color="primary"
              round
              dense
              @click="
                showDialog = true;
                selectedReportId = scope.row.id;
              "
            />
          </q-td>
        </q-tr>
        <q-tr v-show="scope.expand" :props="scope">
          <q-td colspan="100%">
            <div class="tw-flex tw-justify-evenly">
              <div class="text-left">
                <div class="tw-text-gray-400 tw-font-semibold">Opis zgłoszenia:</div>
                <div>{{ scope.row.description }}</div>
              </div>
              <div class="text-left">
                <div class="tw-text-gray-400 tw-font-semibold">
                  Odpowiedź właściciela:
                </div>
                <div>{{ scope.row.feedback || '---' }}</div>
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog
      v-model="showDialog"
      @hide="
        selectedReportId = undefined;
        description = '';
      "
    >
      <q-card class="tw-p-4 tw-min-w-1/4">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-text-base">Rozwiąż zgłoszenie</div>
          <q-btn icon="close" flat @click="showDialog = false" />
        </div>
        <q-separator />
        <div class="tw-flex tw-flex-col tw-gap-y-4 tw-my-4">
          <div>
            <q-option-group
              v-model="selectedStatus"
              :options="options"
              color="primary"
              inline
            />
          </div>
          <div>
            <div>Opis:</div>
            <q-input v-model="description" type="textarea" outlined dense />
          </div>
        </div>
        <div class="tw-flex tw-justify-end">
          <q-btn
            label="Anuluj"
            color="primary"
            flat
            no-caps
            @click="showDialog = false"
          />
          <q-btn
            label="Rozwiąż zgłoszenie"
            color="primary"
            no-caps
            @click="resolveReport"
          />
        </div>
      </q-card>
      <q-inner-loading :showing="loading" color="primary" />
    </q-dialog>
  </div>
</template>

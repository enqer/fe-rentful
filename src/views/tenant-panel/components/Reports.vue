<script setup lang="ts">
import { getReportsAsync } from '@/api/ReportApi';
import type { Report } from '@/types/models/Report';
import { onMounted, ref } from 'vue';
import { REPORT_COLUMNS } from '../constants/Columns';
import { ReportStatusEnum, ReportTypeEnum } from '@/types/enums';

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

const reports = ref<Report[]>([]);

async function setReports() {
  const result = await getReportsAsync(props.agreementId);
  reports.value = result?.data ?? [];
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
  <q-table
    :title="title.length > 0 ? title : ''"
    :rows="reports ?? []"
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
              <div class="tw-text-gray-400 tw-font-semibold">Odpowiedź właściciela:</div>
              <div>{{ scope.row.feedback || '---' }}</div>
            </div>
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import {
  addReservationsAsync,
  cancelReservationByOwnerAsync,
  getApartmentReservationsAsync,
} from '@/api/ReservationApi';
import type { AddReservations, ApartmentReservation } from '@/types/models/Reservation';
import { onMounted, ref, watch } from 'vue';
import { RESERVATION_COLUMNS } from '../constants/Columns';
import DateTimePicker from '@/components/DateTimePicker.vue';
import { useNotify } from '@/composables/useNotify';
import { ReservationStatusEnum } from '@/types/enums';

const props = defineProps({
  apartmentId: {
    type: Number,
    required: true,
  },
  hasAnnouncement: {
    type: Boolean,
    required: true,
  },
});

const { showSuccess, showWarning } = useNotify();

const loading = ref(false);
const apartmentReservations = ref<ApartmentReservation[]>([]);
const showAddReservationDialog = ref(false);
const addedReservations = ref<string[]>([]);

async function setReservations() {
  const result = await getApartmentReservationsAsync(props.apartmentId);
  apartmentReservations.value = result?.data ?? [];
}

function addReservation(date: string) {
  addedReservations.value = [date, ...addedReservations.value];
}

function deleteReservation(date: string) {
  const index = addedReservations.value.findIndex((x) => x === date);
  addedReservations.value.splice(index, 1);
}

async function addReservationToApartment() {
  const reservationsToAdd: AddReservations = {
    apartmentId: props.apartmentId,
    reservations: addedReservations.value,
  };
  const result = await addReservationsAsync(reservationsToAdd);
  if (result?.status === 200) {
    showSuccess('Rezerwacje', 'Pomyślnie dodano rezerwacje');
    await setReservations();
  }
  showAddReservationDialog.value = false;
}

function getStatusName(status: ReservationStatusEnum) {
  switch (status) {
    case ReservationStatusEnum.Available:
      return 'Dostępny';
    case ReservationStatusEnum.Unresolved:
      return 'Nierozwiązany';
    case ReservationStatusEnum.Approved:
      return 'Potwierdzony';
    case ReservationStatusEnum.Unapproved:
      return 'Niezatwierdzony';
    case ReservationStatusEnum.Unavailable:
      return 'Niedostępny';
    default:
      return 'Niedostępny';
  }
}
async function cancelReservation(reservationId: number) {
  loading.value = true;
  const result = await cancelReservationByOwnerAsync(reservationId);
  loading.value = false;
  if (result?.status === 200) {
    showSuccess('Powiodło się', 'Rezerwacja została odwołana');
    await setReservations();
    return;
  }
  showWarning('Wystąpił błąd', 'Odwołanie rezerwacji nie powiodło się');
}

watch(
  () => showAddReservationDialog.value,
  () => (addedReservations.value = [])
);

onMounted(async () => await setReservations());
</script>
<template>
  <q-table
    :rows="apartmentReservations"
    :columns="RESERVATION_COLUMNS"
    :loading="loading"
    row-key="reservationId"
    table-header-class="bg-primary tw-text-white"
  >
    <template #body-cell-lp="scope">
      <q-td :props="scope" auto-width> {{ scope.rowIndex + 1 }}.</q-td>
    </template>
    <template #body-cell-btn="scope">
      <q-td :props="scope" auto-width>
        <q-btn
          v-if="scope.row.status === ReservationStatusEnum.Available"
          icon="do_not_disturb_on"
          color="blue-9"
          flat
          @click="cancelReservation(scope.row.reservationId)"
        >
          <q-tooltip>Odmów rezerwacji</q-tooltip>
        </q-btn>
      </q-td>
    </template>
    <template #body-cell-status="scope">
      <q-td :props="scope"> {{ getStatusName(scope.row.status) }} </q-td>
    </template>
    <template v-if="hasAnnouncement" #top>
      <div class="tw-flex tw-justify-between tw-items-center tw-w-full">
        <div class="tw-text-base tw-font-medium">Zarządzaj rezerwacjami</div>
        <q-btn
          color="blue-9"
          label="Dodaj wolne rezerwacje"
          no-caps
          flat
          @click="showAddReservationDialog = true"
        />
      </div>
    </template>
  </q-table>
  <q-dialog v-model="showAddReservationDialog">
    <q-card class="tw-w-full tw-w-max-[300px] tw-p-4">
      <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <div class="tw-text-base">Dodanie wolnych rezerwacji</div>
        <q-btn icon="close" dense flat @click="showAddReservationDialog = false" />
      </div>
      <q-separator />
      <div class="tw-mb-8 tw-mt-4">
        <div>Wybierz nowe terminy</div>
        <div class="tw-my-2 tw-flex tw-gap-3 tw-flex-wrap">
          <q-badge
            v-for="(reservation, index) in addedReservations"
            :key="index"
            class="tw-p-2"
            color="primary"
          >
            {{ reservation }}
            <q-btn
              icon="close"
              size="sm"
              flat
              dense
              @click="deleteReservation(reservation)"
            />
          </q-badge>
          <DateTimePicker @on-picked-date-time="addReservation" />
        </div>
      </div>
      <div class="tw-flex tw-gap-x-2 tw-justify-center">
        <q-btn
          label="Anuluj"
          color="blue-9"
          no-caps
          flat
          @click="showAddReservationDialog = false"
        />
        <q-btn label="Dodaj" color="blue-9" no-caps @click="addReservationToApartment" />
      </div>
    </q-card>
  </q-dialog>
</template>

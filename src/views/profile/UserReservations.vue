<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { cancelReservationAsync, getUserReservationsAsync } from '@/api/ReservationApi';
import { useNotify } from '@/composables/useNotify';
import { ReservationStatusEnum } from '@/types/enums';
import type { UserReservation } from '@/types/models/Reservation';

import ReservationIcon from '@/components/ReservationIcon.vue';

const { showSuccess, showWarning } = useNotify();

const loading = ref(false);
const reservations = ref<UserReservation[]>([]);
const showDialogReservation = ref(false);
const selectedReservation = ref<UserReservation | null>(null);

const availableReservations = computed(() =>
  reservations.value
    .filter((x) => new Date(x.date) > new Date())
    .sort((a, b) => a.date.localeCompare(b.date))
);
const oldReservations = computed(() =>
  reservations.value
    .filter((x) => new Date(x.date) < new Date())
    .sort((a, b) => a.date.localeCompare(b.date))
);

function onSelectedReservation(reservation: UserReservation) {
  selectedReservation.value = reservation;
  showDialogReservation.value = true;
}

async function cancelReservation() {
  if (!selectedReservation.value) {
    return;
  }
  loading.value = true;
  const result = await cancelReservationAsync(selectedReservation.value.id);
  loading.value = false;
  if (result?.status === 200) {
    showSuccess('Powiodło się', 'Rezerwacja została odwołana');
    return;
  }
  showWarning('Wystąpił błąd', 'Odwołanie rezerwacji nie powiodło się');
}

async function setReservations() {
  loading.value = true;
  const result = await getUserReservationsAsync();
  reservations.value = result?.data ?? [];
  loading.value = false;
}

onMounted(async () => await setReservations());
</script>
<template>
  <div>
    <div>
      <q-expansion-item
        icon="event_available"
        label="Aktualne rezerwacje"
        expand-separator
      >
        <q-card>
          <q-card-section
            v-for="(item, index) in availableReservations"
            :key="index"
            class="tw-flex tw-justify-between tw-items-center tw-text-primary hover:tw-bg-gray-300 tw-px-10"
          >
            <div class="tw-flex tw-gap-x-5">
              <ReservationIcon :status="item.status" />
              <span>{{ item.date }}</span>
            </div>
            <a
              :href="`/announcement/${item.announcementId}`"
              class="tw-text-blue-500 tw-cursor-pointer tw-no-underline"
            >
              Przejdz do mieszkania
            </a>
            <div
              v-if="item.status != ReservationStatusEnum.Unapproved"
              class="tw-cursor-pointer hover:tw-underline"
              @click="onSelectedReservation(item)"
            >
              Odwołaj
            </div>
            <div v-else>Odwołana</div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item icon="event_note" label="Historia rezerwacji" expand-separator>
        <q-card>
          <q-card-section
            v-for="(item, index) in oldReservations"
            :key="index"
            class="tw-flex tw-justify-between tw-items-center tw-text-primary hover:tw-bg-gray-300 tw-px-10"
          >
            <span>{{ item.date }}</span>
            <span>Nieaktualne</span>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
    <q-dialog v-model="showDialogReservation">
      <q-card class="tw-p-4">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-xl">Rezerwacja</div>
          <q-btn v-close-popup icon="close" size="md" class="tw-p-0" flat />
        </div>
        <q-separator class="tw-mb-3" />
        <div class="tw-text-base">Czy na pewno chcesz odwołać tą rezerwację?</div>
        <div class="tw-flex tw-gap-x-2 tw-justify-end tw-mb-2 tw-mt-4">
          <q-btn v-close-popup label="Anuluj" color="primary" no-caps />
          <q-btn label="Odwołaj" color="primary" no-caps @click="cancelReservation" />
        </div>
      </q-card>
    </q-dialog>
    <q-inner-loading :showing="loading" color="primary" />
  </div>
</template>

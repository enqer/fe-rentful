<script setup lang="ts">
import { getUserReservationsAsync } from '@/api/ReservationApi';
import { ReservationStatusEnum } from '@/types/enums';
import type { UserReservation } from '@/types/models/Reservation';
import { computed, onMounted, ref } from 'vue';

const loading = ref(false);
const reservations = ref<UserReservation[]>([]);

const availableReservations = computed(() =>
  reservations.value
    .filter((x) => new Date(x.date) > new Date())
    .sort((a, b) => a.date.localeCompare(b.date))
);
const oldReservations = computed(() =>
  reservations.value.filter((x) => new Date(x.date) < new Date()).sort()
);

const getReservationIcon = (status: ReservationStatusEnum) => {
  switch (status) {
    case ReservationStatusEnum.Approved:
      return 'check_circle';
    case ReservationStatusEnum.Unapproved:
      return 'cancel';
    case ReservationStatusEnum.Unresolved:
      return 'help';
  }
};

const getReservationIconColor = (status: ReservationStatusEnum) => {
  switch (status) {
    case ReservationStatusEnum.Approved:
      return 'tw-text-green-500';
    case ReservationStatusEnum.Unapproved:
      return 'tw-text-red-500';
    case ReservationStatusEnum.Unresolved:
      return 'tw-text-yellow-600';
  }
};

const getReservationStatusHint = (status: ReservationStatusEnum) => {
  switch (status) {
    case ReservationStatusEnum.Approved:
      return 'Rezerwacja zatwierdzona';
    case ReservationStatusEnum.Unapproved:
      return 'Rezerwacja niezatwierdzona';
    case ReservationStatusEnum.Unresolved:
      return 'Rezerwacja nierozstrzygnięta';
  }
};

onMounted(async () => {
  loading.value = true;
  const result = await getUserReservationsAsync();
  reservations.value = result?.data ?? [];
  loading.value = false;
});
</script>
<template>
  <div>
    <div>
      <q-expansion-item
        icon="event_available"
        label="Aktualne rezerwacje"
        class="tw-bg-primary tw-text-white"
        expand-separator
      >
        <q-card>
          <q-card-section
            v-for="(item, index) in availableReservations"
            :key="index"
            class="tw-flex tw-justify-between tw-items-center tw-text-primary hover:tw-bg-gray-300 tw-px-10"
          >
            <div class="tw-flex tw-gap-x-5">
              <q-icon
                :name="getReservationIcon(item.status)"
                :class="getReservationIconColor(item.status)"
                size="sm"
              >
                <q-tooltip class="bg-primary">
                  {{ getReservationStatusHint(item.status) }}
                </q-tooltip>
              </q-icon>
              <span>{{ item.date }}</span>
            </div>
            <a
              :href="`/announcement/${item.announcementId}`"
              class="tw-text-blue-500 tw-cursor-pointer tw-no-underline"
            >
              Przejdz do mieszkania
            </a>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        icon="event_note"
        label="Historia rezerwacji"
        class="tw-bg-primary tw-text-white"
        expand-separator
      >
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
    <q-inner-loading :showing="loading" color="primary" />
  </div>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';

import { getAnnouncementByIdAsync } from '@/api/AnnouncementApi';
import type { AnnouncementDetails, Reservation } from '@/types/models/Announcement';
import { assignReservationAsync } from '@/api/ReservationApi';
import { useNotify } from '@/composables/useNotify';

import BorderedInfoItem from '@/components/BorderedInfoItem.vue';
import LocationMap from '@/components/map/LocationMap.vue';

const props = defineProps({
  announcementId: {
    type: Number,
    required: true,
  },
});

const { showSuccess, showWarning } = useNotify();

const announcement = ref<AnnouncementDetails>();
const showDialogReservation = ref(false);
const selectedReservation = ref<Reservation>();
const loading = ref(false);
const slide = ref(0);
const datePicker = ref(useDateFormat(new Date(), 'YYYY-MM-DD').value);
const events = ref<string[]>([]);

const filteredReservations = computed(() =>
  announcement.value?.reservations.filter((x) => x.date.includes(datePicker.value))
);

function selectReservation(reservation: Reservation) {
  selectedReservation.value = reservation;
  showDialogReservation.value = true;
}

async function assignReservation() {
  if (!selectedReservation.value?.id) {
    return;
  }
  loading.value = true;
  const result = await assignReservationAsync(selectedReservation.value.id);
  showDialogReservation.value = false;
  loading.value = false;
  if (result?.status === 200) {
    showSuccess('Powiodło się', 'Zostałeś przypisany do rezerwacji');
    await setAnnouncement();
    return;
  }
  showWarning('Coś poszło nie tak', 'Nie zostałeś przypisany do rezerwacji');
}

async function setAnnouncement() {
  loading.value = true;
  const result = await getAnnouncementByIdAsync(props.announcementId);
  announcement.value = result?.data;
  events.value =
    announcement.value?.reservations.map((x) =>
      x.date.split(' ')[0].replace(/-/g, '/')
    ) ?? [];
  loading.value = false;
}

onMounted(async () => await setAnnouncement());
</script>
<template>
  <div class="tw-flex tw-flex-col tw-gap-5 tw-mb-10">
    <q-card class="tw-flex tw-flex-col 2xl:tw-flex-row tw-gap-8 tw-p-4">
      <q-carousel
        v-model="slide"
        class="tw-w-full 2xl:tw-w-2/5"
        arrows
        navigation
        infinite
        animated
      >
        <q-carousel-slide
          v-for="(item, index) in announcement?.images"
          :key="index"
          :name="index"
          :img-src="item"
        />
      </q-carousel>
      <div class="tw-flex tw-flex-col 2xl:tw-flex tw-justify-between tw-grow-1 tw-gap-5">
        <div class="tw-flex tw-flex-col tw-gap-y-5">
          <div>
            <div class="tw-font-medium tw-text-gray-600">Cena:</div>
            <div class="tw-text-2xl tw-font-semibold tw-text-primary">
              {{ announcement?.price }} zł
              <span class="tw-text-lg tw-font-medium tw-text-gray-600">
                + czynsz: {{ announcement?.rent }}zł/miesiąc
              </span>
            </div>
          </div>
          <div
            class="tw-text-2xl 2xl:tw-text-3xl tw-font-medium tw-text-sky-950 tw-grow-1"
          >
            {{ announcement?.title }}
          </div>
        </div>
        <div class="tw-flex tw-flex-col tw-justify-between">
          <div class="tw-flex 2xl:tw-flex-col tw-justify-between tw-gap-y-3">
            <div>
              <div class="tw-text-gray-600 tw-font-medium">Data dodania:</div>
              {{ useDateFormat(announcement?.dateAdded, 'HH:mm:ss DD-MM-YYYY') }}
            </div>
            <div>
              <div class="tw-text-gray-600 tw-font-medium">Dodane przez:</div>
              <div>{{ announcement?.firstName }} {{ announcement?.lastName }}</div>
            </div>
          </div>
          <div class="tw-flex tw-justify-center 2xl:tw-justify-end tw-text-sky-950">
            <q-btn label="Skontaktuj się" no-caps flat />
          </div>
        </div>
      </div>
    </q-card>
    <q-card class="tw-p-4">
      <p class="tw-text-lg tw-font-medium tw-text-gray-600">Informacje</p>
      <div class="tw-flex tw-gap-2 tw-flex-wrap">
        <BorderedInfoItem :value="`${announcement?.area} m²`" label="Powierzchnia" />
        <BorderedInfoItem :value="`${announcement?.price} zł`" label="Cena" />
        <BorderedInfoItem :value="`${announcement?.rent} zł`" label="Czynsz" />
        <BorderedInfoItem :value="`${announcement?.deposit} zł`" label="Kaucja" />
        <BorderedInfoItem
          :value="`${announcement?.numberOfRooms}`"
          label="Liczba pokoi"
        />
      </div>
      <div class="tw-flex tw-justify-end">
        <q-icon
          v-if="announcement?.hasElevator"
          name="elevator"
          class="tw-text-xl tw-p-2 tw-text-gray-600"
        >
          <q-tooltip> Posiada Windę </q-tooltip>
        </q-icon>
        <q-icon
          v-if="announcement?.isFurnished"
          name="chair"
          class="tw-text-xl tw-p-2 tw-text-gray-600"
        >
          <q-tooltip> Umeblowane </q-tooltip>
        </q-icon>
        <q-icon
          v-if="announcement?.hasParkingSpace"
          name="local_parking"
          class="tw-text-xl tw-p-2 tw-text-gray-600"
        >
          <q-tooltip> Posiada balkon </q-tooltip>
        </q-icon>
        <q-icon
          v-if="announcement?.hasBalcony"
          name="balcony"
          class="tw-text-xl tw-p-2 tw-text-gray-600"
        >
          <q-tooltip> Posiada balkon </q-tooltip>
        </q-icon>
        <q-icon
          v-if="announcement?.isAnimalFriendly"
          name="pets"
          class="tw-text-xl tw-p-2 tw-text-gray-600"
        >
          <q-tooltip> Przyjazne zwierzętom </q-tooltip>
        </q-icon>
      </div>
    </q-card>
    <q-card class="tw-p-4">
      <p class="tw-text-lg tw-font-medium tw-text-gray-600">Opis</p>
      <div>
        {{ announcement?.description }}
      </div>
    </q-card>
    <div class="tw-flex tw-flex-col xl:tw-flex-row tw-gap-5">
      <q-card class="tw-p-4 tw-grow-2 xl:tw-w-[40vw]">
        <p class="tw-text-lg tw-font-medium tw-text-gray-600">Lokalizacja</p>
        <div class="tw-w-full tw-h-[50vh] tw-flex tw-justify-center">
          <LocationMap
            v-if="announcement?.longitude"
            :longitude="announcement.longitude"
            :latitude="announcement.latitude"
            :is-precised="announcement.isPrecise"
          />
        </div>
      </q-card>
      <q-card class="tw-p-4 tw-grow-1 xl:tw-w-[40vw]">
        <p class="tw-text-lg tw-font-medium tw-text-gray-600">Umów spotkanie</p>
        <div>
          <p>Wolne terminy</p>
          <div class="tw-my-2 tw-flex tw-gap-3 tw-flex-wrap">
            <q-date v-model="datePicker" :events="events" mask="YYYY-MM-DD" />
            <div class="tw-flex tw-flex-col tw-gap-y-3">
              <q-badge
                v-for="(reservation, index) in filteredReservations"
                :key="index"
                class="tw-p-2 tw-text-sm tw-flex tw-items-center tw-gap-x-1 tw-cursor-pointer"
                color="primary"
                @click="selectReservation(reservation)"
              >
                {{ reservation.date }}
                <q-tooltip> Zarezerwuj spotkanie </q-tooltip>
                <q-icon name="groups" size="sm" flat dense />
              </q-badge>
            </div>
          </div>
        </div>
      </q-card>
    </div>
    <q-dialog v-model="showDialogReservation">
      <q-card class="tw-p-4">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-xl">Rezerwacja</div>
          <q-btn v-close-popup icon="close" size="md" class="tw-p-0" flat />
        </div>
        <q-separator class="tw-mb-3" />
        <div class="tw-text-base">Czy na pewno chcesz umówić się na spotkanie?</div>
        <div class="tw-text-base">Data i czas: {{ selectedReservation?.date }}</div>
        <div class="tw-flex tw-gap-x-2 tw-justify-end tw-mb-2 tw-mt-4">
          <q-btn v-close-popup label="Anuluj" color="primary" no-caps />
          <q-btn label="Umów" color="primary" no-caps @click="assignReservation" />
        </div>
      </q-card>
    </q-dialog>
    <q-inner-loading :showing="loading" color="primary" />
  </div>
</template>

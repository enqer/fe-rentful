<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref } from 'vue';

import { getAnnouncementByIdAsync } from '@/api/AnnouncementApi';
import type { AnnouncementDetails } from '@/types/models/Announcement';
import type { Coordinate } from '@/types/models/Location';

import BorderedInfoItem from '@/components/BorderedInfoItem.vue';
import LocationMap from '@/components/map/LocationMap.vue';

const props = defineProps({
  announcementId: {
    type: Number,
    required: true,
  },
});

const announcement = ref<AnnouncementDetails>();
const loading = ref(false);
const slide = ref(0);
const location = ref<Coordinate>({
  lat: announcement.value?.latitude ?? 0,
  lng: announcement.value?.longitude ?? 0,
});

async function setAnnouncement() {
  loading.value = true;
  const result = await getAnnouncementByIdAsync(props.announcementId);
  announcement.value = result?.data;
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
          <p>kontakt</p>
          {{ announcement?.description }}
        </div>
      </q-card>
    </div>
  </div>
</template>

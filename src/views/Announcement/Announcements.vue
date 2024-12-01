<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import { getAnnouncementsAsync } from '@/api/AnnouncementApi';
import { DISTANCE_OPTIONS, SORT_OPTIONS } from '@/constants/Options';
import type { AnnouncementShort } from '@/types/models/Announcement';
import type { City } from '@/types/models/Location';

import AnnouncementItem from '@/components/announcements/AnnouncementItem.vue';
import YesOrNoFilter from '@/components/announcements/YesOrNoFilter.vue';
import LocationSelect from '@/components/LocationSelect.vue';
import AnnouncementMap from '@/components/map/AnnouncementMap.vue';

const EarthRadius = 6378;

const announcements = ref<AnnouncementShort[]>([]);
const loading = ref(false);
const selectedSorting = ref(SORT_OPTIONS[0]);
const selectedDistance = ref(DISTANCE_OPTIONS[0]);
const furnished = ref({
  yes: false,
  no: false,
});
const petFriendly = ref({
  yes: false,
  no: false,
});
const hasBalcony = ref({
  yes: false,
  no: false,
});
const hasParking = ref({
  yes: false,
  no: false,
});
const hasElevator = ref({
  yes: false,
  no: false,
});
const selectedNumberOfRoom = ref('0');
const selectedProvince = ref('');
const selectedCity = ref<City>();

function isInGeoRadius(lat: number, lng: number) {
  if (!selectedCity.value) {
    return;
  }
  const dLat = ((lat - selectedCity.value.lat) * Math.PI) / 180;
  const dLng = ((lng - selectedCity.value.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((selectedCity.value.lat * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EarthRadius * c;

  return distance <= selectedDistance.value.value;
}

const filteredAnnouncements = computed(() =>
  announcements.value
    .filter((x) => {
      if (!selectedCity.value && selectedProvince.value) {
        return x.location.province === selectedProvince.value;
      }
      if (!selectedCity.value) {
        return true;
      }
      return (
        (x.location.province === selectedProvince.value &&
          x.location.city === selectedCity.value?.name) ||
        isInGeoRadius(x.location.latitude, x.location.longitude)
      );
    })
    .filter((announcement) => {
      const filters = [
        () =>
          furnished.value.yes !== furnished.value.no
            ? announcement.isFurnished === furnished.value.yes
            : true,
        () =>
          petFriendly.value.yes !== petFriendly.value.no
            ? announcement.isAnimalFriendly === petFriendly.value.yes
            : true,
        () =>
          hasBalcony.value.yes !== hasBalcony.value.no
            ? announcement.hasBalcony === hasBalcony.value.yes
            : true,
        () =>
          hasParking.value.yes !== hasParking.value.no
            ? announcement.hasParkingSpace === hasParking.value.yes
            : true,
        () =>
          hasElevator.value.yes !== hasElevator.value.no
            ? announcement.hasElevator === hasElevator.value.yes
            : true,
        () => {
          switch (selectedNumberOfRoom.value) {
            case '1':
              return announcement.numberOfRooms <= 3;
            case '2':
              return announcement.numberOfRooms >= 4 && announcement.numberOfRooms <= 6;
            case '3':
              return announcement.numberOfRooms >= 7;
            default:
              return true;
          }
        },
      ];

      return filters.every((filter) => filter());
    })
);

const sortedAnnouncements = computed(() => {
  switch (selectedSorting.value.value) {
    case 2:
      return filteredAnnouncements.value.slice().sort((a, b) => a.price - b.price);
    case 3:
      return filteredAnnouncements.value.slice().sort((a, b) => b.price - a.price);
    default:
      return filteredAnnouncements.value;
  }
});

// const minPrice = computed(() => sortedAnnouncements.value.slice().shift()?.price ?? 0);
// const maxPrice = computed(() =>
//   Math.max(...filteredAnnouncements.value.map((a) => a.price))
// );
const maxPrice = computed(() => {
  const prices = filteredAnnouncements.value.map((a) => a.price);
  console.log(filteredAnnouncements.value);
  return prices.length ? Math.max(...prices) : 0;
});
const selectedPrice = ref({
  min: 0,
  max: maxPrice.value,
});

async function setAnnouncements() {
  loading.value = true;
  const result = await getAnnouncementsAsync();
  announcements.value = result?.data ?? [];
  loading.value = false;
}

watch(selectedCity, () => console.log(selectedCity.value));

onMounted(async () => await setAnnouncements());
</script>
<template>
  <div
    v-if="announcements.length > 0"
    class="tw-flex tw-flex-col tw-gap-x-10"
    style="max-height: calc(100vh - 75px)"
  >
    <div
      class="tw-flex tw-flex-col 2xl:tw-flex-row tw-justify-between lg:tw-justify-start 2xl:tw-justify-between tw-items-start tw-gap-5"
    >
      <div>
        <div
          class="tw-font-semibold tw-flex tw-items-center tw-gap-x-1 tw-text-base sm:tw-text-lg xl:tw-text-3xl"
        >
          Mieszkania
          <span class="tw-font-normal tw-text-xl">({{ announcements.length }})</span>
          <span class="tw-font-normal tw-text-xl">
            ({{ filteredAnnouncements.length }})
          </span>
        </div>
        <q-separator />
      </div>
      <div
        class="tw-w-full 2xl:tw-w-4/5 tw-mb-10 tw-flex tw-flex-col tw-flex-wrap lg:tw-flex-nowrap md:tw-flex-row tw-gap-x-5 tw-items-start sm:tw-items-end tw-gap-3"
      >
        <div class="tw-w-72">
          <div class="tw-flex tw-items-center tw-w-full">
            <div class="tw-grow-1">Cena (zł):</div>
            <q-range
              v-model="selectedPrice"
              class="tw-w-40 tw-grow-1"
              color="primary"
              markers
              switch-label-side
              switch-marker-labels-side
            />
          </div>
          <div class="tw-flex tw-gap-x-4 tw-items-center">
            <q-input
              v-model="selectedPrice.min"
              class="tw-w-30 tw-grow-1"
              outlined
              dense
              hide-bottom-space
            />
            <q-icon name="remove" />
            <q-input
              v-model="selectedPrice.max"
              class="tw-w-30 tw-grow-1"
              outlined
              dense
              hide-bottom-space
            />
          </div>
        </div>
        <q-select
          v-model="selectedSorting"
          :options="SORT_OPTIONS"
          class="tw-w-full md:tw-w-1/4"
          outlined
          dense
        />
        <div class="tw-w-full lg:tw-w-3/6">
          <LocationSelect
            v-model:city="selectedCity"
            v-model:province="selectedProvince"
          />
        </div>
        <q-select
          v-model="selectedDistance"
          :options="DISTANCE_OPTIONS"
          :disable="!selectedCity"
          class="tw-w-full lg:tw-w-36"
          outlined
          dense
        />
      </div>
    </div>
    <div class="tw-flex tw-flex-col min-[1700px]:tw-flex-row tw-gap-10">
      <div
        class="tw-w-full min-[1700px]:tw-w-1/8 tw-flex min-[1700px]:tw-flex-col tw-justify-between sm:tw-justify-start 2xl:tw-justify-evenly min-[1700px]:!tw-justify-start min-[1700px]:tw-items-start tw-flex-wrap tw-gap-5"
      >
        <YesOrNoFilter
          v-model="furnished"
          :announcements="filteredAnnouncements"
          filter="isFurnished"
          label="Umeblowane"
        />
        <div class="tw-flex tw-flex-col">
          <div class="tw-font-semibold">Liczba pokoi</div>
          <q-radio
            v-model="selectedNumberOfRoom"
            val="0"
            class="tw-m-1"
            label="Dowolna"
            dense
          />
          <q-radio
            v-model="selectedNumberOfRoom"
            val="1"
            class="tw-m-1"
            label="1-3"
            dense
          />
          <q-radio
            v-model="selectedNumberOfRoom"
            val="2"
            class="tw-m-1"
            label="4-6"
            dense
          />
          <q-radio
            v-model="selectedNumberOfRoom"
            val="3"
            class="tw-m-1"
            label="7+"
            dense
          />
        </div>
        <YesOrNoFilter
          v-model="petFriendly"
          :announcements="filteredAnnouncements"
          filter="isAnimalFriendly"
          label="Przyjazne zwierzętom"
        />
        <YesOrNoFilter
          v-model="hasElevator"
          :announcements="filteredAnnouncements"
          filter="hasElevator"
          label="Posiada windę"
        />
        <YesOrNoFilter
          v-model="hasParking"
          :announcements="filteredAnnouncements"
          filter="hasParkingSpace"
          label="Posiada parking"
        />
        <YesOrNoFilter
          v-model="hasBalcony"
          :announcements="filteredAnnouncements"
          filter="hasBalcony"
          label="Posiada balkon"
        />
      </div>
      <q-card
        class="tw-flex tw-flex-col-reverse 2xl:tw-flex-row 2xl:tw-h-max-[70vh] tw-grow-1 tw-gap-x-5 tw-p-2 lg:tw-p-4"
      >
        <q-scroll-area
          class="tw-h-screen tw-w-full 2xl:tw-w-1/2 tw-flex tw-flex-col tw-gap-5"
        >
          <AnnouncementItem
            v-for="(item, index) in sortedAnnouncements"
            :key="index"
            :announcement="item"
          />
        </q-scroll-area>
        <div
          class="tw-h-[40vh] 2xl:tw-h-full tw-w-full 2xl:tw-w-1/2 tw-flex tw-justify-center"
        >
          <AnnouncementMap :announcements="filteredAnnouncements" />
        </div>
      </q-card>
    </div>
    <q-inner-loading :showing="loading" color="primary" />
  </div>
</template>

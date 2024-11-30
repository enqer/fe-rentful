<script setup lang="ts">
import { getAnnouncementsAsync } from '@/api/AnnouncementApi';
import AnnouncementItem from '@/components/announcements/AnnouncementItem.vue';
import Paragraph from '@/components/apartments/Paragraph.vue';
import AnnouncementMap from '@/components/map/AnnouncementMap.vue';
import { SORT_OPTIONS } from '@/constants/Options';
import type { AnnouncementShort } from '@/types/models/Announcement';
import { computed, onMounted, ref } from 'vue';

const announcements = ref<AnnouncementShort[]>([]);
const loading = ref(false);
const selectedSorting = ref(SORT_OPTIONS[0]);
const selectedPrice = ref({
  min: 4,
  max: 6,
});
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
const selectedNumberOfRoom = ref('0');

const countFurnished = computed(
  () => filteredAnnouncements.value.filter((x) => x.isFurnished).length
);
const countNotFurnished = computed(
  () => filteredAnnouncements.value.length - countFurnished.value
);
const countPetFriendly = computed(
  () => filteredAnnouncements.value.filter((x) => x.isAnimalFriendly).length
);
const countPetNotFriendly = computed(
  () => filteredAnnouncements.value.length - countPetFriendly.value
);
const countHasBalcony = computed(
  () => filteredAnnouncements.value.filter((x) => x.hasBalcony).length
);
const countHasNotBalcony = computed(
  () => filteredAnnouncements.value.length - countHasBalcony.value
);
const countHasParking = computed(
  () => filteredAnnouncements.value.filter((x) => x.hasBalcony).length
);
const countHasNotParking = computed(
  () => filteredAnnouncements.value.length - countHasParking.value
);

const filteredAnnouncements = computed(() =>
  announcements.value.filter((announcement) => {
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

const sortedAnnouncements = computed(() =>
  filteredAnnouncements.value.slice().sort((a, b) => a.price - b.price)
);

const minPrice = computed(() => sortedAnnouncements.value.slice().shift()?.price ?? 0);
const maxPrice = computed(() => sortedAnnouncements.value.slice().pop()?.price ?? 0);

async function setAnnouncements() {
  loading.value = true;
  const result = await getAnnouncementsAsync();
  announcements.value = result?.data ?? [];
  console.log(announcements.value);
  loading.value = false;
}

onMounted(async () => await setAnnouncements());
</script>
<template>
  <div
    v-if="announcements.length > 0"
    class="tw-flex tw-flex-col tw-gap-x-10"
    style="max-height: calc(100vh - 75px)"
  >
    <div class="tw-flex tw-justify-between tw-items-center">
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
      <div class="tw-mb-10 tw-flex tw-gap-x-5 tw-items-end">
        <div class="tw-w-72">
          <div class="tw-flex tw-items-center tw-w-full">
            <div class="tw-grow-1">Cena (zł):</div>
            <q-range
              v-model="selectedPrice"
              :min="minPrice"
              :max="maxPrice"
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
        <q-select v-model="selectedSorting" :options="SORT_OPTIONS" outlined />
      </div>
    </div>
    <div class="tw-flex tw-gap-x-10">
      <div class="tw-w-1/8 tw-flex tw-flex-col tw-gap-y-5">
        <div class="tw-flex tw-flex-col">
          <div class="tw-font-semibold">Umeblowane</div>
          <q-checkbox
            v-model="furnished.yes"
            :label="`Tak (${countFurnished})`"
            class="tw-m-1"
            dense
          />
          <q-checkbox
            v-model="furnished.no"
            :label="`Nie (${countNotFurnished})`"
            class="tw-m-1"
            dense
          />
        </div>
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
        <div class="tw-flex tw-flex-col">
          <div class="tw-font-semibold">Przyjazne zwierzętom</div>
          <q-checkbox
            v-model="petFriendly.yes"
            :label="`Tak (${countPetFriendly})`"
            class="tw-m-1"
            dense
          />
          <q-checkbox
            v-model="petFriendly.no"
            :label="`Nie (${countPetNotFriendly})`"
            class="tw-m-1"
            dense
          />
        </div>
        <div class="tw-flex tw-flex-col">
          <div class="tw-font-semibold">Posiada balkon</div>
          <q-checkbox
            v-model="hasBalcony.yes"
            :label="`Tak (${countHasBalcony})`"
            class="tw-m-1"
            dense
          />
          <q-checkbox
            v-model="hasBalcony.no"
            :label="`Nie (${countHasNotBalcony})`"
            class="tw-m-1"
            dense
          />
        </div>
        <div class="tw-flex tw-flex-col">
          <div class="tw-font-semibold">Posiada parking</div>
          <q-checkbox
            v-model="hasParking.yes"
            :label="`Tak (${countHasParking})`"
            class="tw-m-1"
            dense
          />
          <q-checkbox
            v-model="hasParking.no"
            :label="`Nie (${countHasNotParking})`"
            class="tw-m-1"
            dense
          />
        </div>
      </div>
      <q-scroll-area :visible="false" class="tw-flex tw-flex-col tw-gap-5 tw-w-1/3">
        <AnnouncementItem
          v-for="(item, index) in filteredAnnouncements"
          :key="index"
          :announcement="item"
        />
      </q-scroll-area>
      <div class="tw-grow-1">
        <div class="tw-w-full tw-h-[80vh] 2xl:tw-w-[20vw] tw-flex tw-justify-center">
          <AnnouncementMap :announcements="filteredAnnouncements" />
        </div>
      </div>
    </div>
    <q-inner-loading :showing="loading" color="primary" />
  </div>
</template>

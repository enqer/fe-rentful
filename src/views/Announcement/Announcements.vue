<script setup lang="ts">
import { getAnnouncementsAsync } from '@/api/AnnouncementApi';
import AnnouncementItem from '@/components/announcements/AnnouncementItem.vue';
import AnnouncementMap from '@/components/map/AnnouncementMap.vue';
import type { AnnouncementShort } from '@/types/models/Announcement';
import { computed, onMounted, ref } from 'vue';

const announcements = ref<AnnouncementShort[]>([]);
const loading = ref(false);

const priceModel = ref({
  min: 4,
  max: 6,
});

const filteredAnnouncements = computed(() => announcements.value);

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
  <div style="max-height: calc(100vh - 75px)">
    <div class="tw-mb-10">
      <q-range
        v-model="priceModel"
        :min="minPrice"
        :max="maxPrice"
        class="tw-w-40"
        color="primary"
        markers
        label-always
        switch-label-side
        switch-marker-labels-side
      />
    </div>
    <div class="tw-flex tw-gap-x-3">
      <q-scroll-area :visible="false" class="tw-flex tw-flex-col tw-gap-5 tw-w-1/2">
        <AnnouncementItem
          v-for="(item, index) in announcements"
          :key="index"
          :announcement="item"
        />
      </q-scroll-area>
      <div class="tw-grow-1">
        <div class="tw-w-full tw-h-[80vh] 2xl:tw-w-[40vw] tw-flex tw-justify-center">
          <AnnouncementMap :announcements="announcements" />
        </div>
      </div>
    </div>
    <q-inner-loading :showing="loading" color="primary" />
  </div>
</template>

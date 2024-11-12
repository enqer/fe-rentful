<script setup lang="ts">
import { getAnnouncementsAsync } from '@/api/AnnouncementApi';
import AnnouncementItem from '@/components/announcements/AnnouncementItem.vue';
import AnnouncementMap from '@/components/map/AnnouncementMap.vue';
import type { AnnouncementShort } from '@/types/models/Announcement';
import { onMounted, ref } from 'vue';

const announcements = ref<AnnouncementShort[]>([]);
const loading = ref(false);

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
  <div>
    <div v-if="announcements.length > 0" class="tw-flex tw-gap-x-3">
      <div class="tw-flex tw-flex-col tw-gap-2 tw-w-1/2">
        <AnnouncementItem
          v-for="(item, index) in announcements"
          :key="index"
          :announcement="item"
        />
      </div>
      <div>
        <div class="tw-w-[50vw] tw-h-[50vh] 2xl:tw-w-[40vw] tw-flex tw-justify-center">
          <AnnouncementMap :announcements="announcements" />
        </div>
      </div>
      <q-inner-loading :showing="loading" color="primary" />
    </div>
    <div v-else>Brak danych do wyświetlenia</div>
  </div>
</template>

<script setup lang="ts">
import { getAnnouncementsAsync } from '@/api/AnnouncementApi';
import AnnouncementItem from '@/components/announcements/AnnouncementItem.vue';
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
    <div class="tw-flex tw-flex-col tw-gap-2 tw-w-1/2">
      <AnnouncementItem
        v-for="(item, index) in announcements"
        :key="index"
        :announcement="item"
      />
    </div>
    <q-inner-loading :showing="loading" color="primary" />
  </div>
</template>

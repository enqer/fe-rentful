<script setup lang="ts">
import { getAnnouncementByIdAsync } from '@/api/AnnouncementApi';
import type { AnnouncementDetails } from '@/types/models/Announcement';
import { onMounted, ref } from 'vue';

const props = defineProps({
  announcementId: {
    type: Number,
    required: true,
  },
});

const showDialog = defineModel<boolean>();
const announcement = ref<AnnouncementDetails>();

async function setAnnouncement() {
  const result = await getAnnouncementByIdAsync(props.announcementId);
  announcement.value = result?.data;
}

onMounted(async () => await setAnnouncement());
</script>
<template>
  <q-card v-if="announcement" class="tw-p-4 tw-w-[400px]">
    <div class="tw-flex tw-items-center tw-justify-between">
      <div class="tw-text-lg">Edycja ogłoszenia</div>
      <q-btn icon="close" flat dense @click="showDialog = false" />
    </div>
    <q-separator />
    <div class="tw-mt-4 tw-flex tw-flex-col tw-gap-4">
      <div class="tw-flex tw-gap-x-4">
        <div>Tytuł:</div>
        <q-input v-model="announcement.title" class="tw-w-full" outlined autogrow />
      </div>
      <div class="tw-flex tw-gap-x-4">
        <div>Opis:</div>
        <q-input v-model="announcement.description" class="tw-w-full" outlined autogrow />
      </div>
      <div>
        <Paragraph label="Terminy" />
        <div class="tw-font-medium">Zarządzaj rezerwacjami</div>
        <div class="tw-my-2 tw-flex tw-gap-3 tw-flex-wrap">
          <q-badge
            v-for="(reservation, index) in announcement.reservations"
            :key="index"
            class="tw-p-2"
            color="primary"
          >
            {{ reservation.date }}
            <q-btn icon="close" size="sm" flat dense />
          </q-badge>
          <!-- <DateTimePicker @on-picked-date-time="addReservation" /> -->
        </div>
      </div>
      <q-separator />
      <div class="tw-flex tw-justify-end">
        <q-btn label="Anuluj" flat no-caps />
        <q-btn label="Zapisz" color="primary" no-caps />
      </div>
    </div>
  </q-card>
</template>

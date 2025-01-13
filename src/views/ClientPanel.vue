<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

import { getUserResourcesAsync } from '@/api/ResourceApi';
import { deleteAnnouncementAsync } from '@/api/AnnouncementApi';
import type { Announcement, Resources } from '@/types/models/Resource';

import EditAnnouncement from '@/components/EditAnnouncement.vue';
import { RouterNameEnum } from '@/types/enums';

const quasar = useQuasar();
const router = useRouter();

const loading = ref(false);

const resources = ref<Resources>();
const selectedAnnouncement = ref<Announcement>();
const showEditDialog = ref(false);

async function onDelete(announcementId: number) {
  quasar
    .dialog({
      title: 'Usunięcie',
      message: 'Czy na pewno chcesz usunąć ogłoszenie?',
      cancel: 'anuluj',
      ok: 'Tak',
      persistent: true,
    })
    .onOk(async () => {
      await deleteAnnouncementAsync(announcementId);
      await setResources();
    });
}

async function setResources() {
  loading.value = true;
  const result = await getUserResourcesAsync();
  loading.value = false;
  resources.value = result?.data;
}

function editAnnouncement(announcement: Announcement) {
  selectedAnnouncement.value = announcement;
  showEditDialog.value = true;
}

function goToAnnouncement(announcementId: number) {
  router.push({ name: RouterNameEnum.Announcement, params: { announcementId } });
}
function switchToApartment(apartmentId: number) {
  router.push({ name: RouterNameEnum.ManageApartment, params: { apartmentId } });
}

onMounted(async () => await setResources());
</script>
<template>
  <div class="tw-flex tw-flex-col tw-gap-y-8 tw-w-3/4">
    <q-card class="tw-p-4">
      <div class="tw-text-2xl tw-font-semibold">Aktualne ogłoszenia</div>
      <q-separator />
      <div
        v-for="(announcement, index) in resources?.announcements ?? []"
        :key="index"
        class="tw-flex tw-gap-x-3 tw-p-3 tw-items-center tw-justify-between hover:tw-bg-secondary"
      >
        <div>{{ useDateFormat(announcement.dateAdded, 'YYYY-MM-DD') }}</div>
        <div class="tw-grow-1 tw-font-medium">{{ announcement.title }}</div>
        <div>
          <q-btn
            icon="delete"
            class="tw-text-red-700"
            flat
            dense
            @click="onDelete(announcement.id)"
          />
          <q-btn
            icon="edit"
            class="tw-text-primary"
            dense
            flat
            @click="editAnnouncement(announcement)"
          />

          <q-btn
            icon="arrow_forward"
            class="tw-text-primary"
            flat
            dense
            @click="goToAnnouncement(announcement.id)"
          />
        </div>
      </div>
    </q-card>
    <q-card class="tw-p-4">
      <div class="tw-text-2xl tw-font-semibold">Mieszkania</div>
      <q-separator />
      <div
        v-for="(apartment, index) in resources?.apartments ?? []"
        :key="index"
        class="tw-flex tw-justify-between tw-items-center tw-m-3 tw-gap-3 tw-cursor-pointer tw-mt-5"
      >
        <div class="tw-flex tw-justify-center tw-gap-x-5 tw-items-center">
          <img :src="apartment.thumbnail" class="tw-w-[100px] tw-h-[80px]" />
          <div class="tw-text-base">
            <div class="tw-flex tw-gap-x-3 tw-items-center">
              Powierzchnia:
              <span class="tw-flex tw-items-end">
                <div class="tw-text-base">
                  {{ apartment.area }} m<sup class="tw-text-sm">2</sup>
                </div>
              </span>
            </div>
            <div class="tw-flex tw-gap-x-2">
              Liczba pokoi: <span>{{ apartment.numberOfRooms }}</span>
            </div>
          </div>
        </div>
        <div class="tw-flex tw-justify-end">
          <q-icon
            v-if="apartment.hasElevator"
            name="elevator"
            class="tw-text-xl tw-p-2 tw-text-gray-600"
          >
            <q-tooltip> Posiada Windę </q-tooltip>
          </q-icon>
          <q-icon
            v-if="apartment.isFurnished"
            name="chair"
            class="tw-text-xl tw-p-2 tw-text-gray-600"
          >
            <q-tooltip> Umeblowane </q-tooltip>
          </q-icon>
          <q-icon
            v-if="apartment.hasParkingSpace"
            name="local_parking"
            class="tw-text-xl tw-p-2 tw-text-gray-600"
          >
            <q-tooltip> Posiada balkon </q-tooltip>
          </q-icon>
          <q-icon
            v-if="apartment.hasBalcony"
            name="balcony"
            class="tw-text-xl tw-p-2 tw-text-gray-600"
          >
            <q-tooltip> Posiada balkon </q-tooltip>
          </q-icon>
          <q-icon
            v-if="apartment.isAnimalFriendly"
            name="pets"
            class="tw-text-xl tw-p-2 tw-text-gray-600"
          >
            <q-tooltip> Przyjazne zwierzętom </q-tooltip>
          </q-icon>
        </div>
        <div
          class="tw-text-blue-500 tw-text-base"
          @click="switchToApartment(apartment.id)"
        >
          Zarządzaj
        </div>
      </div>
    </q-card>
    <q-dialog v-if="selectedAnnouncement" v-model="showEditDialog">
      <EditAnnouncement :announcement-id="selectedAnnouncement.id" />
    </q-dialog>
    <q-inner-loading :showing="loading" color="primary" />
  </div>
</template>

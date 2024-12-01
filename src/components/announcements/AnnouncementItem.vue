<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import { useRouter } from 'vue-router';

import { currencySymbol } from '@/constants/Symbols';
import type { AnnouncementShort } from '@/types/models/Announcement';
import { RouterNameEnum } from '@/types/enums';
import { useWindowSize } from '@vueuse/core';

const props = defineProps({
  announcement: {
    type: Object as PropType<AnnouncementShort>,
    required: true,
  },
});
const { width } = useWindowSize();
const router = useRouter();

const showAllItems = computed(() => (width.value >= 768 ? true : false));


function switchToAnnouncement(){
  router.push({
    name: RouterNameEnum.Announcement,
    params: {
      announcementId: props.announcement.id
    }
  })
}

const isFavorite = ref(false)
</script>
<template>
  <q-card
    class="tw-flex tw-gap-x-3 tw-h-[80px] md:tw-h-[120px] tw-my-2 tw-cursor-pointer"
    @click="switchToAnnouncement"
  >
    <div>
      <q-img :src="announcement.image" class="tw-w-[100px] lg:tw-w-[210px] tw-h-full">
        <template #error> Zdjęcie mieszkania </template>
      </q-img>
    </div>
    <div class="tw-grow-1 tw-p-2 tw-flex tw-flex-col tw-justify-between">
      <div class="tw-flex tw-flex-col">
        <div class="tw-flex tw-justify-between">
          <div class="tw-text-base tw-font-semibold tw-text-stone-900">
            {{ announcement.price }} {{ currencySymbol }}
            <span v-if="announcement.rent" class="tw-text-gray-500 tw-text-sm">
              + czynsz: {{ announcement.rent }} {{ currencySymbol }}/miesiąc
            </span>
          </div>
          <q-btn
            v-if="showAllItems"
            :icon="isFavorite ? 'favorite' : 'favorite_border'"
            color="primary"
            flat
            @click.stop="isFavorite = !isFavorite"
          />
        </div>
        <div
          class="tw-text-base tw-text-stone-900 tw-font-medium tw-capitalize tw-text-ellipsis tw-line-clamp-1"
        >
          {{ announcement.title }}
        </div>
      </div>
      <div v-if="showAllItems" class="tw-flex tw-justify-between tw-items-end">
        <div class="tw-text-gray-600">
          <div v-if="announcement.location.city">
            Miejscowość: {{ announcement.location.city }}
          </div>
          <div class="tw-flex tw-items-end tw-gap-x-1">
            Powierzchnia: {{ announcement.area }}
            <div class="tw-text-sm">m<sup class="tw-text-xs">2</sup></div>
          </div>
        </div>
        <div class="tw-flex tw-justify-end">
          <q-icon
            v-if="announcement.hasElevator"
            name="elevator"
            class="tw-text-xl tw-p-2 tw-text-gray-600"
          >
            <q-tooltip> Posiada Windę </q-tooltip>
          </q-icon>
          <q-icon
            v-if="announcement.isFurnished"
            name="chair"
            class="tw-text-xl tw-p-2 tw-text-gray-600"
          >
            <q-tooltip> Umeblowane </q-tooltip>
          </q-icon>
          <q-icon
            v-if="announcement.hasParkingSpace"
            name="local_parking"
            class="tw-text-xl tw-p-2 tw-text-gray-600"
          >
            <q-tooltip> Posiada balkon </q-tooltip>
          </q-icon>
          <q-icon
            v-if="announcement.hasBalcony"
            name="balcony"
            class="tw-text-xl tw-p-2 tw-text-gray-600"
          >
            <q-tooltip> Posiada balkon </q-tooltip>
          </q-icon>
          <q-icon
            v-if="announcement.isAnimalFriendly"
            name="pets"
            class="tw-text-xl tw-p-2 tw-text-gray-600"
          >
            <q-tooltip> Przyjazne zwierzętom </q-tooltip>
          </q-icon>
        </div>
      </div>
    </div>
  </q-card>
</template>

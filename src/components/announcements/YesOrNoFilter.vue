<script setup lang="ts">
import { computed, type PropType } from 'vue';

import type { AnnouncementShort } from '@/types/models/Announcement';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  announcements: {
    type: Array as PropType<AnnouncementShort[]>,
    required: true
  },
  filter: {
    type: String as PropType<keyof AnnouncementShort>,
    required: true
  }
});

const countYes = computed(
  () => props.announcements.filter((x) => x[props.filter] === true ).length
);
const countNo = computed(
  () => props.announcements.length - countYes.value
);

const options = defineModel<{ yes: boolean, no: boolean }>();
</script>
<template>
  <div v-if="options" class="tw-flex tw-flex-col">
    <div class="tw-font-semibold">{{ label }}</div>
    <q-checkbox v-model="options.yes" :label="`Tak (${countYes})`" class="tw-m-1" dense />
    <q-checkbox v-model="options.no" :label="`Nie (${countNo})`" class="tw-m-1" dense />
  </div>
</template>

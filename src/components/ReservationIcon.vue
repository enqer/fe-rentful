<script setup lang="ts">
import type { PropType } from 'vue';

import { ReservationStatusEnum } from '@/types/enums';

defineProps({
  status: {
    type: Object as PropType<ReservationStatusEnum>,
    required: true,
  },
});

const getReservationIcon = (status: ReservationStatusEnum) => {
  switch (status) {
    case ReservationStatusEnum.Approved:
      return 'check_circle';
    case ReservationStatusEnum.Unapproved:
      return 'cancel';
    case ReservationStatusEnum.Unresolved:
      return 'help';
  }
};

const getReservationIconColor = (status: ReservationStatusEnum) => {
  switch (status) {
    case ReservationStatusEnum.Approved:
      return 'tw-text-green-500';
    case ReservationStatusEnum.Unapproved:
      return 'tw-text-red-500';
    case ReservationStatusEnum.Unresolved:
      return 'tw-text-yellow-600';
  }
};

const getReservationStatusHint = (status: ReservationStatusEnum) => {
  switch (status) {
    case ReservationStatusEnum.Approved:
      return 'Rezerwacja zatwierdzona';
    case ReservationStatusEnum.Unapproved:
      return 'Rezerwacja niezatwierdzona';
    case ReservationStatusEnum.Unresolved:
      return 'Rezerwacja nierozstrzygnięta';
  }
};
</script>
<template>
  <q-icon
    :name="getReservationIcon(status)"
    :class="getReservationIconColor(status)"
    size="sm"
  >
    <q-tooltip class="bg-primary">
      {{ getReservationStatusHint(status) }}
    </q-tooltip>
  </q-icon>
</template>

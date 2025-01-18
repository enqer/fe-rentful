<script setup lang="ts">
import { getApartmentReservationsAsync } from '@/api/ReservationApi';
import type { ApartmentReservation } from '@/types/models/Reservation';
import { computed, onMounted, ref } from 'vue';
import { RESERVATION_COLUMNS } from '../constants/Columns';

const props = defineProps({
  apartmentId: {
    type: Number,
    required: true,
  },
});

const apartmentReservations = ref<ApartmentReservation[]>([]);

async function setReservations() {
  const result = await getApartmentReservationsAsync(props.apartmentId);
  apartmentReservations.value = result?.data ?? [];
}

onMounted(async () => await setReservations());
</script>
<template>
  <q-table :rows="apartmentReservations" :columns="RESERVATION_COLUMNS" row-key="name" />
</template>

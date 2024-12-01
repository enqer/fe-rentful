<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { getLocationsProvinceGroupedAsync as getProvinceCitiesAsync } from '@/api/LocationApi';
import type { City, ProvinceCities } from '@/types/models/Location';

const locations = ref<ProvinceCities[]>([]);

const selectedProvince = defineModel<string>('province');
const selectedCity = defineModel<City>('city');
const options = ref<City[]>([]);

const provinces = computed(() => locations.value.map((x) => x.province));
const cities = computed(() =>
  locations.value
    .filter((x) => x.province === selectedProvince.value)
    .flatMap((x) => x.cities)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
);

const filterFn = (val: string, update: (callback: () => void) => void) => {
  update(() => {
    const needle = val.toLowerCase();
    options.value = cities.value.filter((option) => {
      return option.name.toLowerCase().indexOf(needle) > -1;
    });
  });
};

onMounted(async () => {
  const result = await getProvinceCitiesAsync();
  locations.value = result?.data ?? [];
});
</script>
<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 tw-w-full">
    <q-select
      v-model="selectedProvince"
      :options="provinces"
      class="tw-text-base md:tw-text-lg xl:tw-text-xl 2xl:tw-text-base md:tw-w-1/2"
      label="Województwo"
      outlined
      dense
    >
      <template #prepend>
        <q-icon name="location_on" />
      </template>
    </q-select>
    <q-select
      v-model="selectedCity"
      :options="options"
      :disable="!selectedProvince"
      class="tw-text-base md:tw-text-lg xl:tw-text-xl 2xl:tw-text-base md:tw-w-1/2"
      label="Miejscowość"
      input-debounce="0"
      option-value="name"
      option-label="name"
      outlined
      use-input
      dense
      @filter="filterFn"
    >
      <template #prepend>
        <q-icon name="location_city" />
      </template>
    </q-select>
  </div>
</template>

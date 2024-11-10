<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import type { NewAnnouncement } from '@/types/models/Announcement';
import { getLocationsProvinceGroupedAsync as getProvinceCitiesAsync } from '@/api/LocationApi';
import type { Coordinate, ProvinceCities } from '@/types/models/Location';
import { addNewAnnouncementAsync } from '@/api/AnnouncementApi';
import { RouterNameEnum } from '@/types/enums';

import MapLeaflet from '../map/MapLeaflet.vue';
import ToggleOption from '@/components/apartments/ToggleOption.vue';
import Paragraph from '@/components/apartments/Paragraph.vue';
import LabelInput from '@/components/apartments/LabelInput.vue';
import RequiredLabel from '@/components/RequiredLabel.vue';
import ImagePicker from '@/components/ImagePicker.vue';
import Currency from '@/components/Currency.vue';
import { useUser } from '@/composables/useUser';

const { userId } = useUser();
const router = useRouter();

const loading = ref(false);
const selectedProvince = ref(null);
const selectedCity = ref(null);
const locations = ref<ProvinceCities[]>([]);
const title = ref('');
const price = ref<number>(0);
const rent = ref<number>(0);
const deposit = ref<number>(0);
const area = ref<number>(0);
const rooms = ref<number>(1);
const location = ref<Coordinate>({ lat: 0, lng: 0 });
const description = ref('');
const allowPets = ref(false);
const hasElevator = ref(false);
const isFurnished = ref(false);
const hasParking = ref(false);
const files = ref<string[]>([]);
const hasBalcony = ref(false);
const roomsOptions = [...Array(11).keys()].slice(1);
const options = ref<string[]>([]);

const provinces = computed(() => locations.value.map((x) => x.province));
const cities = computed(() =>
  locations.value
    .filter((x) => x.province === selectedProvince.value)
    .flatMap((x) => x.cities)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
);

async function onSubmit() {
  const announcement: NewAnnouncement = {
    area: area.value ?? 0,
    dateAdded: new Date(),
    deposit: deposit.value ?? 0,
    description: description.value,
    hasBalcony: hasBalcony.value,
    hasElevator: hasElevator.value,
    hasParkingSpace: hasParking.value,
    isAnimalFriendly: allowPets.value,
    isFurnished: isFurnished.value,
    numberOfRooms: rooms.value ?? 0,
    price: price.value ?? 0,
    rent: rent.value ?? 0,
    title: title.value,
    images: files.value,
    city: selectedCity.value,
    province: selectedProvince.value,
    coordinate: location.value.lat === 0 ? null : location.value,
    userId: userId,
  };
  loading.value = true;
  const result = await addNewAnnouncementAsync(announcement);
  loading.value = false;
  if (result?.status === 200) {
    router.push({ name: RouterNameEnum.Dashboard }); // TODO: change to offer
  }
}

const filterFn = (val: string, update: (callback: () => void) => void) => {
  update(() => {
    const needle = val.toLowerCase();
    options.value = cities.value.filter((option) => {
      return option.toLowerCase().indexOf(needle) > -1;
    });
  });
};

watch(location, () => {
  if (location.value.lat !== 0 || location.value.lng !== 0) {
    selectedProvince.value = null;
    selectedCity.value = null;
  }
});

onMounted(async () => {
  loading.value = true;
  const result = await getProvinceCitiesAsync();
  locations.value = result?.data ?? [];
  loading.value = false;
});
</script>
<template>
  <q-form @submit="onSubmit">
    <q-breadcrumbs
      separator="-"
      class="tw-text-red-500 sm:tw-text-lg md:tw-text-xl xl:tw-text-base 2xl:tw-text-sm"
      active-color="primary"
    >
      <q-breadcrumbs-el label="Strona główna" to="/" />
      <q-breadcrumbs-el label="Nowa oferta" />
    </q-breadcrumbs>
    <div class="tw-flex tw-flex-col 2xl:tw-flex-row">
      <div class="tw-flex-1 2xl:tw-w-1/2">
        <div>
          <Paragraph label="Informacje podstawowe" />
          <div class="tw-flex tw-flex-col tw-gap-y-5 xl:tw-max-w-3/4">
            <LabelInput
              v-model="title"
              :rules="[(val: string) => val !== '' || 'Tytuł nie może być pusty']"
              label="Tytuł"
              type="text"
            />
            <div class="tw-flex tw-gap-x-3">
              <LabelInput
                v-model.number="price"
                :rules="[(val: number) => val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Cena"
                type="number"
              >
                <Currency />
              </LabelInput>
              <LabelInput
                v-model.number="rent"
                :rules="[(val: number) => val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Czynsz"
                type="number"
              >
                <Currency />
              </LabelInput>
              <LabelInput
                v-model.number="deposit"
                :rules="[(val:number) => val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Kaucja"
                type="number"
              >
                <Currency />
              </LabelInput>
            </div>
            <div class="tw-flex tw-gap-x-3">
              <LabelInput
                v-model.number="area"
                :rules="[(val: number) => val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Powierzchnia"
                type="number"
              >
                <div class="tw-text-base lg:tw-text-lg 2xl:tw-text-sm">
                  m<sup class="tw-text-base lg:tw-text-lg 2xl:tw-text-sm">2</sup>
                </div>
              </LabelInput>
              <div class="tw-w-1/3">
                <RequiredLabel label="Liczba pokoi" />
                <q-select
                  v-model="rooms"
                  :rules="[(val: number) => val > 0 || 'Wybierz pozycję']"
                  :options="roomsOptions"
                  outlined
                  dense
                />
              </div>
            </div>
            <Paragraph label="Multimedia" />
            <div class="tw-mb-4">
              <ImagePicker v-model="files" />
            </div>
          </div>
          <Paragraph label="Informacje szczegółowe" />
          <div class="tw-flex tw-flex-col tw-gap-y-4 tw-my-6">
            <div class="tw-flex tw-gap-x-4 lg:tw-gap-x-10">
              <ToggleOption v-model:switched="allowPets" label="Zwierzęta" icon="pets" />
              <ToggleOption
                v-model:switched="hasElevator"
                label="Winda"
                icon="elevator"
              />
              <ToggleOption
                v-model:switched="isFurnished"
                label="Umeblowane"
                icon="chair"
              />
            </div>
            <div class="tw-flex tw-gap-x-4 lg:tw-gap-x-10">
              <ToggleOption
                v-model:switched="hasParking"
                label="Miejsce parkingowe"
                icon="local_parking"
              />
              <ToggleOption v-model:switched="hasBalcony" label="Balkon" icon="balcony" />
            </div>
          </div>
          <div>
            <RequiredLabel label="Opis" />
            <q-editor
              v-model="description"
              class="lg:tw-max-w-3/4 tw-text-base md:tw-text-lg 2xl:tw-text-base"
            />
          </div>
        </div>
      </div>
      <div class="tw-flex-1 2xl:tw-w-1/2">
        <Paragraph label="Lokalizacja" />
        <div>
          <div
            class="tw-flex tw-gap-x-1 tw-font-medium sm:tw-text-lg lg:tw-text-2xl xl:tw-text-base 2xl:tw-text-sm"
          >
            Wpisz lokalizacje
          </div>
          <div class="tw-flex tw-flex-col tw-gap-4">
            <q-select
              v-model="selectedProvince"
              :options="provinces"
              class="tw-text-base md:tw-text-lg xl:tw-text-xl 2xl:tw-text-base"
              label="Wybierz województwo"
              outlined
              dense
              @update:model-value="location = { lat: 0, lng: 0 }"
            >
              <template #prepend>
                <q-icon name="location_on" />
              </template>
            </q-select>
            <q-select
              v-model="selectedCity"
              :options="options"
              :disable="!selectedProvince"
              class="tw-text-base md:tw-text-lg xl:tw-text-xl 2xl:tw-text-base"
              label="Wybierz miejscowość"
              input-debounce="0"
              outlined
              dense
              use-input
              @filter="filterFn"
            >
              <template #prepend>
                <q-icon name="location_city" />
              </template>
            </q-select>
          </div>
        </div>
        <div class="tw-my-6">
          <div class="sm:tw-text-base md:tw-text-lg xl:tw-text-lg 2xl:tw-text-sm">
            Kliknij, aby wybrać dokładną lokalizację
          </div>
          <MapLeaflet v-model="location" />
        </div>
      </div>
    </div>
    <div class="tw-my-7 tw-flex tw-justify-center">
      <q-btn
        color="primary"
        label="Dodaj ogłoszenie"
        class="tw-text-base lg:tw-text-xl 2xl:tw-text-base"
        type="submit"
        no-caps
      />
    </div>
  </q-form>
</template>

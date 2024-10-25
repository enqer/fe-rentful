<script setup lang="ts">
import MapLeaflet from '../map/MapLeaflet.vue';
import Map from '../map/Map.vue';
import { ref } from 'vue';
import ToggleOption from '@/components/apartments/ToggleOption.vue';
import Paragraph from '@/components/apartments/Paragraph.vue';
import LabelInput from '@/components/apartments/LabelInput.vue';
import RequiredLabel from '@/components/RequiredLabel.vue';
import ImagePicker from '@/components/ImagePicker.vue';

const currencySymbol = 'zł';

const title = ref(''); // max 50 znaków
const price = ref<number | null>(null);
const rent = ref<number | null>(null);
const deposit = ref<number | null>(null);
const area = ref<number | null>(null);
const rooms = ref<number | null>(null);
const location = ref('');
const description = ref('');
const allowPets = ref(false);
const isElevator = ref(false);
const isFurnished = ref(false);
const roomsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function onSubmit() {
  console.log('submit');
}
</script>
<template>
  <div>
    <q-breadcrumbs separator="-" class="tw-text-primary" active-color="red">
      <q-breadcrumbs-el label="Strona główna" to="/" />
      <q-breadcrumbs-el label="Nowa oferta" />
    </q-breadcrumbs>
    <div class="tw-flex">
      <div class="tw-flex-1">
        <div>
          <Paragraph label="Informacje podstawowe" />
          <q-form class="tw-flex tw-flex-col tw-gap-y-5 tw-max-w-3/4" @submit="onSubmit">
            <LabelInput
              v-model="title"
              :rules="[(val: string | number | null) => typeof val === 'string' && val !== null && val !== '' || 'Tytuł nie może być pusty']"
              label="Tytuł"
            />
            <div class="tw-flex tw-gap-x-3">
              <LabelInput
                v-model.number="price"
                :rules="[(val: string | number | null) => typeof val === 'number' && val !== null && val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Cena"
              >
                <div class="tw-text-sm">{{ currencySymbol }}</div>
              </LabelInput>
              <LabelInput
                v-model.number="rent"
                :rules="[(val: string | number | null) => typeof val === 'number' && val !== null && val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Czynsz"
              >
                <div class="tw-text-sm">{{ currencySymbol }}</div>
              </LabelInput>
              <LabelInput
                v-model.number="deposit"
                :rules="[(val: string | number | null) => typeof val === 'number' && val !== null && val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Kaucja"
              >
                <div class="tw-text-sm">{{ currencySymbol }}</div>
              </LabelInput>
            </div>
            <div class="tw-flex tw-gap-x-3">
              <LabelInput
                v-model.number="area"
                :rules="[(val: string | number | null) => typeof val === 'number' && val !== null && val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Powierzchnia"
              >
                <div class="tw-flex tw-text-sm">m<sup class="tw-text-xs">2</sup></div>
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
            <div>
              <ImagePicker />
            </div>
          </q-form>
          <Paragraph label="Informacje szczegółowe" />
          <div class="tw-flex tw-gap-x-4 tw-my-3">
            <ToggleOption v-model:switched="allowPets" label="Zwierzęta" icon="pets" />
            <ToggleOption v-model:switched="isElevator" label="Winda" icon="elevator" />
            <ToggleOption
              v-model:switched="isFurnished"
              label="Umeblowane"
              icon="chair"
            />
          </div>
          <div>
            <RequiredLabel label="Opis" />
            <q-editor v-model="description" />
          </div>
        </div>
      </div>
      <div class="tw-flex-1">
        <Paragraph label="Lokalizacja" />
        <div>
          <div class="tw-flex tw-gap-x-1 tw-font-medium">Wpisz lokalizacje</div>
          <q-input :model-value="location" outlined dense hide-bottom-space>
            <template #prepend>
              <q-icon name="location_on" />
            </template>
          </q-input>
        </div>
        <div class="tw-h-96 tw-mt-6">
          <div>Kliknij aby wybrać dokładną lokalizację</div>
          <Map />
        </div>
      </div>
    </div>
  </div>
</template>

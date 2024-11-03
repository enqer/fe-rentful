<script setup lang="ts">
import MapLeaflet from '../map/MapLeaflet.vue';
import { ref } from 'vue';
import ToggleOption from '@/components/apartments/ToggleOption.vue';
import Paragraph from '@/components/apartments/Paragraph.vue';
import LabelInput from '@/components/apartments/LabelInput.vue';
import RequiredLabel from '@/components/RequiredLabel.vue';
import ImagePicker from '@/components/ImagePicker.vue';
import Currency from '@/components/Currency.vue';

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
const hasParking = ref(false);
const hasBalcony = ref(false);
const roomsOptions = [...Array(11).keys()].slice(1);
function onSubmit() {
  console.log('submit');
}
</script>
<template>
  <div>
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
          <q-form
            class="tw-flex tw-flex-col tw-gap-y-5 xl:tw-max-w-3/4"
            @submit="onSubmit"
          >
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
                <Currency />
              </LabelInput>
              <LabelInput
                v-model.number="rent"
                :rules="[(val: string | number | null) => typeof val === 'number' && val !== null && val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Czynsz"
              >
                <Currency />
              </LabelInput>
              <LabelInput
                v-model.number="deposit"
                :rules="[(val: string | number | null) => typeof val === 'number' && val !== null && val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Kaucja"
              >
                <Currency />
              </LabelInput>
            </div>
            <div class="tw-flex tw-gap-x-3">
              <LabelInput
                v-model.number="area"
                :rules="[(val: string | number | null) => typeof val === 'number' && val !== null && val > 0 || 'Nieprawidłowa kwota']"
                class="tw-w-1/3"
                label="Powierzchnia"
              >
                <div class="tw-text-base lg:tw-text-xl xl:tw-text-2xl 2xl:tw-text-base">
                  m<sup class="tw-text-base lg:tw-text-xl xl:tw-text-2xl 2xl:tw-text-sm"
                    >2</sup
                  >
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
              <ImagePicker />
            </div>
          </q-form>
          <Paragraph label="Informacje szczegółowe" />
          <div class="tw-flex tw-flex-col tw-gap-y-4 tw-my-6">
            <div class="tw-flex tw-gap-x-4 lg:tw-gap-x-10">
              <ToggleOption v-model:switched="allowPets" label="Zwierzęta" icon="pets" />
              <ToggleOption v-model:switched="isElevator" label="Winda" icon="elevator" />
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
          <q-input
            :model-value="location"
            class="tw-text-base md:tw-text-lg xl:tw-text-xl 2xl:tw-text-base"
            outlined
            dense
            hide-bottom-space
          >
            <template #prepend>
              <q-icon name="location_on" />
            </template>
          </q-input>
        </div>
        <div class="tw-my-6">
          <div class="sm:tw-text-base md:tw-text-lg xl:tw-text-lg 2xl:tw-text-sm">
            Kliknij aby wybrać dokładną lokalizację
          </div>
          <MapLeaflet />
        </div>
      </div>
    </div>
    <div class="tw-my-7 tw-flex tw-justify-center">
      <q-btn
        color="primary"
        label="Dodaj ogłoszenie"
        class="tw-text-base lg:tw-text-xl 2xl:tw-text-base"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { addTenantToApartmentAsync } from '@/api/ApartmentApi';
import { useNotify } from '@/composables/useNotify';
import type { AddTenant } from '@/types/models/Apartment';
import { ref } from 'vue';

const props = defineProps({
  apartmentId: {
    type: Number,
    required: true,
  },
});
const showDialog = defineModel<boolean>();

const { showSuccess, showWarning } = useNotify();

const tenantGuid = ref('');
const startDate = ref('');
const endDate = ref('');
const price = ref();
const rent = ref();
const deposit = ref();

async function addTenant() {
  if (
    !(tenantGuid.value.trim().length > 0) ||
    !(startDate.value.trim().length > 0) ||
    !(endDate.value.trim().length > 0) ||
    !(price.value > 0)
  ) {
    showWarning('Błąd', 'Wypełnij dane');
    return;
  }
  const tenantLink: AddTenant = {
    apartmentId: props.apartmentId,
    startDate: startDate.value,
    endDate: endDate.value,
    tenantGlobalId: tenantGuid.value,
    deposit: deposit.value,
    price: price.value,
    rent: rent.value,
  };
  const result = await addTenantToApartmentAsync(tenantLink);
  if (result?.status === 200) {
    showSuccess('Operacja powiodła się', 'Wysłano umowę do lokatora');
    showDialog.value = false;
    return;
  }
  showWarning('Nie powiodło się', 'Umowa nie została przesłana do lokatora');
}
</script>
<template>
  <div class="bg-white tw-p-4 tw-w-full">
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-lg">Dodaj lokatora</div>
      <q-btn v-close-popup icon="close" flat dense />
    </div>
    <q-separator />
    <div class="tw-flex tw-flex-col tw-gap-4 tw-my-4">
      <div>Wpisz unikalny identyfikator użytkownika:</div>
      <q-input
        v-model="tenantGuid"
        placeholder="00000000-0000-0000-0000-000000000000"
        outlined
        dense
      />
    </div>
    <div class="tw-flex tw-flex-col tw-gap-4 tw-my-4">
      <div>Wpisz okres najmu:</div>
      <div class="tw-flex tw-items-center tw-gap-x-3">
        Od
        <q-input v-model="startDate" label="Wybierz date" outlined dense>
          <template #append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale" cover>
                <q-date v-model="startDate" color="blue-9" mask="YYYY-MM-DD" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Zamknij" color="blue-9" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        Do
        <q-input v-model="endDate" label="Wybierz date" outlined dense>
          <template #append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale" cover>
                <q-date v-model="endDate" color="blue-9" mask="YYYY-MM-DD" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Zamknij" color="blue-9" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div>Płatności w zł:</div>
    <div class="tw-flex tw-gap-3 tw-my-3">
      <div class="tw-flex tw-items-center tw-gap-x-2">
        <q-input
          v-model.number="price"
          type="number"
          class="tw-w-full"
          label="Cena"
          outlined
          dense
        />
      </div>
      <div class="tw-flex tw-items-center tw-gap-x-2">
        <q-input
          v-model.number="rent"
          type="number"
          class="tw-w-full"
          label="Czynsz"
          outlined
          dense
        />
      </div>
      <div class="tw-flex tw-items-center tw-gap-x-2">
        <q-input
          v-model.number="deposit"
          class="tw-w-full"
          type="number"
          label="Kaucja"
          outlined
          dense
        />
      </div>
    </div>
    <div class="tw-flex tw-gap-x-3 tw-my-4 tw-justify-end">
      <q-btn v-close-popup label="Anuluj" color="blue-9" no-caps flat />
      <q-btn label="Dodaj" color="blue-9" no-caps @click="addTenant" />
    </div>
  </div>
</template>

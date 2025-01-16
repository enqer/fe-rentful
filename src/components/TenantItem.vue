<script setup lang="ts">
import type { Tenant } from '@/types/models/Apartment';
import { ref, type PropType } from 'vue';

const props = defineProps({
  tenant: {
    type: Object as PropType<Tenant>,
    required: true,
  },
});
const icons = [
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_satisfied',
        'sentiment_very_satisfied'
      ]

const ratingTenant = ref(0)
const showTenantDetails = ref(false)
</script>
<template>
  <q-card class="tw-px-6 tw-py-3 tw-flex tw-flex-col tw-gap-y-3">
    <div class="tw-flex tw-justify-between">
      <div>
        <q-icon name="person" size="xl" color="blue-9" />
        <div class="tw-text-base tw-capitalize tw-font-medium">
          {{ tenant.firstName }} {{ tenant.lastName }}
        </div>
      </div>
      <div class="tw-text-gray-500 tw-font-semibold">
        {{ tenant.startDate }} / {{ tenant.endDate }}
      </div>
    </div>
    <div class="tw-flex tw-gap-x-3 tw-items-center tw-justify-between">
      <q-btn
        icon="visibility"
        label="Wyświetl"
        color="blue-9"
        flat
        dense
        stack
        no-caps
        @click="showTenantDetails = true"
      />
      <q-btn icon="mail" label="Wiadomość" color="blue-9" flat dense stack no-caps />
      <q-btn icon="description" label="Raport" color="blue-9" flat dense stack no-caps />
    </div>
    <q-dialog v-model="showTenantDetails">
      <q-card class="tw-p-4">
        <div class="tw-flex tw-justify-between">
          <q-icon name="person" size="xl" color="blue-9" />
          <q-icon
            name="close"
            size="md"
            color="blue-9"
            class="tw-cursor-pointer"
            @click="showTenantDetails = false"
          />
        </div>
        <div class="tw-text-base">
          <div class="tw-capitalize">
            <span>Imię: </span><span>{{ tenant.firstName }}</span>
          </div>
          <div class="tw-capitalize">
            <span>Nazwisko: </span><span>{{ tenant.lastName }}</span>
          </div>
          <div>
            <span>Email: </span><span>{{ tenant.email }}</span>
            <q-btn icon="forward_to_inbox" color="blue-9" size="sm" class="tw-ml-3">
              <q-tooltip>Wyślij email</q-tooltip>
            </q-btn>
          </div>
          <div>
            <span>Nr telefonu: </span><span>{{ tenant.phoneNumber || '---' }}</span>
          </div>
          <div>
            <span>Adres: </span>
            <span>
              {{ tenant.postalCode }} {{ tenant.city }}, {{ tenant.street }}
              {{ tenant.buildingNumber }}, {{ tenant.country }}
            </span>
          </div>
        </div>
        <div class="q-gutter-y-xs column tw-my-3">
          <div>Oceń lokatora:</div>
          <q-rating
            v-model="ratingTenant"
            :max="4"
            :icon="icons"
            size="3em"
            color="green-5"
          />
        </div>
        <div class="tw-flex tw-flex-col tw-gap-y-3">
          <div>Wyślij powiadomienie:</div>
          <div class="tw-flex tw-items-start tw-gap-x-2">
            <div class="tw-w-2/5">Temat:</div>
            <q-input class="tw-w-full" placeholder="Wpisz temat" outlined dense />
          </div>
          <div class="tw-flex tw-items-start tw-gap-x-2">
            <div class="tw-w-2/5">Wiadomość:</div>
            <q-input
              class="tw-w-full"
              type="textarea"
              placeholder="Napisz coś..."
              outlined
              dense
            />
          </div>
          <div class="tw-flex tw-justify-center">
            <q-btn
              label="Wyślij"
              color="blue-9"
              class="tw-px-5"
              size="md"
              dense
              no-caps
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-card>
</template>

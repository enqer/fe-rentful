<script setup lang="ts">
import { onMounted, ref } from 'vue';

import TenantItem from './components/TenantItem.vue';
import { getApartmentByIdAsync } from '@/api/ApartmentApi';
import type { Apartment } from '@/types/models/Apartment';

import AddTenant from './components/AddTenant.vue';
import Reservations from './components/Reservations.vue';
import Payments from '../tenant-panel/components/Payments.vue';
import Reports from '../tenant-panel/components/Reports.vue';

enum Tab {
  Reservations = 'Rezerwacje',
  Reports = 'Zgłoszenia',
  Payments = 'Płatności',
  History = 'Historia',
}

const props = defineProps({
  apartmentId: {
    type: Number,
    required: true,
  },
});

const showAddTenantDialog = ref(false);
const tab = ref(Tab.Reservations);
const loading = ref(false);
const apartment = ref<Apartment>();

async function setApartment() {
  loading.value = true;
  const result = await getApartmentByIdAsync(props.apartmentId);
  apartment.value = result?.data;
  loading.value = false;
}

onMounted(async () => await setApartment());
</script>
<template>
  <div class="tw-flex tw-flex-col tw-gap-5">
    <q-card class="tw-p-4">
      <div>
        <div class="tw-text-xl tw-font-semibold">Panel właściciela</div>
        <q-separator />
      </div>
      <div class="tw-my-10 tw-flex tw-justify-end">
        <q-btn
          color="blue-9"
          label="Dodaj nowego lokatora"
          icon-right="add"
          @click="showAddTenantDialog = true"
        />
      </div>

      <q-tabs
        v-model="tab"
        class="text-grey tw-mt-3"
        active-color="blue-9"
        indicator-color="blue-9"
        align="justify"
        narrow-indicator
        dense
      >
        <q-tab :name="Tab.Reservations" :label="Tab.Reservations" />
        <q-tab :name="Tab.Payments" :label="Tab.Payments" />
        <q-tab :name="Tab.Reports" :label="Tab.Reports" />
        <q-tab :name="Tab.History" :label="Tab.History" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated keep-alive>
        <q-tab-panel :name="Tab.Reservations">
          <Reservations
            :apartment-id="apartmentId"
            :has-announcement="apartment?.hasAnnouncement ?? false"
          />
        </q-tab-panel>
        <q-tab-panel :name="Tab.Reports">
          <Reports
            v-for="(tenant, index) in apartment?.tenants"
            :key="index"
            :agreement-id="tenant.leaseAgreementId"
            :title="`Zgłoszenia użytkownika: ${tenant.firstName} ${tenant.lastName}`"
          />
        </q-tab-panel>
        <q-tab-panel :name="Tab.Payments">
          <Payments
            v-for="(tenant, index) in apartment?.tenants"
            :key="index"
            :agreement-id="tenant.leaseAgreementId"
            :title="`Płatności użytkownika: ${tenant.firstName} ${tenant.lastName}`"
          />
        </q-tab-panel>
        <q-tab-panel :name="Tab.History">
          <div class="text-h6">Movies</div>
          Historia
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div class="tw-p-4">
      <div class="tw-flex tw-gap-10 tw-justify-evenly tw-p-4">
        <TenantItem
          v-for="(tenant, index) in apartment?.tenants"
          :key="index"
          :tenant="tenant"
          @on-rating-change="setApartment"
        />
      </div>
    </div>
    <q-dialog v-model="showAddTenantDialog">
      <AddTenant v-model="showAddTenantDialog" :apartment-id="apartmentId" />
    </q-dialog>
    <q-inner-loading :showing="loading" color="primary" />
  </div>
</template>

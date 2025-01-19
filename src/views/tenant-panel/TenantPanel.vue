<script setup lang="ts">
import { getTenantApartmentsAsync } from '@/api/UserApi';
import type { TenantApartment } from '@/types/models/User';
import { onMounted, ref } from 'vue';
import Payments from './components/Payments.vue';
import AddReport from './components/AddReport.vue';

enum Tab {
  Reports = 'Historia Zgłoszeń',
  Payments = 'Historia Płatności',
}
const tab = ref(Tab.Payments);
const apartments = ref<TenantApartment[]>([]);
const expanded = ref(true);
const showReportDialog = ref(false);
const selectedApartment = ref<TenantApartment>();

async function setUserApartments() {
  const result = await getTenantApartmentsAsync();
  apartments.value = result?.data ?? [];
}

onMounted(async () => await setUserApartments());
</script>
<template>
  <div class="tw-flex tw-flex-col tw-gap-y-8">
    <div class="tw-text-2xl tw-font-medium tw-text-gray-500">Wynajęte mieszkania</div>
    <div class="tw-flex tw-flex-col tw-gap-y-5">
      <q-card v-for="(apartment, index) in apartments" :key="index">
        <div class="tw-p-3 tw-flex tw-justify-between tw-flex-wrap">
          <div>
            <div class="tw-text-blue-500 tw-font-semibold tw-text-base">
              Warunki umowy
            </div>
            <div class="tw-flex tw-flex-col">
              <span class="tw-text-gray-400 tw-font-semibold">Okres umowy: </span>
              <span class="tw-capitalize tw-font-medium">
                {{ apartment.startDate }} / {{ apartment.endDate }}
              </span>
            </div>
            <div class="tw-mt-5">
              <div class="tw-text-blue-500 tw-font-semibold">Koszty:</div>
              <div>
                <span class="tw-text-gray-400 tw-font-semibold">Cena: </span>
                <span class="tw-font-medium">{{ apartment.price }} zł</span>
              </div>
              <div>
                <span class="tw-text-gray-400 tw-font-semibold">Czynsz: </span>
                <span class="tw-font-medium">{{ apartment.rent }} zł</span>
              </div>
              <div>
                <span class="tw-text-gray-400 tw-font-semibold">Kaucja: </span>
                <span class="tw-font-medium">{{ apartment.deposit }} zł</span>
              </div>
            </div>
          </div>
          <div>
            <div class="tw-text-blue-500 tw-font-semibold tw-text-base">Płatności</div>
            <div class="tw-flex tw-flex-col">
              <span class="tw-text-gray-400 tw-font-semibold">
                Następna płatność za okres:
              </span>
              <span class="tw-capitalize tw-font-medium">
                {{ apartment.startDate }} / {{ apartment.endDate }}
              </span>
            </div>
            <div class="tw-my-4">
              <q-btn
                icon-right="add_card"
                label="Przejdź do płatności"
                color="primary"
                no-caps
              >
                <q-badge color="red" rounded floating multi-line>
                  <q-tooltip> Minął okres płatności </q-tooltip>
                </q-badge>
              </q-btn>
            </div>
          </div>
          <div>
            <div class="tw-text-blue-500 tw-font-semibold tw-text-base">Zgłoszenia</div>
            <div class="tw-flex tw-flex-col">
              <span class="tw-text-gray-400 tw-font-semibold">
                Aktualna liczba zgłoszeń:
              </span>
              <span class="tw-capitalize tw-font-medium"> 2 </span>
            </div>
            <div class="tw-my-4">
              <q-btn
                icon-right="add_home_work"
                label="Dodaj nowe zgłoszenie"
                color="primary"
                no-caps
                @click="
                  showReportDialog = true;
                  selectedApartment = apartment;
                "
              />
            </div>
          </div>
          <div>
            <div class="tw-flex tw-justify-between tw-mb-1">
              <div class="tw-text-blue-500 tw-font-semibold tw-text-base">Właściciel</div>
              <q-btn icon="chat" color="primary" class="tw-px-2" size="sm">
                <q-tooltip> Wyślij wiadomość </q-tooltip>
              </q-btn>
            </div>
            <div>
              <span class="tw-text-gray-400 tw-font-semibold">Imie i nazwisko: </span>
              <span class="tw-capitalize tw-font-medium">
                {{ apartment.ownerFirstName }} {{ apartment.ownerLastName }}
              </span>
            </div>
            <div>
              <span class="tw-text-gray-400 tw-font-semibold">Email: </span>
              <span class="tw-capitalize tw-font-medium">{{ apartment.ownerEmail }}</span>
            </div>
            <div>
              <span class="tw-text-gray-400 tw-font-semibold">Nr telefonu: </span>
              <span class="tw-capitalize tw-font-medium">{{
                apartment.ownerPhoneNumber || '---'
              }}</span>
            </div>
          </div>
        </div>
        <q-expansion-item v-model="expanded" hide-expand-icon>
          <template #header>
            <div
              class="tw-flex tw-justify-end tw-p-2 tw-w-full"
              @click="expanded = !expanded"
            >
              <div class="tw-text-blue-500 tw-cursor-pointer hover:tw-underline">
                {{ expanded ? 'Zwiń historię' : 'Rozwiń historię' }}
                <q-icon
                  :name="
                    expanded ? 'keyboard_double_arrow_up' : 'keyboard_double_arrow_down'
                  "
                  color="blue-9"
                />
              </div>
            </div>
          </template>
          <q-card>
            <q-card-section>
              <q-tabs
                v-model="tab"
                class="text-grey tw-mt-3"
                active-color="blue-9"
                indicator-color="blue-9"
                align="justify"
                narrow-indicator
                dense
              >
                <q-tab :name="Tab.Payments" :label="Tab.Payments" />
                <q-tab :name="Tab.Reports" :label="Tab.Reports" />
              </q-tabs>
              <q-tab-panels v-model="tab" animated keep-alive>
                <q-tab-panel :name="Tab.Reports">
                  <Payments />
                </q-tab-panel>
                <q-tab-panel :name="Tab.Payments">
                  <Payments />
                </q-tab-panel>
              </q-tab-panels>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card>
    </div>
    <AddReport
      v-if="selectedApartment"
      v-model="showReportDialog"
      :agreement-id="selectedApartment?.leaseAgreementId"
    />
  </div>
</template>

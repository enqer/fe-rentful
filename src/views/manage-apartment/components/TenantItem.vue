<script setup lang="ts">
import { ref, type PropType } from 'vue';

import type { Tenant } from '@/types/models/Apartment';
import { TenantRatingEnum } from '@/types/models/LeaseAgreement';
import { getLeaseAgreementReportAsync, setTenantRatingAsync } from '@/api/LeaseAgreement';
import { useNotify } from '@/composables/useNotify';

import SendMessage from '@/components/SendMessage.vue';
import { sendNotifyAsync } from '@/api/UserApi';
import type {  SendNotify } from '@/types/models/User';

const icons = [
  'sentiment_very_dissatisfied',
  'sentiment_dissatisfied',
  'sentiment_satisfied',
  'sentiment_very_satisfied'
]

const props = defineProps({
  tenant: {
    type: Object as PropType<Tenant>,
    required: true,
  }
});

const {showWarning, showSuccess} = useNotify();
const emits = defineEmits(['onRatingChange'])

const loading = ref(false)
const ratingTenant = ref<TenantRatingEnum>(props.tenant.rating)
const showTenantDetails = ref(false)
const showSendMail = ref(false)
const subject = ref('')
const content = ref('')


async function onRatingClick(){
  loading.value = true;
  const result = await setTenantRatingAsync(props.tenant.leaseAgreementId, ratingTenant.value)
  loading.value = false;
  if (result?.status === 200) {
    showSuccess('Ocenianie lokatora', 'Zmieniono ocene')
    emits('onRatingChange')
    return;
  }
  showWarning('Ocenianie lokatora', 'Zmiana oceny nie powiodła się')
}

async function downloadReport(){
  loading.value = true;
  const result = await getLeaseAgreementReportAsync(props.tenant.leaseAgreementId)
  loading.value = false;
  if (result?.status === 200) {
    const blob = new Blob([result.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `raport_${props.tenant.leaseAgreementId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    showSuccess('Pobieranie raportu', 'Pobieranie zakończone sukcesem')
    return;
  }
  showWarning('Pobieranie raportu', 'Błąd pobierania')
}


async function sendNotify(){
  loading.value = true;
  const notify : SendNotify = {
    content: content.value,
    subject: subject.value,
    recipients: [props.tenant.email]
  }
  const result = await sendNotifyAsync(notify)
  loading.value = false;
  if (result?.status === 200) {
    showSuccess('Powiadomienie', 'Wysłano wiadomość')
    return;
  }
  showWarning('Powiadomienie', 'Nie wysłano wiadomości')
}
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
      <q-btn
        icon="description"
        label="Raport"
        color="blue-9"
        flat
        dense
        stack
        no-caps
        @click="downloadReport"
      />
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
            <q-btn
              icon="forward_to_inbox"
              color="blue-9"
              size="sm"
              class="tw-ml-3"
              @click="showSendMail = true"
            >
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
            :max="TenantRatingEnum.Excellent"
            :icon="icons"
            size="3em"
            color="green-5"
            @click="onRatingClick"
          />
        </div>
        <div class="tw-flex tw-flex-col tw-gap-y-3">
          <div>Wyślij powiadomienie:</div>
          <div class="tw-flex tw-items-start tw-gap-x-2">
            <div class="tw-w-2/5">Temat:</div>
            <q-input
              v-model="subject"
              class="tw-w-full"
              placeholder="Wpisz temat"
              outlined
              dense
            />
          </div>
          <div class="tw-flex tw-items-start tw-gap-x-2">
            <div class="tw-w-2/5">Wiadomość:</div>
            <q-input
              v-model="content"
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
              @click="sendNotify"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
    <q-inner-loading :showing="loading" color="primary" />
    <SendMessage v-model="showSendMail" :recipient="tenant.email" />
  </q-card>
</template>

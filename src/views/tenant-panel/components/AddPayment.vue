<script setup lang="ts">
import { useNotify } from '@/composables/useNotify';
import { ref } from 'vue';
import Blik from '@/assets/icons/blik.svg';
import type { NewPayment } from '@/types/models/Payment';
import { addPaymentAsync } from '@/api/PaymentApi';

const props = defineProps({
  agreementId: {
    type: Number,
    required: true,
  },
});

const { showSuccess, showWarning } = useNotify();
const emits = defineEmits(['onAdded']);

const showDialog = defineModel<boolean>();
const loading = ref(false);
const blikCode = ref('');

async function payBill() {
  const payment: NewPayment = {
    agreementId: props.agreementId,
  };
  const result = await addPaymentAsync(payment);
  if (result?.status === 200) {
    showSuccess('Dodanie płatności', 'Operacja powiodła się');
    showDialog.value = false;
    emits('onAdded');
    return;
  }
  showWarning('Dodanie płatności', 'Operacja nie powiodła się');
}
</script>
<template>
  <q-dialog v-model="showDialog">
    <q-card class="tw-p-4 tw-min-w-1/4">
      <div class="tw-flex tw-justify-between tw-items-center">
        <div class="tw-text-base">Płatność</div>
        <q-btn icon="close" flat @click="showDialog = false" />
      </div>
      <q-separator />

      <div class="tw-my-8 tw-flex tw-flex-col tw-gap-y-4">
        <div class="tw-flex tw-justify-center">
          <q-img :src="Blik" class="tw-w-[100px]" />
        </div>
        <q-input v-model="blikCode" type="number" maxlength="6" dense outlined />
        <q-btn label="Zapłać" color="primary" no-caps @click="payBill" />
      </div>
    </q-card>
    <q-inner-loading :showing="loading" color="primary" />
  </q-dialog>
</template>

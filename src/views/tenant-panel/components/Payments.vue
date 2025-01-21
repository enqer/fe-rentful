<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { PAYMENT_COLUMNS } from '../constants/Columns';
import { getPaymentsAsync } from '@/api/PaymentApi';
import type { Payment } from '@/types/models/Payment';

const props = defineProps({
  agreementId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
});

const payments = ref<Payment[]>([]);

async function setPayments() {
  const result = await getPaymentsAsync(props.agreementId);
  payments.value = result?.data ?? [];
}

onMounted(async () => await setPayments());
</script>
<template>
  <q-table
    :title="title.length > 0 ? title : ''"
    :rows="payments ?? []"
    :columns="PAYMENT_COLUMNS"
    row-key="id"
    table-header-class="bg-primary tw-text-white"
    title-class="tw-text-base"
  />
</template>

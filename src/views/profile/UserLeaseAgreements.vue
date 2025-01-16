<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import LeaseAgreementsItem from './components/LeaseAgreementsItem.vue';
import { getUserLeaseAgreementsAsync } from '@/api/UserApi';
import type { LeaseAgreementGrouped } from '@/types/models/User';
import { LeaseAgreementStatusEnum } from '@/types/enums';

const leaseAgreements = ref<LeaseAgreementGrouped[]>([]);

async function setLeaseAgreements() {
  const result = await getUserLeaseAgreementsAsync();
  leaseAgreements.value = result?.data ?? [];
}

const countAllAgreements = computed(() =>
  leaseAgreements.value.map((x) => x.leaseAgreements.length)
);
const countAgreements = computed(() => (status: LeaseAgreementStatusEnum) =>
  leaseAgreements.value
    .flatMap((x) => x.leaseAgreements)
    .filter((x) => x.status === status).length
);

onMounted(async () => await setLeaseAgreements());
</script>
<template>
  <div>
    <div class="tw-flex tw-justify-between tw-mb-6">
      <div class="tw-flex tw-flex-col tw-items-center">
        <q-circular-progress
          :value="countAllAgreements"
          :max="countAllAgreements"
          class="text-blue-9 q-ma-md"
          font-size="1.3rem"
          size="50px"
          color="blue-9"
          show-value
        />
        <div class="tw-text-gray-500 tw-font-semibold tw-text-center">
          Otrzymane propozycje umów
        </div>
      </div>
      <div class="tw-flex tw-flex-col tw-items-center">
        <q-circular-progress
          :value="countAgreements(LeaseAgreementStatusEnum.Approved)"
          :max="countAllAgreements"
          class="text-green-7 q-ma-md"
          font-size="1.3rem"
          size="50px"
          color="green-7"
          show-value
        />
        <div class="tw-text-gray-500 tw-font-semibold tw-text-center">Przyjęte umowy</div>
      </div>
      <div class="tw-flex tw-flex-col tw-items-center">
        <q-circular-progress
          :value="countAgreements(LeaseAgreementStatusEnum.Unapproved)"
          :max="countAllAgreements"
          class="text-red-9 q-ma-md"
          font-size="1.3rem"
          size="50px"
          color="red-9"
          show-value
        />
        <div class="tw-text-gray-500 tw-font-semibold tw-text-center">
          Odrzucone umowy
        </div>
      </div>
      <div class="tw-flex tw-flex-col tw-items-center">
        <q-circular-progress
          :value="countAgreements(LeaseAgreementStatusEnum.Unresolved)"
          :max="countAllAgreements"
          class="text-yellow-9 q-ma-md"
          font-size="1.3rem"
          size="50px"
          color="yellow-9"
          show-value
        />
        <div class="tw-text-gray-500 tw-font-semibold tw-text-center">
          Nierozwiązane umowy
        </div>
      </div>
    </div>
    <LeaseAgreementsItem
      v-for="(agreement, index) in leaseAgreements"
      :key="index"
      :lease-agreement="agreement"
      @on-change="setLeaseAgreements"
    />
  </div>
</template>

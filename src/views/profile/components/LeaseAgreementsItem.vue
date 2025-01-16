<script setup lang="ts">
import { useQuasar } from 'quasar';
import { type PropType } from 'vue';

import { setLeaseAgreementStatusAsync } from '@/api/LeaseAgreement';
import { useNotify } from '@/composables/useNotify';
import { LeaseAgreementStatusEnum } from '@/types/enums';
import type { LeaseAgreementGrouped } from '@/types/models/User';


defineProps({
  leaseAgreement: {
    type: Object as PropType<LeaseAgreementGrouped>,
    required: true,
  },
});

const quasar = useQuasar();
const {showWarning, showSuccess} = useNotify();
const emits = defineEmits(['onChange'])

async function onAgreementDecision(agreementId: number, status: LeaseAgreementStatusEnum){
  quasar
    .dialog({
      title: 'Umowa',
      message: `Czy na pewno chcesz ${status === LeaseAgreementStatusEnum.Approved ? 'przyjąć' : 'odrzucić' } propozycję umowy?`,
      cancel: 'anuluj',
      ok: 'Tak',
      persistent: true,
    })
    .onOk(async () => {
      const result = await setLeaseAgreementStatusAsync(agreementId, status)
      if (result?.status === 200){
        showSuccess('Operacja powiodła się', 'Pomyślnie zmieniono status')
        emits('onChange')
        return;
      }
      showWarning('Operacja nie powiodła się', 'Status nie został zmieniony')
    });
}
</script>
<template>
  <q-list class="rounded-borders" bordered>
    <q-expansion-item
      :label="`${leaseAgreement.ownerFirstName} ${leaseAgreement.ownerLastName}`"
      :caption="`Liczba propozycji: ${leaseAgreement.leaseAgreements.length}`"
      icon="description"
      header-class="tw-capitalize tw-text-base tw-font-medium"
      expand-icon-class="blue-9"
      hide-expand-icon
      expand-separator
    >
      <q-card
        v-for="(agreement, index) in leaseAgreement.leaseAgreements"
        :key="index"
        class="tw-bg-gray-300 tw-p-1"
      >
        <q-card-section
          class="tw-bg-white tw-rounded tw-flex tw-justify-between tw-items-center"
        >
          <div>
            <div class="tw-flex tw-gap-x-2 tw-font-medium">
              Okres najmu:
              <div class="tw-text-gray-500 tw-font-semibold">
                {{ agreement.startDate }} - {{ agreement.endDate }}
              </div>
            </div>
            <div class="tw-flex tw-gap-x-5 tw-mt-2">
              <div class="tw-flex tw-items-center tw-gap-x-2">
                <q-icon name="credit_card" size="xs" color="blue-9">
                  <q-tooltip>Cena</q-tooltip>
                </q-icon>
                {{ agreement.price }} zł
              </div>
              <div class="tw-flex tw-items-center tw-gap-x-2">
                <q-icon name="payments" size="xs" color="blue-9">
                  <q-tooltip>Czynsz</q-tooltip>
                </q-icon>
                {{ agreement.rent }} zł
              </div>
              <div class="tw-flex tw-items-center tw-gap-x-2">
                <q-icon name="account_balance" size="xs" color="blue-9">
                  <q-tooltip>Depozyt</q-tooltip>
                </q-icon>
                {{ agreement.deposit }} zł
              </div>
            </div>
          </div>
          <div
            v-if="agreement.status === LeaseAgreementStatusEnum.Unresolved"
            class="tw-flex tw-flex-col tw-gap-y-3"
          >
            <q-btn
              label="Zaakceptuj"
              color="green-7"
              class="tw-text-2x"
              size="sm"
              no-caps
              @click="
                onAgreementDecision(agreement.id, LeaseAgreementStatusEnum.Approved)
              "
            />
            <q-btn
              label="Odrzuć"
              color="red-8"
              class="tw-text-2x"
              size="sm"
              no-caps
              @click="
                onAgreementDecision(agreement.id, LeaseAgreementStatusEnum.Unapproved)
              "
            />
          </div>
          <div v-else class="tw-flex tw-flex-col tw-gap-y-3">
            <q-btn
              v-if="agreement.status === LeaseAgreementStatusEnum.Approved"
              label="Zaakceptowano"
              color="green-7"
              class="tw-text-2x"
              size="sm"
              no-caps
              disable
            />
            <q-btn
              v-else
              label="Odrzucono"
              color="red-8"
              class="tw-text-2x"
              size="sm"
              no-caps
              disable
            />
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

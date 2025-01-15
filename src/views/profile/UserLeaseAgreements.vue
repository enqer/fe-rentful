<script setup lang="ts">
import { onMounted } from 'vue';
import LeaseAgreementsItem from './components/LeaseAgreementsItem.vue';
import { getUserLeaseAgreementsAsync } from '@/api/UserApi';

async function setLeaseAgreements() {
  const result = await getUserLeaseAgreementsAsync();
}

onMounted(async () => await setLeaseAgreements());
</script>
<template>
  <div>
    <LeaseAgreementsItem />
  </div>
</template>

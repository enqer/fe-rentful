<script setup lang="ts">
import { notifications } from '@/services/SignalRService';
import { onMounted, ref } from 'vue';

const show = ref(true);

const handleNotification = (email: string, message: string) => {
  console.log(`[${email}]: ${message}`);
};

onMounted(() => {
  console.log(notifications.value);
});
</script>
<template>
  <q-icon
    class="tw-text-primary tw-cursor-pointer"
    name="notifications"
    size="sm"
    @mouseover="show = true"
    @mouseleave="show = false"
  >
    <q-badge color="red" floating rounded>{{ notifications.length }}</q-badge>
    <q-menu v-model="show" transition-show="rotate" transition-hide="rotate">
      <q-list style="min-width: 100px">
        <q-item clickable>
          <q-item-section>Having fun</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>Crazy for transitions</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section>Mind blown</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-icon>
</template>

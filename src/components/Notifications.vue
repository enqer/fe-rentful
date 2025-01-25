<script setup lang="ts">
import { notifications } from '@/services/SignalRService';
import { computed, ref } from 'vue';

const showNotifications = ref(true);

const countNotWatched = computed(
  () => notifications.value.filter((x) => !x.isWatched).length
);

function onHide() {
  notifications.value = notifications.value.map((notification) =>
    notification.isWatched ? notification : { ...notification, isWatched: true }
  );
}
function onDelete(guidToDelete: string) {
  notifications.value = notifications.value.filter((x) => x.guid != guidToDelete);
}
</script>
<template>
  <q-icon class="tw-text-primary tw-cursor-pointer" name="notifications" size="sm">
    <q-badge color="red" floating rounded>{{ countNotWatched }}</q-badge>
    <q-menu
      v-model="showNotifications"
      transition-show="rotate"
      transition-hide="rotate"
      anchor="bottom middle"
      self="top middle"
      @hide="onHide"
    >
      <q-list style="width: 350px">
        <q-item v-for="(notify, index) in notifications" :key="index" clickable>
          <q-item-section>
            <div class="tw-flex tw-items-center tw-mb-1 tw-justify-between">
              <div class="tw-flex tw-items-center tw-gap-x-2">
                <q-avatar color="primary" text-color="white" size="1.2rem">
                  {{ notify.senderFirstName.charAt(0) }}
                </q-avatar>
                <div
                  class="tw-text-primary tw-font-semibold tw-capitalize"
                  style="font-size: 0.8rem"
                >
                  {{ notify.senderFirstName }} {{ notify.senderLastName }}
                </div>
              </div>
              <div>
                <q-icon v-if="notify.isWatched" name="check" />
                <q-icon name="close" @click.stop="onDelete(notify.guid)" />
              </div>
            </div>
            <div class="tw-text-blue-600 tw-font-semibold first-letter:tw-capitalize">
              {{ notify.subject }}
            </div>
            <div
              class="tw-text-gray-600 tw-font-medium first-letter:tw-capitalize tw-break-words tw-w-full"
            >
              {{ notify.content }}
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-icon>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { ref } from 'vue';

const emits = defineEmits(['onPickedDateTime']);

const todayDate = new Date();
const todayDateTime = useDateFormat(todayDate, 'YYYY-MM-DD HH:mm').value;
const pickedDate = ref<string | null>(null);
const pickedTime = ref<string | null>(null);

function optionsFn(date: string) {
  return date.replace(/\//g, '-') >= todayDateTime;
}

function onPickedDateTime() {
  emits('onPickedDateTime', `${pickedDate.value} ${pickedTime.value}`);
}
function clear() {
  pickedDate.value = null;
  pickedTime.value = null;
}
</script>
<template>
  <q-btn icon="event" color="primary" class="cursor-pointer" @click="clear">
    <q-popup-proxy anchor="bottom middle" self="top middle" cover>
      <q-date
        v-if="!pickedDate"
        v-model="pickedDate"
        :options="optionsFn"
        mask="YYYY-MM-DD"
        color="primary"
        minimal
      />
      <q-time v-if="pickedDate" v-model="pickedTime" mask="HH:mm" color="primary">
        <div class="tw-flex tw-justify-center">
          <q-btn
            v-close-popup
            :disable="!pickedTime"
            label="Wybierz"
            color="primary"
            no-caps
            @click="onPickedDateTime"
          />
        </div>
      </q-time>
    </q-popup-proxy>
  </q-btn>
</template>

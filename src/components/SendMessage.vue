<script setup lang="ts">
import { sendMailToUserAsync } from '@/api/UserApi';
import { useNotify } from '@/composables/useNotify';
import type { SendMail } from '@/types/models/User';
import { ref } from 'vue';

const props = defineProps({
  recipient: {
    type: String,
    required: true,
  },
});

const { showWarning, showSuccess } = useNotify();
const showDialog = defineModel<boolean>();
const subject = ref('');
const content = ref('');
const loading = ref(false);

async function sendMessage() {
  loading.value = true;
  const email: SendMail = {
    content: content.value,
    recipient: props.recipient,
    subject: subject.value,
  };
  const result = await sendMailToUserAsync(email);
  loading.value = false;
  if (result?.status === 200) {
    showSuccess('Wysyłanie wiadomości', ' Operacja powiodła się');
    onCancelClick();
    return;
  }
  showWarning('Wysyłanie wiadomości', ' Operacja nie powiodła się');
}

function onCancelClick() {
  showDialog.value = false;
  subject.value = '';
  content.value = '';
}
</script>
<template>
  <q-dialog v-model="showDialog">
    <q-card class="tw-p-3 tw-flex tw-flex-col tw-gap-y-3">
      <div class="tw-flex tw-justify-between tw-w-[350px]">
        <div class="tw-text-base">Wysyłanie wiadomości email</div>
        <q-btn v-close-popup icon="close" size="sm" class="tw-p-0" flat />
      </div>
      <q-separator class="tw-mb-3" />
      <div class="tw-text-gray-500">
        Odbiorca: <span class="tw-text-blue-600">{{ recipient }}</span>
      </div>
      <div>
        <div>Temat:</div>
        <q-input v-model="subject" outlined dense />
      </div>
      <div>
        <div>Treść:</div>
        <q-input v-model="content" type="textarea" outlined dense />
      </div>
      <div class="tw-flex tw-justify-center">
        <q-btn label="Anuluj" color="blue-9" no-caps flat @click="onCancelClick" />
        <q-btn label="Wyślij" color="blue-9" no-caps @click="sendMessage" />
      </div>
    </q-card>
    <q-inner-loading v-show="loading" color="blue-9" />
  </q-dialog>
</template>

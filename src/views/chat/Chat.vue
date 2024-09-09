<script setup lang="ts">
import { ref } from 'vue';

import ContactsList from './ContactsList.vue';
import ChatMessage from '@/views/chat/ChatMessage.vue';

import type { UserContacts } from '@/types';

const selectedContact = ref<UserContacts>();

//watch
</script>
<template>
  <main class="tw-m-5 tw-h-[calc(100vh-15vh)] tw-flex tw-items-center tw-gap-x-3">
    <contacts-list v-model="selectedContact" />
    <chat-message :contact-id="selectedContact?.id" />
  </main>
</template>

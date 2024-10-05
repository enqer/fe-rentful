<script setup lang="ts">
import type { UserContacts } from '@/types/models';
import { onMounted, ref } from 'vue';

const contacts = ref<UserContacts[] | null>(null);

const selectedContact = defineModel<UserContacts>();

onMounted(() => {
  contacts.value = [
    {
      id: 1,
      avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
      fullName: 'Ricka Sorkina',
      lastMessage: 'siema',
      lastMessageTime: '13 min temu',
    },
    {
      id: 2,
      avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
      fullName: 'Rick Sorkin',
      lastMessage: 'no elo elo',
      lastMessageTime: '13 min temu',
    },
  ];
});
</script>
<template>
  <q-card class="tw-w-1/4 tw-h-full tw-bg-gray-800">
    <q-list class="rounded-borders" bordered>
      <q-item-label header>Friends</q-item-label>
      <div v-for="(contact, index) in contacts" :key="index">
        <q-item v-ripple clickable>
          <q-item-section avatar>
            <q-avatar>
              <img :src="contact.avatar" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ contact.fullName }}</q-item-label>
            <q-item-label lines="2" caption>
              <span class="text-weight-bold">Ty: </span>
              {{ contact.lastMessage }}
            </q-item-label>
          </q-item-section>
          <q-item-section side top> {{ contact.lastMessageTime }} </q-item-section>
        </q-item>
        <q-separator inset="item" />
      </div>
    </q-list>
  </q-card>
</template>

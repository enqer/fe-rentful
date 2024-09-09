<script setup lang="ts">
defineProps<{
  contactId?: number;
}>();
</script>
<template>
  <q-card class="tw-flex-1 tw-h-full tw-bg-gray-700">
    <div>
      <q-chat-message
        :text="['Have you seen Quasar?']"
        text-color="white"
        bg-color="primary"
        sent
      >
        <template #name>me</template>
        <template #stamp>7 minutes ago</template>
        <template #avatar>
          <img
            class="q-message-avatar q-message-avatar--sent"
            src="https://cdn.quasar.dev/img/avatar4.jpg"
          />
        </template>
      </q-chat-message>

      <q-chat-message bg-color="amber">
        <template #name>Mary</template>
        <template #avatar>
          <img
            class="q-message-avatar q-message-avatar--received"
            src="https://cdn.quasar.dev/img/avatar2.jpg"
          />
        </template>

        <div>Already building an app with it...</div>

        <q-spinner-dots size="2rem" />
      </q-chat-message>
    </div>
  </q-card>
</template>

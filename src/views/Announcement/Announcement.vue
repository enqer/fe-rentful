<script setup lang="ts">
const props = defineProps({
  announcementId: {
    type: Number,
    required: true,
  },
});
</script>
<template>
  <div>
    {{ announcementId }}
  </div>
</template>

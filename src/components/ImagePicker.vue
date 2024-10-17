<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const file = ref<File | null>(null);
const filePreview = ref<string | null>(null);

function getFile() {
  if (!file.value) {
    return '';
  }
  const reader = new FileReader();
  reader.readAsDataURL(file.value);
  reader.onload = function () {
    filePreview.value = reader.result as string;
  };
  return '';
}

watch(file, () => {
  getFile();
});
</script>
<template>
  <div class="tw-w-20 tw-h-16 tw-border tw-border-solid tw-border-gray-500">
    <div class="tw-relative tw-flex tw-items-center">
      <q-file
        v-model="file"
        class="tw-z-1"
        accept=".jpg, image/*"
        borderless
        hide-bottom-space
      />
      <q-icon class="tw-absolute tw-left-0 tw-right-0 tw-m-auto" name="add" size="xs" />
    </div>
    <div class="tw-relative tw-flex tw-items-center">
      <!-- <q-img :src="getFile" :alt="file?.name" class="tw-h-full tw-w-full" /> -->
      <q-img :src="filePreview" class="tw-h-1/2 tw-w-1/2 tw-z-10" />
      <q-icon
        class="tw-absolute tw-left-0 tw-right-0 tw-m-auto tw-h-full tw-w-full"
        name="close"
        size="md"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const files = ref<string[]>([]);

function handleFiles(file: File[]) {
  file.forEach((file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      files.value.push(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
}

function deleteImg(file: string) {
  const index = files.value.findIndex((x) => x === file);
  if (index !== -1) {
    files.value.splice(index, 1);
  }
}
</script>
<template>
  <div>
    <q-uploader
      url="/api/img"
      label="Zdjęcia"
      style="max-width: 300px; max-height: 400px"
      accept="image/*"
      max-files="5"
      thumbnail-fit="10%"
      multiple
      hide-upload-btn
      @added="handleFiles"
    >
      <template #list>
        <div class="tw-flex tw-flex-wrap">
          <div v-for="(preview, index) in files" :key="index" class="tw-relative">
            <q-btn
              class="tw-absolute -tw-left-5 -tw-top-3"
              icon="close"
              color="negative"
              flat
              @click="deleteImg(preview)"
            />
            <img
              :src="preview"
              alt="Image Preview"
              style="max-width: 100px; margin: 10px"
            />
          </div>
        </div>
      </template>
    </q-uploader>
  </div>
</template>

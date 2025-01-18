<script setup lang="ts">
const maxFiles = 5;
const files = defineModel<string[]>({ default: [] });

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
  <q-uploader
    url="/api/img"
    class="tw-w-full"
    label="Zdjęcia"
    accept="image/*"
    multiple
    hide-upload-btn
    @added="handleFiles"
  >
    <template #header="scope">
      <div class="row no-wrap items-center q-pa-sm q-gutter-xs tw-h-14">
        <div class="col">
          <div class="q-uploader__title tw-text-base xl:tw-text-base 2xl:tw-text-sm">
            Zdjęcia
          </div>
        </div>
        <q-btn
          v-if="scope.canAddFiles && files.length < maxFiles"
          type="a"
          icon="add_box"
          round
          dense
          flat
          @click="scope.pickFiles"
        >
          <q-uploader-add-trigger />
          <q-tooltip>Dodaj zdjęcie</q-tooltip>
        </q-btn>
      </div>
    </template>
    <template #list>
      <div class="tw-flex tw-flex-wrap tw-gap-x-4">
        <div
          v-for="(preview, index) in files"
          :key="index"
          class="tw-relative tw-flex tw-items-center"
        >
          <q-btn
            class="tw-absolute -tw-right-6 -tw-top-3 tw-text-base lg:tw-text-xl 2xl:tw-text-base"
            icon="close"
            color="negative"
            flat
            @click="deleteImg(preview)"
          />
          <img :src="preview" alt="Image Preview" class="tw-w-20 tw-m-3 lg:tw-w-24">
        </div>
      </div>
    </template>
  </q-uploader>
</template>

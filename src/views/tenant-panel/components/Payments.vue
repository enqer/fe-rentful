<script setup lang="ts">
//
</script>
<template>
  <div>
    <div></div>
    <q-table
      :rows="[1, 2, 3]"
      :columns="['32', '3']"
      row-key="name"
      table-header-class="bg-primary tw-text-white"
    />
  </div>
</template>

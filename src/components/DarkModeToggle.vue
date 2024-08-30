<script setup lang="ts">
import { ref } from 'vue';

const isDarkMode = ref(false);
</script>
<template>
  <q-toggle
    v-model="isDarkMode"
    unchecked-icon="sunny"
    checked-icon="mode_night"
    size="xl"
    dark
  />
</template>
<style scope>
.q-toggle__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 1.5em !important;
}
.q-toggle__track {
  border: 1px solid black;
  height: 0.4em !important;
  width: 0.8em !important;
  border-radius: 0.4em !important;
}
.q-toggle__inner:hover .q-toggle__track {
  /* border: 1px solid #2596be; */
  border: 1px solid #316dbe;
}
.q-toggle__thumb {
  height: 0.35em !important;
  width: 0.35em !important;
  top: 0.33em !important;
  color: transparent;
}
.q-toggle__inner--truthy .q-toggle__track {
  background-color: #27272a;
}
.q-toggle__inner--truthy .q-toggle__thumb {
  left: 0.8em !important;
}
.q-toggle__inner--falsy .q-toggle__track {
  background-color: white;
}
.q-toggle__inner--falsy .q-toggle__thumb {
  left: 0.4em !important;
}
</style>

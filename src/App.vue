<script setup lang="ts">

</script>

<template>
  <q-layout class="layout">
    <!-- <q-header ref="nav" class="bg-white" elevated>
      <Navigation />
    </q-header> -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Montserrat', Helvetica, Arial, Lucida, sans-serif;
}
</style>

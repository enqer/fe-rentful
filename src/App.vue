<script setup lang="ts">
import Navigation from '@/components/navigation/Navigation.vue';
</script>

<template>
  <q-layout class="layout tw-flex tw-flex-col" style="max-width: 1920px; margin: auto">
    <q-header v-if="true" class="bg-white" elevated>
      <Navigation />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Poppins', Helvetica, Arial, Lucida, sans-serif;
}
</style>

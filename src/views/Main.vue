<script setup lang="ts">
import Logo from '@/components/Logo.vue';
</script>
<template>
  <q-page class="column justify-center">
    <div class="row items-center justify-evenly full-height">
      <div>
        <logo />
      </div>
      <div class="column">
        <h3>Lorem ipsum dolor sit amet.</h3>
        <div>
          <h5 class="">Dołącz już dziś.</h5>
          <q-btn
            class="text-capitalize"
            label="Utwórz konto"
            type="submit"
            color="primary"
          />
          <div>
            <p class="hover:tw-underline tw-bg-red-900">Masz już konto?</p>
            <q-btn
              class="text-capitalize !hover:tw-bg-red"
              label="Zaloguj się"
              type="submit"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row gap-y-10">
      <p>qewqe</p>
      <p>qewqe</p>
      <p>qewqe</p>
    </div>
  </q-page>
</template>

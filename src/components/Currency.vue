<script setup lang="ts">
import { currencySymbol } from '@/constants/Symbols';
</script>
<template>
  <div class="tw-text-base lg:tw-text-xl xl:tw-text-2xl 2xl:tw-text-lg">
    {{ currencySymbol }}
  </div>
</template>

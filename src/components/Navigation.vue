<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import NavigationItem from './NavigationItem.vue';
import DarkModeToggle from './DarkModeToggle.vue';
import UserMenuItem from './UserMenuItem.vue';
import { ref } from 'vue';

const showUserMenu = ref(false);
</script>
<template>
  <main class="tw-flex tw-justify-between tw-mx-20">
    <div class="tw-flex tw-items-center">
      <Logo class="tw-size-18 tw-mr-10" />
      <div class="tw-flex tw-gap-x-7">
        <navigation-item path="/dashboard" name="Dashboard" />
        <navigation-item path="/login" name="login" />
        <navigation-item path="/register" name="register" />
      </div>
    </div>
    <div class="tw-px-6 tw-flex tw-items-center">
      <dark-mode-toggle />
      <div class="tw-px-4 tw-relative">
        <!-- <div class="tw-flex tw-justify-center tw-items-center tw-cursor-pointer">
          <span class="tw-capitalize tw-text-primary tw-font-semibold tw-text-lg">
            rick sorkin
          </span>
          <q-icon class="tw-text-primary" name="keyboard_arrow_down" size="sm" />
        </div>
        <div
          :class="[showUserMenu ? 'tw-visible' : 'tw-invisible']"
          class="tw-absolute tw-transition-all tw-duration-500 tw-ease-in tw-p-3 tw-border tw-border-primary tw-border-solid tw-rounded-lg !tw-bg-white"
        >
          <span class="tw-text-primary tw-cursor-pointer">hgehe</span>
        </div> -->
        <q-btn-dropdown
          v-model="showUserMenu"
          class="tw-text-primary tw-capitalize hover:!tw-bg-transparent"
          label="rick sorkin"
          flat
          unelevated
          @mouseenter="showUserMenu = true"
        >
          <q-list>
            <user-menu-item name="profil" path="/" />
            <user-menu-item name="przełącz konto" path="/" />
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class="tw-px-2">
        <router-link to="/settings">
          <q-icon class="tw-text-primary" name="settings" size="sm" />
        </router-link>
      </div>
    </div>
  </main>
</template>

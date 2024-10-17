<script setup lang="ts">
import MinimalLogo from '@/components/MinimalLogo.vue';
import NavigationItem from '@/components/navigation/NavigationItem.vue';
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import UserMenuItem from '@/components/UserMenuItem.vue';
import { ref } from 'vue';
import router from '@/router';
import { RouterNameEnum, RouterUrlEnum } from '@/types/enums';

const showUserMenu = ref(false);

function switchToChat() {
  router.push('/chat');
}
</script>
<template>
  <main class="tw-flex tw-justify-between tw-mx-20">
    <div class="tw-flex tw-items-center">
      <MinimalLogo class="tw-size-18 tw-mr-10" />
      <div class="tw-flex tw-gap-x-7">
        <navigation-item
          :path="RouterUrlEnum.Dashboard"
          :name="RouterNameEnum.Dashboard"
        />
        <navigation-item :path="RouterUrlEnum.Login" :name="RouterNameEnum.Login" />
        <navigation-item :path="RouterUrlEnum.Register" :name="RouterNameEnum.Register" />
        <navigation-item :path="RouterUrlEnum.ApartmentCreator" :name="RouterNameEnum.ApartmentCreator" />
      </div>
    </div>
    <div class="tw-px-6 tw-flex tw-items-center tw-gap-x-4">
      <div>
        <q-icon
          class="tw-text-primary tw-cursor-pointer"
          name="notifications"
          size="sm"
        />
      </div>
      <div>
        <q-icon
          class="tw-text-primary tw-cursor-pointer"
          name="chat"
          size="sm"
          @click="switchToChat"
        />
      </div>
      <dark-mode-toggle @mouseenter="showUserMenu = false" />
      <div class="tw-relative">
        <q-btn-dropdown
          v-model="showUserMenu"
          class="tw-text-primary tw-font-semibold tw-capitalize hover:!tw-bg-transparent"
          label="rick sorkin"
          flat
          unelevated
          @mouseover="showUserMenu = true"
        >
          <q-list @mouseover="showUserMenu = true" @mouseleave="showUserMenu = false">
            <user-menu-item name="profil" path="/profile" />
            <user-menu-item name="przełącz konto" path="/" />
            <user-menu-item name="wyloguj się" path="/" />
          </q-list>
        </q-btn-dropdown>
      </div>
      <div class="tw-px-2" @mouseenter="showUserMenu = false">
        <router-link to="/settings">
          <q-icon class="tw-text-primary" name="settings" size="sm" />
        </router-link>
      </div>
    </div>
  </main>
</template>

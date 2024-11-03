<script setup lang="ts">
import MinimalLogo from '@/components/MinimalLogo.vue';
import NavigationItem from '@/components/navigation/NavigationItem.vue';
import DarkModeToggle from '@/components/DarkModeToggle.vue';
import UserMenuItem from '@/components/UserMenuItem.vue';
import { ref, watch } from 'vue';
import router from '@/router';
import { RouterNameEnum, RouterUrlEnum } from '@/types/enums';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();
const showUserMenu = ref(false);
const openMenu = ref(false);
const showFullNav = ref(true);

function switchToChat() {
  router.push('/chat');
}

watch(width, () => (showFullNav.value = width.value > 1000 ? true : false));
</script>
<template>
  <main>
    <div class="tw-flex tw-justify-between">
      <div class="tw-flex tw-items-center">
        <MinimalLogo class="tw-size-18 tw-mr-4" />
        <div v-if="showFullNav" class="tw-flex tw-gap-x-7">
          <navigation-item
            :path="RouterUrlEnum.Dashboard"
            :name="RouterNameEnum.Dashboard"
          />
          <navigation-item :path="RouterUrlEnum.Login" :name="RouterNameEnum.Login" />
          <navigation-item
            :path="RouterUrlEnum.Register"
            :name="RouterNameEnum.Register"
          />
          <navigation-item
            :path="RouterUrlEnum.NewAnnouncement"
            :name="RouterNameEnum.NewAnnouncement"
          />
        </div>
      </div>
      <div class="sm:tw-px-6 tw-flex tw-items-center tw-justify-end sm:tw-gap-x-4">
        <div>
          <q-icon
            v-if="showFullNav"
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
        <dark-mode-toggle v-if="showFullNav" @mouseenter="showUserMenu = false" />
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
        <q-icon
          v-if="!showFullNav"
          name="menu"
          size="md"
          class="tw-cursor-pointer tw-mr-5"
          flat
          @click="openMenu = true"
        />
      </div>
    </div>
    <div>
      <div
        :class="{ '!tw-translate-x-0': openMenu }"
        class="tw-fixed tw-top-0 tw-right-0 tw-h-full tw-w-3/4 sm:tw-w-[300px] tw-translate-x-500 tw-bg-red tw-shadow-lg tw-flex tw-flex-col tw-pt-8 tw-pl-4 tw-z-10000 tw-transition-all tw-duration-700"
      >
        <div class="tw-flex tw-justify-end tw-pr-4">
          <q-btn icon="close" flat @click="openMenu = false" />
        </div>
        <div class="tw-flex tw-flex-col tw-gap-4 tw-mt-8">
          <navigation-item
            :path="RouterUrlEnum.Dashboard"
            :name="RouterNameEnum.Dashboard"
          />
          <navigation-item :path="RouterUrlEnum.Login" :name="RouterNameEnum.Login" />
          <navigation-item
            :path="RouterUrlEnum.Register"
            :name="RouterNameEnum.Register"
          />
          <navigation-item
            :path="RouterUrlEnum.NewAnnouncement"
            :name="RouterNameEnum.NewAnnouncement"
          />
          <dark-mode-toggle @mouseenter="showUserMenu = false" />
        </div>
      </div>
    </div>
  </main>
</template>

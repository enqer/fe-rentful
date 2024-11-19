import { createWebHistory, createRouter } from 'vue-router';

import { RouterNameEnum, RouterUrlEnum } from '@/types/enums';
import Login from '@/views/identity/Login.vue';
import Main from '@/views/Main.vue';
import Register from '@/views/identity/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Profile from '@/views/profile/Profile.vue';
import UserAddress from '@/views/profile/UserAddress.vue';
import UserPassword from '@/views/profile/UserPassword.vue';
import UserDetails from '@/views/profile/UserDetails.vue';
import Settings from '@/views/settings/Settings.vue';
import NotifySettings from '@/views/settings/NotifySettings.vue';
import AccountSettings from '@/views/settings/AccountSettings.vue';
import PrivacySettings from '@/views/settings/PrivacySettings.vue';
import Chat from '@/views/chat/Chat.vue';
import NewAnnouncement from '@/views/Announcement/NewAnnouncement.vue';
import Announcements from '@/views/Announcement/Announcements.vue';
import Announcement from '@/views/Announcement/Announcement.vue';

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: RouterUrlEnum.Login,
    name: RouterNameEnum.Login,
    component: Login,
  },
  {
    path: RouterUrlEnum.Register,
    name: RouterNameEnum.Register,
    component: Register,
  },
  {
    path: RouterUrlEnum.Dashboard,
    name: RouterNameEnum.Dashboard,
    component: Dashboard,
  },
  {
    path: RouterUrlEnum.Announcements,
    name: RouterNameEnum.Announcements,
    component: Announcements,
  },
  {
    path: RouterUrlEnum.Chat,
    name: RouterNameEnum.Chat,
    component: Chat,
  },
  {
    path: RouterUrlEnum.Profile,
    redirect: RouterUrlEnum.ProfileDetails,
    name: RouterNameEnum.Profile,
    component: Profile,
    children: [
      {
        path: RouterUrlEnum.ProfileDetails,
        name: RouterNameEnum.ProfileDetails,
        component: UserDetails,
      },
      {
        path: RouterUrlEnum.ProfileAddress,
        name: RouterNameEnum.ProfileAddress,
        component: UserAddress,
      },
      {
        path: RouterUrlEnum.ProfilePrivacy,
        name: RouterNameEnum.ProfilePrivacy,
        component: UserPassword,
      },
    ],
  },
  {
    path: RouterUrlEnum.Settings,
    redirect: RouterUrlEnum.SettingsAccount,
    name: RouterNameEnum.Settings,
    component: Settings,
    children: [
      {
        path: RouterUrlEnum.SettingsAccount,
        name: RouterNameEnum.SettingsAccount,
        component: AccountSettings,
      },
      {
        path: RouterUrlEnum.SettingsNotify,
        name: RouterNameEnum.SettingsNotify,
        component: NotifySettings,
      },
      {
        path: RouterUrlEnum.SettingsPrivacy,
        name: RouterNameEnum.SettingsPrivacy,
        component: PrivacySettings,
      },
    ],
  },
  {
    path: RouterUrlEnum.NewAnnouncement,
    name: RouterNameEnum.NewAnnouncement,
    component: NewAnnouncement,
  },
  {
    path: RouterUrlEnum.Announcement,
    name: RouterNameEnum.Announcement,
    component: Announcement,
    props(route: { params: { announcementId: number } }) {
      return {
        announcementId: Number(route.params.announcementId),
      };
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  next();
});

export default router;

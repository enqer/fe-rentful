import type { AuthResponse } from '@/types/models/Identity';
import { useLocalStorage } from '@vueuse/core';

export const rememberMe = useLocalStorage<boolean>('rememberMe', false);
export const auth = useLocalStorage<AuthResponse>('auth', {
  accessToken: '',
});
export const favoriteAnnouncements = useLocalStorage<number[]>('favorite-announcements', [])
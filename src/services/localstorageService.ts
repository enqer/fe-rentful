import type { AuthResponse } from '@/types/models';
import { useLocalStorage } from '@vueuse/core';

export const rememberMe = useLocalStorage<boolean>('rememberMe', false);
export const auth = useLocalStorage<AuthResponse>('auth', {
  accessToken: '',
});

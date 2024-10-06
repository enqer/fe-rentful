import { auth } from '@/services/LocalStorageService';
import { jwtDecode } from 'jwt-decode';

export function useUser() {
  function isLogged() {
    const token = jwtDecode(auth.value.accessToken);
    if (token.exp === undefined) {
      return false;
    }
    const currentTime = Date.now() / 1000;
    return token.exp > currentTime;
  }

  return {
    isLogged,
  };
}

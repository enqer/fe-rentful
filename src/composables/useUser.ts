import { auth } from '@/services/LocalStorageService';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { computed } from 'vue';

interface Payload extends JwtPayload {
  userId: number,
  lastName: string,
  firstName: string,
  email: string,
  userApartments: string[],
  roles: string[]
}


const payload: Payload | null = auth.value.accessToken ? jwtDecode(auth.value.accessToken) : null;

export function useUser() {

  const userId = payload?.userId;
  const user = {
    id: payload?.userId,
    email: payload?.email,
    firstName: payload?.firstName,
    lastName: payload?.lastName,
    roles: payload?.roles,
    apartments: payload?.userApartments
  }

  const isLogged = () => {
    if (payload?.exp === undefined) {
      return false;
    }
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  }

  function logoutUser() {
    auth.value.accessToken = '';
  }



  return {
    user,
    userId,
    isLogged,
    logoutUser
  };
}

import { auth } from '@/services/LocalStorageService';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

interface Payload extends JwtPayload {
  id: number,
  lastName: string,
  firstName: string,
  email: string
}


const payload: Payload = jwtDecode(auth.value.accessToken);

export function useUser() {

  const userId = payload.id;
  const user = {
    id: payload.id,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName
  }

  const isLogged = () => {
    if (payload.exp === undefined) {
      return false;
    }
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  }

  return {
    user,
    userId,
    isLogged,
  };
}

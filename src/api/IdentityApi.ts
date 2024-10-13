import { useAxios } from '@/composables/useAxios';
import type { AuthResponse, LoginUser, RegisterUser } from '@/types/models';
import { HttpMethodEnum } from '@/types/enums';

export function identityApi() {
  async function registerUserAsync(user: RegisterUser) {
    const request = await useAxios<void, RegisterUser>({
      url: '/api/v1/identity/register',
      method: HttpMethodEnum.Post,
      defaultErrorMessage:
        'Utworzenie konta nie powiodło się, spróbuj ponownie później.',
      data: user,
    });
    return request;
  }
  async function loginUserAsync(user: LoginUser) {
    const request = await useAxios<AuthResponse, LoginUser>({
      url: '/api/v1/identity/auth',
      method: HttpMethodEnum.Post,
      defaultErrorMessage:
        'Logowanie nie powiodło się, spróbuj ponownie później.',
      data: user,
    });
    return request;
  }

  return {
    registerUserAsync,
    loginUserAsync,
  };
}
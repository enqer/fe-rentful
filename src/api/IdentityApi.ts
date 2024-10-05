import { useAxios } from '@/composables/useAxios';
import type { RegisterUser } from '@/types/models';
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

  return {
    registerUserAsync,
  };
}

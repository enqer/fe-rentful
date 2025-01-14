import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { ChangePassword, UserInfo } from '@/types/models/User';


export async function getUserInfoAsync() {
  const request = await useAxios<UserInfo, void>({
    url: '/api/v1/users/info',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie danych użytkownika nie powiodło się',
  });
  return request;
}

export async function ChangePasswordAsync(password: ChangePassword) {
  const request = await useAxios<void, ChangePassword>({
    url: '/api/v1/users/change-password',
    method: HttpMethodEnum.Post,
    data: password,
    defaultErrorMessage: 'Zmiana hasła nie powiodła się',
  });
  return request;
}
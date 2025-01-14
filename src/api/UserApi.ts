import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { UserInfo } from '@/types/models/User';


export async function getUserInfoAsync() {
  const request = await useAxios<UserInfo, void>({
    url: '/api/v1/users/info',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie danych użytkownika nie powiodło się',
  });
  return request;
}
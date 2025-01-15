import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { Address } from '@/types/models';
import type { ChangePassword, UserDetails } from '@/types/models/User';

export async function getUserInfoAsync() {
  const request = await useAxios<UserDetails, void>({
    url: '/api/v1/users/info',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie danych użytkownika nie powiodło się',
  });
  return request;
}

export async function getUserAddressAsync() {
  const request = await useAxios<Address, void>({
    url: '/api/v1/users/address',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie adresu użytkownika nie powiodło się',
  });
  return request;
}

export async function changePasswordAsync(password: ChangePassword) {
  const request = await useAxios<void, ChangePassword>({
    url: '/api/v1/users/password',
    method: HttpMethodEnum.Put,
    data: password,
    defaultErrorMessage: 'Zmiana hasła nie powiodła się',
  });
  return request;
}

export async function changeUserAddressAsync(address: Address) {
  const request = await useAxios<void, Address>({
    url: '/api/v1/users/address',
    method: HttpMethodEnum.Put,
    data: address,
    defaultErrorMessage: 'Zmiana adresu nie powiodła się',
  });
  return request;
}

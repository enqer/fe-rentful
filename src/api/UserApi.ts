import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { Address } from '@/types/models';
import type { ChangePassword, LeaseAgreementGrouped, SendMail, SendNotify, TenantApartment, UserDetails } from '@/types/models/User';

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
export async function resetPasswordAsync(email: string) {
  const request = await useAxios<void, ChangePassword>({
    url: `/api/v1/users/${email}/reset-password`,
    method: HttpMethodEnum.Post,
    defaultErrorMessage: 'Nie udało się zresetować hasła',
  });
  return request;
}

export async function sendMailToUserAsync(email: SendMail) {
  const request = await useAxios<void, SendMail>({
    url: '/api/v1/users/send-email',
    method: HttpMethodEnum.Post,
    data: email,
    defaultErrorMessage: 'Nie udało się wysłać email do użytkownika',
  });
  return request;
}
export async function sendNotifyAsync(notify: SendNotify) {
  const request = await useAxios<void, SendNotify>({
    url: '/api/v1/users/send-notify',
    method: HttpMethodEnum.Post,
    data: notify,
    defaultErrorMessage: 'Nie udało się wysłać powiadomienia',
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

export async function getUserLeaseAgreementsAsync() {
  const request = await useAxios<LeaseAgreementGrouped[]>({
    url: '/api/v1/users/lease-agreements',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie umów nie powiodła się',
  });
  return request;
}

export async function getTenantApartmentsAsync() {
  const request = await useAxios<TenantApartment[]>({
    url: '/api/v1/users/apartments',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie mieszkań nie powiodło się',
  });
  return request;
}

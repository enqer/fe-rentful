import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { AddTenant, Apartment } from '@/types/models/Apartment';


export async function getApartmentByIdAsync(apartmentId: number) {
  const request = await useAxios<Apartment, void>({
    url: `/api/v1/apartments/${apartmentId}`,
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie mieszkania nie powiodło się',
  });
  return request;
}

export async function addTenantToApartmentAsync(tenantLink: AddTenant) {
  const request = await useAxios<void, AddTenant>({
    url: '/api/v1/apartments/add-tenant',
    method: HttpMethodEnum.Post,
    data: tenantLink,
    defaultErrorMessage: 'Dodanie lokatora nie powiodło się',
  });
  return request;
}

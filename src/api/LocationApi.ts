import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';

export async function getLocationsProvinceGroupedAsync() {
  const request = await useAxios<void>({
    url: '/api/v1/location',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie lokalizacji nie powiodło się',
  });
  return request;
}


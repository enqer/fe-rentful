import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { Resources } from '@/types/models/Resource';


export async function getUserResourcesAsync() {
  const request = await useAxios<Resources, void>({
    url: '/api/v1/resources',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie zasobów nie powiodło się',
  });
  return request;
}
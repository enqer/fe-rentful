import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { NewApartment } from '@/types/models/Creator';

export function apartmentApi() {
  async function addNewApartmentAsync(apartment: NewApartment) {
    const request = await useAxios<void, NewApartment>({
      url: '/api/v1/apartment',
      method: HttpMethodEnum.Post,
      data: apartment,
      defaultErrorMessage: 'Dodanie nowej oferty nie powiodło się',
    });
    return request;
  }

  return {
    addNewApartmentAsync,
  };
}

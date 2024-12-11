import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';


export async function assignReservationAsync(reservationId: number) {
  const request = await useAxios<void>({
    url: `/api/v1/reservations/${reservationId}`,
    method: HttpMethodEnum.Post,
    defaultErrorMessage: 'Przypisanie spotkania nie powiodło się',
  });
  return request;
}

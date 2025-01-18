import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { ApartmentReservation, UserReservation } from '@/types/models/Reservation';


export async function assignReservationAsync(reservationId: number) {
  const request = await useAxios<void>({
    url: `/api/v1/reservations/${reservationId}`,
    method: HttpMethodEnum.Post,
    defaultErrorMessage: 'Przypisanie spotkania nie powiodło się',
  });
  return request;
}

export async function getUserReservationsAsync() {
  const request = await useAxios<UserReservation[]>({
    url: '/api/v1/reservations',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie rezerwacji nie powiodło się',
  });
  return request;
}

export async function cancelReservationAsync(reservationId: number) {
  const request = await useAxios<void>({
    url: `/api/v1/reservations/${reservationId}/cancel`,
    method: HttpMethodEnum.Post,
    defaultErrorMessage: 'Odwołanie rezerwacji nie powiodło się',
  });
  return request;
}

export async function getApartmentReservationsAsync(apartmentId: number) {
  const request = await useAxios<ApartmentReservation[]>({
    url: `/api/v1/reservations/${apartmentId}`,
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie rezerwacji nie powiodło się',
  });
  return request;
}

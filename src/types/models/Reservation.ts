import type { ReservationStatusEnum } from '../enums';


export interface UserReservation {
  id: number,
  date: string,
  status: ReservationStatusEnum,
  announcementId: number
}

export interface ApartmentReservation {
  reservationId: number,
  date: string,
  status: ReservationStatusEnum,
  globalId?: number,
  firstName?: string,
  lastName?: string,
  email?: string,
  phoneNumber?: string,
}

export interface AddReservations {
  apartmentId: number;
  reservations: string[]
}

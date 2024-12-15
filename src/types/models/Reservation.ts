import type { ReservationStatusEnum } from '../enums';


export interface UserReservation {
  int: number,
  date: string,
  status: ReservationStatusEnum,
  announcementId: number
}
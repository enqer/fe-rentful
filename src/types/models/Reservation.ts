import type { ReservationStatusEnum } from '../enums';


export interface UserReservation {
  id: number,
  date: string,
  status: ReservationStatusEnum,
  announcementId: number
}
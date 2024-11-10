import type { Coordinate } from './Location';

export interface NewAnnouncement {
  title: string;
  price: number;
  rent: number;
  deposit: number;
  area: number;
  numberOfRooms: number;
  images: string[];
  isAnimalFriendly: boolean;
  isFurnished: boolean;
  hasElevator: boolean;
  hasBalcony: boolean;
  hasParkingSpace: boolean;
  description: string;
  coordinate: Coordinate | null;
  city: string | null;
  province: string | null;
  dateAdded: Date;
  userId: number;
}

import type { Coordinate, Location } from './Location';

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
}
export interface NewAnnouncementResponse {
  announcementId: number
}

export interface AnnouncementShort {
  title: string;
  price: number;
  rent: number;
  area: number;
  numberOfRooms: number;
  image: string;
  isAnimalFriendly: boolean;
  isFurnished: boolean;
  hasElevator: boolean;
  hasBalcony: boolean;
  hasParkingSpace: boolean;
  location: Location;
  dateAdded: Date;
}
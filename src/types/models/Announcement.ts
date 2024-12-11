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
  reservations?: string[]
}
export interface NewAnnouncementResponse {
  announcementId: number
}

export interface AnnouncementShort {
  id: number,
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

export interface Reservation {
  id: number;
  date: string
}
export interface AnnouncementDetails {
  id: number,
  title: string;
  price: number;
  rent: number;
  deposit: number;
  area: number;
  numberOfRooms: number;
  isAnimalFriendly: boolean;
  isFurnished: boolean;
  hasElevator: boolean;
  hasBalcony: boolean;
  hasParkingSpace: boolean;
  dateAdded: Date;
  description: string;
  images: string[];
  userId: number;
  email: string;
  telephoneNumber?: string;
  firstName: string;
  lastName: string;
  latitude: number;
  longitude: number;
  province: string;
  city: string;
  isPrecise: boolean;
  reservations: Reservation[]
}

export interface DateTime {
  date: string,
  time: string
}
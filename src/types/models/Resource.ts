

export interface Announcement {
  id: number;
  title: string;
  dateAdded: string
}

export interface Apartment {
  id: number;
  area: number;
  numberOfRooms: number;
  isFurnished: boolean;
  isAnimalFriendly: boolean;
  hasElevator: boolean;
  hasBalcony: boolean;
  hasParkingSpace: boolean;
  thumbnail: string;
}

export interface Resources {
  announcements: Announcement[]
  apartments: Apartment[]
}
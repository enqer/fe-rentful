export interface Coordinate {
  lng: number;
  lat: number;
}

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
  location?: Coordinate;
  city?: string;
  dateAdded: Date;
}

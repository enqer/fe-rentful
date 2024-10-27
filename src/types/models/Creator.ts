export interface Coordinate {
  lng: number;
  lat: number;
}

export interface NewApartment {
  title: string;
  price: number;
  rent: number;
  deposit: number;
  area: number;
  numberOfRooms: number;
  images: string[];
  animalFriendly: boolean;
  elevator: boolean;
  furnished: boolean;
  description: string;
  location?: Coordinate;
  city?: string;
}

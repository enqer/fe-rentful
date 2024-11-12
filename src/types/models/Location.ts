
export interface Coordinate {
  lng: number;
  lat: number;
}


export interface ProvinceCities {
  province: string;
  cities: string[]
}


export interface Location {
  latitude: number,
  longitude: number,
  province: string,
  city: string,
  isPrecise: boolean
}
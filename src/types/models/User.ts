import type { LeaseAgreementStatusEnum } from '../enums';


export interface UserInfo {
  details: UserDetails;
  address: Address
}

export interface UserDetails {
  globalId: string;
  email: string;
  firstName: string;
  lastName: string
}

export interface Address {
  city: string;
  buildingNumber: string;
  street: string;
  postalCode: string;
}

export interface ChangePassword {
  password: string
}

export interface LeaseAgreement {
  id: number;
  startDate: string;
  endDate: string;
  price: number;
  rent: number;
  deposit: number;
  status: LeaseAgreementStatusEnum
}

export interface LeaseAgreementGrouped {
  announcementId: number;
  ownerFirstName: string;
  ownerLastName: string;
  leaseAgreements: LeaseAgreement[]
}


export interface TenantApartment {

  id: number;
  startDate: string;
  endDate: string;
  price: number;
  rent: number;
  deposit: number;
  area: number;
  numberOfRooms: number;
  isFurnished: boolean
  isAnimalFriendly: boolean
  hasElevator: boolean
  hasBalcony: boolean
  hasParkingSpace: boolean
  leaseAgreementId: number;
  ownerId: number;
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPhoneNumber?: string;
}
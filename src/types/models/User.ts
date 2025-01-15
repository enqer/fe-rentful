

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
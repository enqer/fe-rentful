export interface Address {
  postalCode: string;
  street: string;
  city: string;
  buildingNumber: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export interface PrivacyOptions {
  marketing: boolean;
  contacts: boolean;
  sharing: boolean;
  analysis: boolean;
  polls: boolean;
}

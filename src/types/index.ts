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

export interface UserContacts {
  id: number;
  avatar: string;
  fullName: string;
  lastMessage: string;
  lastMessageTime: string;
}

export interface Contact {
  avatar: string;
  fullName: string;
}

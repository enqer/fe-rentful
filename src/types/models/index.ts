export interface ExceptionMessage {
  title: string;
  description: string;
}

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

export interface RegisterUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface Input {
  value: string | number;
}

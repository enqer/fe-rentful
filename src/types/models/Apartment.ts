

export interface Tenant {
  id: number;
  globalId: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  startDate: Date;
  endDate: Date;
  postalCode: string;
  street: string;
  city: string;
  buildingNumber: string;
  country: string;
}

export interface Apartment {
  id: number;
  tenants: Tenant[]
}

export interface AddTenant {
  apartmentId: number;
  tenantGlobalId: string;
  startDate: string;
  endDate: string;
  price: number;
  rent: number;
  deposit: number
}
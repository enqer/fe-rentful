

export interface Tenant {
  id: number;
  firstName: string;
  lastName: string;
  startDate: Date;
  endDate: Date;
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
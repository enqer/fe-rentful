export enum HttpMethodEnum {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export enum ResponseStatusEnum {
  Ok = 200,
  ServerError = 500,
}

export enum RouterNameEnum {
  Login = 'login',
  Register = 'register',
  Dashboard = 'dashboard',
  Chat = 'chat',
  Profile = 'profile',
  ProfileReservations = 'profile-reservations',
  ProfileLeaseAgreements = 'profile-lease-agreements',
  ProfileDetails = 'profile-details',
  ProfileAddress = 'profile-address',
  ProfilePrivacy = 'profile-privacy',
  Settings = 'settings',
  SettingsAccount = 'settings-account',
  SettingsNotify = 'settings-notify',
  SettingsPrivacy = 'settings-privacy',
  ApartmentDetails = 'apartment-details',
  NewAnnouncement = 'announcement',
  Announcements = 'announcements',
  Announcement = 'announcement-details',
  OwnerPanel = 'owner-panel',
  TenantPanel = 'tenant-panel',
  ManageApartment = 'manage-apartment',
}

export enum RouterUrlEnum {
  Login = '/login',
  Register = '/register',
  Dashboard = '/dashboard',
  Chat = '/chat',
  Profile = '/profile',
  ProfileReservations = '/profile/reservations',
  ProfileLeaseAgreements = '/profile/lease-agreements',
  ProfileDetails = '/profile/details',
  ProfileAddress = '/profile/address',
  ProfilePrivacy = '/profile/privacy',
  Settings = '/settings',
  SettingsAccount = '/settings/account',
  SettingsNotify = '/settings/notify',
  SettingsPrivacy = '/settings/privacy',
  ApartmentDetails = '/apartment/:apartmentId',
  NewAnnouncement = '/announcement',
  Announcements = '/announcements',
  Announcement = '/announcement/:announcementId',
  OwnerPanel = '/owner-panel',
  TenantPanel = '/tenant-panel',
  ManageApartment = '/manage-apartment/:apartmentId',
}

export enum ReservationStatusEnum {
  Available = 0,
  Unresolved = 1,
  Unapproved = 2,
  Approved = 3,
  Unavailable = 4
}

export enum LeaseAgreementStatusEnum {
  Unresolved = 1,
  Unapproved = 2,
  Approved = 3
}
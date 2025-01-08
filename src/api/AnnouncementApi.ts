import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { AnnouncementDetails, AnnouncementShort, NewAnnouncement, NewAnnouncementResponse } from '@/types/models/Announcement';

export async function addNewAnnouncementAsync(announcement: NewAnnouncement) {
  const request = await useAxios<NewAnnouncementResponse, NewAnnouncement>({
    url: '/api/v1/announcements',
    method: HttpMethodEnum.Post,
    data: announcement,
    defaultErrorMessage: 'Dodanie nowej oferty nie powiodło się',
  });
  return request;
}

export async function getAnnouncementsAsync() {
  const request = await useAxios<AnnouncementShort[], void>({
    url: '/api/v1/announcements',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie ogłoszeń nie powiodło się',
  });
  return request;
}

export async function getAnnouncementByIdAsync(announcementId: number) {
  const request = await useAxios<AnnouncementDetails, void>({
    url: `/api/v1/announcements/${announcementId}`,
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie ogłoszenia nie powiodło się',
  });
  return request;
}

export async function deleteAnnouncementAsync(announcementId: number) {
  const request = await useAxios<void>({
    url: `/api/v1/announcements/${announcementId}`,
    method: HttpMethodEnum.Delete,
    defaultErrorMessage: 'Usunięcie ogłoszenia nie powiodło się',
  });
  return request;
}
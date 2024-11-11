import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { AnnouncementShort, NewAnnouncement } from '@/types/models/Announcement';

export async function addNewAnnouncementAsync(announcement: NewAnnouncement) {
  const request = await useAxios<void, NewAnnouncement>({
    url: '/api/v1/announcement',
    method: HttpMethodEnum.Post,
    data: announcement,
    defaultErrorMessage: 'Dodanie nowej oferty nie powiodło się',
  });
  return request;
}

export async function getAnnouncementsAsync() {
  const request = await useAxios<AnnouncementShort[], void>({
    url: '/api/v1/announcement',
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie ogłoszeń nie powiodło się',
  });
  return request;
}

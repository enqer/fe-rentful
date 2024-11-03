import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { NewAnnouncement } from '@/types/models/Announcement';

export function announcementApi() {
  async function addNewAnnouncementAsync(apartment: NewAnnouncement) {
    const request = await useAxios<void, NewAnnouncement>({
      url: '/api/v1/announcement',
      method: HttpMethodEnum.Post,
      data: apartment,
      defaultErrorMessage: 'Dodanie nowej oferty nie powiodło się',
    });
    return request;
  }

  return {
    addNewAnnouncementAsync,
  };
}

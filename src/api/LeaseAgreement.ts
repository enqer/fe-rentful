import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum, type LeaseAgreementStatusEnum } from '@/types/enums';
import type { TenantRatingEnum } from '@/types/models/LeaseAgreement';



export async function setLeaseAgreementStatusAsync(agreementId: number, status: LeaseAgreementStatusEnum) {
  const request = await useAxios<void>({
    url: `/api/v1/lease-agreements/${agreementId}/${status}`,
    method: HttpMethodEnum.Post,
    defaultErrorMessage:
      'Zmiana statusu nie powiodła się',
  });
  return request;
}

export async function setTenantRatingAsync(agreementId: number, rate: TenantRatingEnum) {
  const request = await useAxios<void>({
    url: `/api/v1/lease-agreements/${agreementId}/tenant/${rate}`,
    method: HttpMethodEnum.Put,
    defaultErrorMessage:
      'Zmiana oceny nie powiodła się',
  });
  return request;
}

export async function getLeaseAgreementReportAsync(agreementId: number) {
  const request = await useAxios<Blob>({
    url: `/api/v1/lease-agreements/${agreementId}/report`,
    method: HttpMethodEnum.Get,
    responseType: 'blob',
    defaultErrorMessage:
      'Pobieranie raportu nie powiodło się',
  });
  return request;
}
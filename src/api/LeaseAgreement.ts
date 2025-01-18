import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum, type LeaseAgreementStatusEnum } from '@/types/enums';
import type { TenantRatingEnum } from '@/types/models/LeaseAgreement';



export async function setLeaseAgreementStatusAsync(agreementId: number, status: LeaseAgreementStatusEnum) {
  const request = await useAxios<void>({
    url: `/api/v1/leaseAgreements/${agreementId}/${status}`,
    method: HttpMethodEnum.Post,
    defaultErrorMessage:
      'Zmiana statusu nie powiodła się',
  });
  return request;
}
export async function setTenantRating(agreementId: number, rate: TenantRatingEnum) {
  const request = await useAxios<void>({
    url: `/api/v1/leaseAgreements/${agreementId}/tenant/${rate}`,
    method: HttpMethodEnum.Put,
    defaultErrorMessage:
      'Zmiana oceny nie powiodła się',
  });
  return request;
}
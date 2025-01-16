import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum, type LeaseAgreementStatusEnum } from '@/types/enums';



export async function setLeaseAgreementStatusAsync(agreementId: number, status: LeaseAgreementStatusEnum) {
  const request = await useAxios<void>({
    url: `/api/v1/leaseAgreements/${agreementId}/${status}`,
    method: HttpMethodEnum.Post,
    defaultErrorMessage:
      'Zmiana statusu nie powiodła się',
  });
  return request;
}
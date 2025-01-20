import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { NewPayment, Payment } from '@/types/models/Payment';



export async function addPaymentAsync(payment: NewPayment) {
  const request = await useAxios<void, NewPayment>({
    url: '/api/v1/payments',
    method: HttpMethodEnum.Post,
    data: payment,
    defaultErrorMessage: 'Dodanie płatności nie powiodło się',
  });
  return request;
}

export async function getPaymentsAsync(agreementId: number) {
  const request = await useAxios<Payment[], void>({
    url: `/api/v1/payments/${agreementId}`,
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobranie płatności nie powiodło się',
  });
  return request;
}
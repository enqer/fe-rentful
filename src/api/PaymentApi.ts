import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { NewPayment } from '@/types/models/Payment';



export async function addPaymentAsync(payment: NewPayment) {
  const request = await useAxios<void, NewPayment>({
    url: '/api/v1/payments',
    method: HttpMethodEnum.Post,
    data: payment,
    defaultErrorMessage: 'Dodanie płatności nie powiodło się',
  });
  return request;
}
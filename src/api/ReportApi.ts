import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { NewReport } from '@/types/models/Report';


export async function addReportAsync(report: NewReport) {
  const request = await useAxios<void, NewReport>({
    url: '/api/v1/reports',
    method: HttpMethodEnum.Post,
    data: report,
    defaultErrorMessage: 'Dodanie zgłoszenia nie powiodło się',
  });
  return request;
}
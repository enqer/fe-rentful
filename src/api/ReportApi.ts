import { useAxios } from '@/composables/useAxios';
import { HttpMethodEnum } from '@/types/enums';
import type { NewReport, Report, ResolveReport } from '@/types/models/Report';


export async function addReportAsync(report: NewReport) {
  const request = await useAxios<void, NewReport>({
    url: '/api/v1/reports',
    method: HttpMethodEnum.Post,
    data: report,
    defaultErrorMessage: 'Dodanie zgłoszenia nie powiodło się',
  });
  return request;
}

export async function getReportsAsync(agreementId: number) {
  const request = await useAxios<Report[], void>({
    url: `/api/v1/reports/${agreementId}`,
    method: HttpMethodEnum.Get,
    defaultErrorMessage: 'Pobieranie zgłoszeń nie powiodło się',
  });
  return request;
}
export async function resolveReportAsync(report: ResolveReport) {
  const request = await useAxios<void, ResolveReport>({
    url: '/api/v1/reports',
    method: HttpMethodEnum.Put,
    data: report,
    defaultErrorMessage: 'Pobieranie zgłoszeń nie powiodło się',
  });
  return request;
}
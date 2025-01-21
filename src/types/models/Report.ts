import type { ReportStatusEnum, ReportTypeEnum } from '../enums';



export interface NewReport {
  description: string;
  type: ReportTypeEnum
  agreementId: number
}

export interface Report {
  date: string,
  description: string,
  feedback: string,
  id: number
  status: ReportStatusEnum,
  type: ReportTypeEnum,
  leaseAgreementId: number
}

export interface ResolveReport {
  reportId: number,
  feedback: string,
  status: ReportStatusEnum
}
import type { ReportTypeEnum } from '../enums';



export interface NewReport {
  description: string;
  type: ReportTypeEnum
  agreementId: number
}
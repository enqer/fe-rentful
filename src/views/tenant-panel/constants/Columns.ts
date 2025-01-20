import type { QTableColumn } from 'quasar';


export const REPORT_COLUMNS: QTableColumn[] = [
  {
    name: 'date',
    label: 'Data',
    align: 'center',
    field: 'date',
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: 'status',
    sortable: true
  },
  {
    name: 'type',
    label: 'Typ zgłoszenia',
    align: 'left',
    field: 'type',
    sortable: true
  }
]
export const PAYMENT_COLUMNS: QTableColumn[] = [
  {
    name: 'date',
    label: 'Data',
    align: 'center',
    field: 'date',
    sortable: true
  },
  {
    name: 'amount',
    label: 'Kwota [zł]',
    align: 'center',
    field: 'amount',
    sortable: true
  }
]
import type { QTableColumn } from 'quasar';

export const RESERVATION_COLUMNS: QTableColumn[] = [
  {
    name: 'lp',
    label: 'Lp.',
    align: 'right',
    field: 'lp',
    sortable: false
  },
  {
    name: 'status',
    label: 'Status',
    align: 'left',
    field: 'status',
    sortable: true
  },
  {
    name: 'date',
    label: 'Data',
    align: 'center',
    field: 'date',
    sortable: true
  },
  {
    name: 'firstName',
    label: 'Imie',
    align: 'left',
    field: 'firstName',
    format: (x?: string) => x || '---',
    sortable: true
  },
  {
    name: 'lastName',
    label: 'Nazwisko',
    align: 'left',
    field: 'lastName',
    format: (x?: string) => x || '---',
    sortable: true
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: 'email',
    format: (x?: string) => x || '---',
    sortable: true
  },
  {
    name: 'phoneNumber',
    label: 'Numer telefonu',
    align: 'right',
    field: 'phoneNumber',
    format: (x?: string) => x || '---',
    sortable: true
  },
  {
    name: 'btn',
    label: '',
    align: 'center',
    field: 'btn',
  },
]

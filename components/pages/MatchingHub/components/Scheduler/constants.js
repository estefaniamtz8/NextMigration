import dayjs from 'dayjs';

const DEFAULT_EVENTS = [
  {
    id: 0,
    title: 'Cita SAT <> Daniel Nava',
    start: dayjs().toDate(),
    end: dayjs().add(1, 'hour').toDate(),
    details: {
      location: 'Oficina Central Norte - Lago Alberto 760 Anahuac I, 11325, CDMX, MX',
      attachment: { file: null, name: 'Cita-MAEJ970922.pdf' },
      user: { name: 'Daniel Nava', id: 'XD7822190AS' },
    },
  },
  {
    id: 1,
    title: 'Cita IMSS <> Daniel Nava',
    start: dayjs().add(3, 'hour').toDate(),
    end: dayjs().add(4, 'hour').toDate(),
    details: {
      location: 'Oficina Central Norte - Lago Alberto 760 Anahuac I, 11325, CDMX, MX',
      attachment: { file: null, name: 'Cita-MAEJ970922.pdf' },
      user: { name: 'Daniel Nava', id: 'XD7822190AS' },
    },
  },
];

export default DEFAULT_EVENTS;



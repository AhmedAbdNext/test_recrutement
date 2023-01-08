export const goodIntervals = [
  ['05:31', '06:32'],
  ['16:00', '17:00'],
  ['12:31', '12:34'],
];
export const ovelappingIntervals = [
  ['09:30', '12:40'],
  ['05:36', '08:50'],
  ['13:36', '13:37'],
  ['06:00', '20:00'],
  ['14:00', '15:00'],
];
export const normalIntervals = [
  ['14:00', '15:00'],
  ['08:00', '12:30'],
  ['12:35', '12:36'],
  ['13:35', '13:50'],
];

export const normalPayload = [
  {
    id: 1,
    start: '15:00',
    duration: 90,
  },
  {
    id: 2,
    start: '16:30',
    duration: 120,
  },
];
export const overlappingPayload = [
  {
    id: 1,
    start: '09:30',
    duration: 190,
  },
  {
    id: 2,
    start: '05:36',
    duration: 194,
  },
  {
    id: 3,
    start: '13:36',
    duration: 1,
  },
  {
    id: 4,
    start: '06:00',
    duration: 840,
  },
  {
    id: 5,
    start: '14:00',
    duration: 60,
  },
];

export const customOverlappingPayload = [
  {
    id: 1,
    start: '09:00',
    duration: 270,
  },
  {
    id: 2,
    start: '10:00',
    duration: 240,
  },
  {
    id: 3,
    start: '13:00',
    duration: 180,
  },
  {
    id: 4,
    start: '15:30',
    duration: 120,
  },
  {
    id: 5,
    start: '15:00',
    duration: 60,
  },
];
export const matrix = [[1], [1, 2], [1, 2, 3], [2, 3], [3, 4], [3, 4, 5]];

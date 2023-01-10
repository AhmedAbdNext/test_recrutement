import { convertTimeToNumber, sortInterval, dayByMinntes, getStartTime } from './times';
import { getBoxHeight, getMarginTop } from './screenSize';
import { isOverlapping, transformPayload, sortEvents, removeRedundancy, getOverLappingEvents } from './events';
// Mock
import {
  goodIntervals,
  ovelappingIntervals,
  normalPayload,
  normalIntervals,
  overlappingPayload,
  customOverlappingPayload,
  matrix,
} from './mock';

test('should check get box hight', () => {
  expect(getBoxHeight(2400, 60)).toEqual(100);
  expect(getBoxHeight(2400, 120)).toEqual(200);
  expect(getBoxHeight(null, 120)).toEqual(0);
});
test('should check convert time to number', () => {
  expect(convertTimeToNumber('10:30')).toEqual(10.5);
  expect(convertTimeToNumber('11:30')).toEqual(11.5);
  expect(convertTimeToNumber('21:30')).toEqual(21.5);
  expect(convertTimeToNumber('')).toEqual(0);
});
test('should check sort interval', () => {
  expect(convertTimeToNumber('10:30')).toEqual(10.5);
  expect(convertTimeToNumber('11:30')).toEqual(11.5);
  expect(convertTimeToNumber('21:30')).toEqual(21.5);
  expect(convertTimeToNumber('')).toEqual(0);
});

test('should check is overlapping', () => {
  expect(isOverlapping(goodIntervals, ['19:30', '12:40'])).toEqual(false);
  expect(isOverlapping(normalIntervals, ['09:30', '12:40'])).toEqual(true);
  expect(isOverlapping(ovelappingIntervals, ['09:30', '52:40'])).toEqual(true);
  expect(isOverlapping([['23:00', '23:30']], ['13:00', '16:00'])).toEqual(false);
});

test('should update the body payload', () => {
  expect(transformPayload(normalPayload)).toEqual([
    { id: 1, duration: ['15:00', '16:30'] },
    { id: 2, duration: ['16:30', '18:30'] },
  ]);
  expect(transformPayload([])).toEqual([]);
  expect(transformPayload(overlappingPayload)).toEqual([
    { id: 1, duration: ['09:30', '12:40'] },
    { id: 2, duration: ['05:36', '08:50'] },
    { id: 3, duration: ['13:36', '13:37'] },
    { id: 4, duration: ['06:00', '20:00'] },
    { id: 5, duration: ['14:00', '15:00'] },
  ]);
});

test('should check sort Interval', () => {
  expect(sortInterval(goodIntervals)).toEqual(goodIntervals);
  expect(sortInterval(normalIntervals)).toEqual([
    ['08:00', '12:30'],
    ['12:35', '12:36'],
    ['13:35', '13:50'],
    ['14:00', '15:00'],
  ]);
  expect(sortInterval(ovelappingIntervals)).toEqual([
    ['05:36', '08:50'],
    ['09:30', '12:40'],
    ['13:36', '13:37'],
    ['06:00', '20:00'],
    ['14:00', '15:00'],
  ]);
});

test('should remove redundancy', () => {
  expect(removeRedundancy(sortEvents(matrix), 0)).toEqual([
    [1, 2, 3],
    [4, 5],
  ]);
});
test('should check overlapping matrix Ids', () => {
  expect(getOverLappingEvents(customOverlappingPayload)).toEqual([
    [1, 2, 3],
    [4, 5],
  ]);
});

test('should show by minutes', () => {
  expect(dayByMinntes(30)).toEqual([
    ['00:00', '00:30'],
    ['00:30', '01:00'],
    ['01:00', '01:30'],
    ['01:30', '02:00'],
    ['02:00', '02:30'],
    ['02:30', '03:00'],
    ['03:00', '03:30'],
    ['03:30', '04:00'],
    ['04:00', '04:30'],
    ['04:30', '05:00'],
    ['05:00', '05:30'],
    ['05:30', '06:00'],
    ['06:00', '06:30'],
    ['06:30', '07:00'],
    ['07:00', '07:30'],
    ['07:30', '08:00'],
    ['08:00', '08:30'],
    ['08:30', '09:00'],
    ['09:00', '09:30'],
    ['09:30', '10:00'],
    ['10:00', '10:30'],
    ['10:30', '11:00'],
    ['11:00', '11:30'],
    ['11:30', '12:00'],
    ['12:00', '12:30'],
    ['12:30', '13:00'],
    ['13:00', '13:30'],
    ['13:30', '14:00'],
    ['14:00', '14:30'],
    ['14:30', '15:00'],
    ['15:00', '15:30'],
    ['15:30', '16:00'],
    ['16:00', '16:30'],
    ['16:30', '17:00'],
    ['17:00', '17:30'],
    ['17:30', '18:00'],
    ['18:00', '18:30'],
    ['18:30', '19:00'],
    ['19:00', '19:30'],
    ['19:30', '20:00'],
    ['20:00', '20:30'],
    ['20:30', '21:00'],
    ['21:00', '21:30'],
    ['21:30', '22:00'],
    ['22:00', '22:30'],
    ['22:30', '23:00'],
    ['23:00', '23:30'],
    ['23:30', '24:00'],
  ]);
  expect(dayByMinntes(15)).toEqual([
    ['00:00', '00:15'],
    ['00:15', '00:30'],
    ['00:30', '00:45'],
    ['00:45', '01:00'],
    ['01:00', '01:15'],
    ['01:15', '01:30'],
    ['01:30', '01:45'],
    ['01:45', '02:00'],
    ['02:00', '02:15'],
    ['02:15', '02:30'],
    ['02:30', '02:45'],
    ['02:45', '03:00'],
    ['03:00', '03:15'],
    ['03:15', '03:30'],
    ['03:30', '03:45'],
    ['03:45', '04:00'],
    ['04:00', '04:15'],
    ['04:15', '04:30'],
    ['04:30', '04:45'],
    ['04:45', '05:00'],
    ['05:00', '05:15'],
    ['05:15', '05:30'],
    ['05:30', '05:45'],
    ['05:45', '06:00'],
    ['06:00', '06:15'],
    ['06:15', '06:30'],
    ['06:30', '06:45'],
    ['06:45', '07:00'],
    ['07:00', '07:15'],
    ['07:15', '07:30'],
    ['07:30', '07:45'],
    ['07:45', '08:00'],
    ['08:00', '08:15'],
    ['08:15', '08:30'],
    ['08:30', '08:45'],
    ['08:45', '09:00'],
    ['09:00', '09:15'],
    ['09:15', '09:30'],
    ['09:30', '09:45'],
    ['09:45', '10:00'],
    ['10:00', '10:15'],
    ['10:15', '10:30'],
    ['10:30', '10:45'],
    ['10:45', '11:00'],
    ['11:00', '11:15'],
    ['11:15', '11:30'],
    ['11:30', '11:45'],
    ['11:45', '12:00'],
    ['12:00', '12:15'],
    ['12:15', '12:30'],
    ['12:30', '12:45'],
    ['12:45', '13:00'],
    ['13:00', '13:15'],
    ['13:15', '13:30'],
    ['13:30', '13:45'],
    ['13:45', '14:00'],
    ['14:00', '14:15'],
    ['14:15', '14:30'],
    ['14:30', '14:45'],
    ['14:45', '15:00'],
    ['15:00', '15:15'],
    ['15:15', '15:30'],
    ['15:30', '15:45'],
    ['15:45', '16:00'],
    ['16:00', '16:15'],
    ['16:15', '16:30'],
    ['16:30', '16:45'],
    ['16:45', '17:00'],
    ['17:00', '17:15'],
    ['17:15', '17:30'],
    ['17:30', '17:45'],
    ['17:45', '18:00'],
    ['18:00', '18:15'],
    ['18:15', '18:30'],
    ['18:30', '18:45'],
    ['18:45', '19:00'],
    ['19:00', '19:15'],
    ['19:15', '19:30'],
    ['19:30', '19:45'],
    ['19:45', '20:00'],
    ['20:00', '20:15'],
    ['20:15', '20:30'],
    ['20:30', '20:45'],
    ['20:45', '21:00'],
    ['21:00', '21:15'],
    ['21:15', '21:30'],
    ['21:30', '21:45'],
    ['21:45', '22:00'],
    ['22:00', '22:15'],
    ['22:15', '22:30'],
    ['22:30', '22:45'],
    ['22:45', '23:00'],
    ['23:00', '23:15'],
    ['23:15', '23:30'],
    ['23:30', '23:45'],
    ['23:45', '24:00'],
  ]);
});

test('Should return the starting time', () => {
  expect(getStartTime(overlappingPayload)).toEqual('05:36');
  expect(getStartTime(normalPayload)).toEqual('15:00');
  expect(getStartTime(customOverlappingPayload)).toEqual('09:00');
});

test('Should return the margin top', () => {
  expect(getMarginTop(2400, '09:00', '10:00')).toEqual(100);
  expect(getMarginTop(2400, '09:30', '10:00')).toEqual(50);
  expect(getMarginTop(2400, '10:00', '10:00')).toEqual(0);
  expect(getMarginTop(720, '09:00', '15:30')).toEqual(195);
});

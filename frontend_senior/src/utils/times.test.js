import {getBoxHight , convertTimeToNumber, sortInterval, isOverlapping} from './times';

// Constants
const goodIntervals = [
    ['05:31', '06:32'],
    ['16:00', '17:00'],
    ['12:31', '12:34']
  ];
const ovelappingIntervals = [
    ['09:30', '12:40'],
    ['05:36', '08:50'],
    ['13:36', '13:37'],
    ['06:00', '20:00'],
    ['14:00', '15:00']
  ]
const normalIntervals = [
    ['14:00', '15:00'],
    ['08:00', '12:30'],
    ['12:35', '12:36'],
    ['13:35', '13:50'],
  ];



test('should check get box hight', () => {
    expect(getBoxHight(2400,60)).toEqual(100)
    expect(getBoxHight(2400,120)).toEqual(200)
    expect(getBoxHight(null,120)).toEqual(0)
});
test('should check convert time to number', () => {
    expect(convertTimeToNumber("10:30")).toEqual(10.5)
    expect(convertTimeToNumber("11:30")).toEqual(11.5)
    expect(convertTimeToNumber("21:30")).toEqual(21.5)
    expect(convertTimeToNumber("")).toEqual(0)
});
test('should check sort Interval', () => {
    expect(convertTimeToNumber("10:30")).toEqual(10.5)
    expect(convertTimeToNumber("11:30")).toEqual(11.5)
    expect(convertTimeToNumber("21:30")).toEqual(21.5)
    expect(convertTimeToNumber("")).toEqual(0)
});

test('should check sort Interval', () => {
    expect(sortInterval(goodIntervals)).toEqual(goodIntervals)
    expect(sortInterval(normalIntervals)).toEqual(
        [["08:00", "12:30"], ["12:35", "12:36"], ["13:35", "13:50"], ["14:00", "15:00"]]
    )
    expect(sortInterval(ovelappingIntervals)).toEqual(
        [["05:36", "08:50"], ["09:30", "12:40"], ["13:36", "13:37"], ["06:00", "20:00"], ["14:00", "15:00"]]
    )
});

test('should check sort Interval', () => {
    expect(isOverlapping(goodIntervals, ["19:30", "12:40"])).toEqual(false)
    expect(isOverlapping(normalIntervals, ["09:30", "12:40"])).toEqual(true)
    expect(isOverlapping(ovelappingIntervals, ["09:30", "52:40"])).toEqual(true)
});

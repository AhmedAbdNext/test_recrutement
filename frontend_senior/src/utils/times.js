import { transformPayload } from './events';

export const convertTimeToNumber = (time) => {
  const [hours, minutes] = time.split(':');
  return Number(hours) + Number(minutes) / 60 || 0;
};

export const sortInterval = (intervals) => {
  return intervals.sort((intA, intB) => {
    const startA = convertTimeToNumber(intA[0]);
    const endA = convertTimeToNumber(intA[1]);

    const startB = convertTimeToNumber(intB[0]);
    const endB = convertTimeToNumber(intB[1]);

    if (startA > endB) return 1;
    if (startB > endA) return -1;
    return 0;
  });
};

export const dayByMinntes = (minute) => {
  let currentMinute = 0;
  const dayIntervals = [];
  while (currentMinute <= 1440 - minute) {
    const firstHours = Math.floor(currentMinute / 60);
    const firstMinutes = currentMinute % 60;
    currentMinute += minute;
    const secondHours = Math.floor(currentMinute / 60);
    const secondMinutes = currentMinute % 60;
    dayIntervals.push([
      `${firstHours < 10 ? '0' + firstHours : firstHours}:${firstMinutes < 10 ? firstMinutes + '0' : firstMinutes}`,
      `${secondHours < 10 ? '0' + secondHours : secondHours}:${
        secondMinutes < 10 ? secondMinutes + '0' : secondMinutes
      }`,
    ]);
  }
  return dayIntervals;
};

export const getStartTime = (payload) => {
  return sortInterval(transformPayload(payload).map(({ duration }) => duration))[0][0] || [];
};

import { difference } from 'lodash';
import { getBoxHeight } from './screenSize';
import { convertTimeToNumber, dayByMinntes } from './times';

export const isOverlapping = (intervals, newInterval) => {
  const startNewInterval = convertTimeToNumber(newInterval[0]);
  const endNewInterval = convertTimeToNumber(newInterval[1]);
  for (const currentInterval of intervals) {
    const startCurrentInterval = convertTimeToNumber(currentInterval[0]);
    const endCurrentInterval = convertTimeToNumber(currentInterval[1]);
    if (startNewInterval < endCurrentInterval && endNewInterval > startCurrentInterval) {
      return true;
    }
  }
  return false;
};

export const transformPayload = (payload) => {
  return payload.map((currentpayloadInterval) => {
    const totalMinutes = convertTimeToNumber(currentpayloadInterval.start) * 60 + currentpayloadInterval.duration;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return {
      id: currentpayloadInterval.id,
      duration: [
        currentpayloadInterval.start,
        `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? minutes + '0' : minutes}`,
      ],
    };
  });
};

export const sortEvents = (events) => {
  return events.sort((a, b) => b.length - a.length);
};

export const removeRedundancy = (event, index) => {
  const newEvent = [];
  let currIndex = -1;
  for (const currEvent of event) {
    currIndex++;
    if (currIndex > index) {
      const diff = difference(currEvent, event[index]);
      if (diff.length) {
        newEvent.push(diff);
      }
    } else {
      newEvent.push(currEvent);
    }
  }
  if (event.length === newEvent.length) {
    return newEvent;
  } else {
    return removeRedundancy(newEvent, index + 1);
  }
};

export const getOverLappingEvents = (payload) => {
  const intervals = transformPayload(payload);
  const dayIntervals = dayByMinntes(5);
  const events = [];
  dayIntervals.forEach((currenDayInterval, index) => {
    intervals.forEach((element) => {
      const hasOverLapping = isOverlapping([element.duration], currenDayInterval);
      if (hasOverLapping) {
        events[index] = events[index] && events[index].length ? [...events[index], element.id] : [element.id];
      }
    });
  });
  return removeRedundancy(sortEvents(events.filter((item) => item)), 0);
};

export const getEvents = (payload, width, height) => {
  const events = getOverLappingEvents(payload);
  const boxWidth = Math.floor(width / events[0].length);
  for (var i = 0; i < events.length; i++) {
    var currentRow = events[i];
    for (var j = 0; j < currentRow.length; j++) {
      const currentPayload = payload.find((item) => {
        return item.id === currentRow[j];
      });
      currentRow[j] = {
        [currentRow[j]]: {
          width: boxWidth,
          start: currentPayload.start,
          duration: currentPayload.duration,
          height: getBoxHeight(height, currentPayload.duration),
        },
      };
    }
  }
  return events;
};

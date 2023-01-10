import { difference } from 'lodash';
export const getBoxHeight = (windowHeight, duration) => {
  return Math.floor((windowHeight / 1440) * duration);
};

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

export const sortMatrix = (matrix) => {
  return matrix.sort((a, b) => b.length - a.length);
};

export const removeRedundancy = (matrix, index) => {
  const newMatrix = [];
  let currIndex = -1;
  //matrix.forEach((matrixElement,currIndex) => {
  for (const matrixElement of matrix) {
    currIndex++;
    if (currIndex > index) {
      const diff = difference(matrixElement, matrix[index]);
      if (diff.length) {
        newMatrix.push(diff);
      }
    } else {
      newMatrix.push(matrixElement);
    }
  }
  if (matrix.length === newMatrix.length) {
    return newMatrix;
  } else {
    return removeRedundancy(newMatrix, index + 1);
  }
};

export const getOverLappingMatrixIds = (payload) => {
  const intervals = transformPayload(payload);
  const dayIntervals = dayByMinntes(30);
  const matrix = [];
  dayIntervals.forEach((currenDayInterval, index) => {
    intervals.forEach((element) => {
      const hasOverLapping = isOverlapping([element.duration], currenDayInterval);
      if (hasOverLapping) {
        matrix[index] = matrix[index] && matrix[index].length ? [...matrix[index], element.id] : [element.id];
      }
    });
  });
  return removeRedundancy(sortMatrix(matrix.filter((item) => item)), 0);
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

export const getMarginTop = (windowHeight, startTime, currentStartTime) => {
  return getBoxHeight(windowHeight, (convertTimeToNumber(currentStartTime) - convertTimeToNumber(startTime)) * 60);
};

export const getMatrixEvents = (payload, width, height) => {
  const matrixEvents = getOverLappingMatrixIds(payload);
  const boxWidth = Math.floor(width / matrixEvents[0].length);
  for (var i = 0; i < matrixEvents.length; i++) {
    var currentRow = matrixEvents[i];
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
  return matrixEvents;
};

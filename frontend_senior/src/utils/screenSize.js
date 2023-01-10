import { convertTimeToNumber } from './times';

export const getBoxHeight = (windowHeight, duration) => {
  return Math.floor((windowHeight / 1440) * duration);
};

export const getMarginTop = (windowHeight, startTime, currentStartTime) => {
  return getBoxHeight(windowHeight, (convertTimeToNumber(currentStartTime) - convertTimeToNumber(startTime)) * 60);
};

import { Units } from './models/ApplicationSettings';

export const getTimeString: (date: Date) => string = (date: Date) => {
  return `${getTwoDigitsString(date.getHours())}:${getTwoDigitsString(
    date.getMinutes()
  )}`;
};

export const getTwoDigitsString: (number: number) => string = (
  number: number
) => {
  return `${number > 9 ? '' : '0'}${number}`;
};

export const getPercentageString: (number: number) => string = (
  number: number
) => {
  return `${number}%`;
};

export const getCelsiusString: (number: number) => string = (
  number: number
) => {
  return `${number}°C`;
};

export const getPressureString: (number: number) => string = (
  number: number
) => {
  return `${number}hPa`;
};

export const getDegreeString: (number: number) => string = (number: number) => {
  return `${number}°`;
};

export const getSpeedString: (number: number, units: Units) => string = (
  number: number,
  units: Units
) => {
  return units == Units.imperial ? `${number}m/h` : `${number}m/s`;
};

import { Units } from '../models/ApplicationSettings';

export const renderTime: (date: Date) => string = (date: Date) => {
  return `${renderTwoDigits(date.getHours())}:${renderTwoDigits(
    date.getMinutes()
  )}`;
};

export const renderTwoDigits: (number: number) => string = (number: number) => {
  return `${number > 9 ? '' : '0'}${number}`;
};

export const renderPercentage: (number: number) => string = (
  number: number
) => {
  return `${number}%`;
};

export const renderCelsius: (number: number) => string = (number: number) => {
  return `${number.toFixed(1)}°C`;
};

export const renderPressure: (number: number) => string = (number: number) => {
  return `${number}hPa`;
};

export const renderDegree: (number: number) => string = (number: number) => {
  return `${number}°`;
};

export const renderSpeed: (number: number, units: Units) => string = (
  number: number,
  units: Units
) => {
  return units == Units.imperial ? `${number}m/h` : `${number}m/s`;
};

export const renderDifferences: (a: number, b: number) => string = (
  a: number,
  b: number
) => {
  const difference = a - b;
  const fixedPrecisionDifference =
    difference % 1 ? difference.toFixed(1) : difference;
  if (difference > 0) {
    return `+${fixedPrecisionDifference}`;
  } else if (difference < 0) {
    return `${fixedPrecisionDifference}`;
  } else {
    return '-';
  }
};

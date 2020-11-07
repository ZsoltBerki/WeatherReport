export const unixTimestampToDate: (
  unixTimeStamp: number,
  timezoneOffset: number
) => Date = (unixTimeStamp: number, timezoneOffset = 0) =>
  new Date(unixTimeStamp * 1000);

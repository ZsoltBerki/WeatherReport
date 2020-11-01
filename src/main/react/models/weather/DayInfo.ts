import { Instance, types } from 'mobx-state-tree';

export const DayInfoModel = types.model('Day Information', {
  // Sunrise time,
  sunrise: types.Date,
  // Sunset time,
  sunset: types.Date,
  // Midday UV index
  uvi: types.number,
});

export type DayInfoType = Instance<typeof DayInfoModel>;

import { Instance, types } from 'mobx-state-tree';
import { DayInfoModel } from './DayInfo';
import { WeatherInfoModel } from './WeatherInfo';

export const MinutelyWeatherModel = types.model('Minutely Weather', {
  date: types.Date,
  // Precipitation volume, mm
  precipitation: types.number,
});

export type MinutelyWeatherType = Instance<typeof MinutelyWeatherModel>;

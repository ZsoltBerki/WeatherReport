import { Instance, types } from 'mobx-state-tree';
import { DayInfoModel } from './DayInfo';
import { WeatherInfoModel } from './WeatherInfo';
import { DayTemperatureModel } from './DayTemperature';

export const DailyWeatherModel = types.model('Daily Weather', {
  date: types.Date,
  dayInfo: DayInfoModel,
  dailyTemperature: DayTemperatureModel,
  weatherInfo: WeatherInfoModel,
});

export type DailyWeatherType = Instance<typeof DailyWeatherModel>;

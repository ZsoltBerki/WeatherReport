import { Instance, types } from 'mobx-state-tree';
import { DayInfoModel } from './DayInfo';
import { WeatherInfoModel } from './WeatherInfo';
import { TemperatureModel } from './Temperature';

export const CurrentWeatherModel = types.model('Current Weather', {
  date: types.Date,
  dayInfo: DayInfoModel,
  temperature: TemperatureModel,
  weatherInfo: WeatherInfoModel,
});

export type CurrentWeatherType = Instance<typeof CurrentWeatherModel>;

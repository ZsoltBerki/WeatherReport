import { Instance, types } from 'mobx-state-tree';
import { TemperatureModel } from './Temperature';
import { WeatherInfoModel } from './WeatherInfo';

export const HourlyWeatherModel = types.model('Hourly Weather', {
  date: types.Date,
  temperature: TemperatureModel,
  weatherInfo: WeatherInfoModel,
  precipitationProbability: types.number,
  isDayTime: types.boolean,
});

export type HourlyWeatherType = Instance<typeof HourlyWeatherModel>;

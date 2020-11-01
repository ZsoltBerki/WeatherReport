import { Instance, types } from 'mobx-state-tree';
import { WeatherModel } from './weather/Weather';

export const CurrentWeatherModel = types.model('Current Weather', {
  currentDate: types.Date,
  sunrise: types.Date,
  sunset: types.Date,
  temperature: types.number,
  temperatureFeelsLike: types.number,
  atmosphericPressure: types.number,
  humidity: types.number,
  dewPoint: types.number,
  uvi: types.number,
  clouds: types.number,
  visibility: types.number,
  windSpeed: types.number,
  windDirection: types.number,
  weather: types.array(WeatherModel),
  rainVolume: types.maybe(types.number),
  snowVolume: types.maybe(types.number),
});

export type CurrentWeatherType = Instance<typeof CurrentWeatherModel>;

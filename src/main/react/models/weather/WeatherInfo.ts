import { Instance, types } from 'mobx-state-tree';
import { WeatherModel } from './Weather';

export const WeatherInfoModel = types.model('Weather Information', {
  //Atmospheric pressure on the sea level, hPa
  atmosphericPressure: types.number,
  //Humidity, %
  humidity: types.number,
  // Atmospheric temperature (varying according to pressure and humidity)
  // below which water droplets begin to condense and dew can form
  dewPoint: types.number,
  // Cloudiness, %
  clouds: types.number,
  //Average visibility, metres
  visibility: types.maybe(types.number),
  // Wind speed. Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour
  windSpeed: types.number,
  // Wind direction, degrees (meteorological)
  windDirection: types.number,
  windGust: types.maybe(types.number),
  //rain volume in the last hour, mm
  rainVolume: types.maybe(types.number),
  //snow volume in the last hour, mm
  snowVolume: types.maybe(types.number),
  //Human readable weather info
  weather: types.array(WeatherModel),
});

export type WeatherInfoType = Instance<typeof WeatherInfoModel>;

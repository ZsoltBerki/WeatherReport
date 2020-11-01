import { Instance, types } from 'mobx-state-tree';
import { AlertModel } from './Alert';
import { CurrentWeatherModel } from './CurrentWeather';
import { DailyWeatherModel } from './DailyWeather';
import { HourlyWeatherModel } from './HourlyWeather';
import { MinutelyWeatherModel } from './MinutelyWeather';

export const ForecastModel = types.model('Forecast', {
  current: CurrentWeatherModel,
  minutely: types.array(MinutelyWeatherModel),
  hourly: types.array(HourlyWeatherModel),
  daily: types.array(DailyWeatherModel),
  alerts: types.array(AlertModel),
});

export type ForecastType = Instance<typeof ForecastModel>;

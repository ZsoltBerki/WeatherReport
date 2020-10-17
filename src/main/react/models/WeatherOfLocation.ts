import { Instance, types } from 'mobx-state-tree';
import { CurrentWeatherModel } from './CurrentWeather';
import { DataStatusModel } from './DataStatus';
import { LocationModel } from './Location';

export const WeatherOfLocationModel = types.model('Weather of Location', {
  status: DataStatusModel,
  location: LocationModel,
  currentWeather: types.maybe(CurrentWeatherModel),
});

export type WeatherOfLocation = Instance<typeof WeatherOfLocationModel>;

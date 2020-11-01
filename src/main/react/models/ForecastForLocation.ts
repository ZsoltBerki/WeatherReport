import { Instance, types } from 'mobx-state-tree';
import { DataStatusModel } from './DataStatus';
import { LocationModel } from './Location';
import { ForecastModel } from './weather/Forecast';

export const ForecastForLocationModel = types.model('Forecast for Location', {
  status: DataStatusModel,
  location: LocationModel,
  forecast: types.maybe(ForecastModel),
});

export type ForecastForLocationType = Instance<typeof ForecastForLocationModel>;

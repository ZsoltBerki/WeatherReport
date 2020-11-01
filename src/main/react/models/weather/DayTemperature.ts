import { Instance, types } from 'mobx-state-tree';
import { TemperatureModel } from './Temperature';

export const DayTemperatureModel = types.model('Day Temperature', {
  //All units are based on settings.
  // Daily minimum temperature.
  minimum: types.number,
  // Daily maximum temperature
  maximum: types.number,
  morning: TemperatureModel,
  day: TemperatureModel,
  evening: TemperatureModel,
  night: TemperatureModel,
});

export type DayTemperatureType = Instance<typeof DayTemperatureModel>;

import { Instance, types } from 'mobx-state-tree';

export const TemperatureModel = types.model('Temperature', {
  // Actual temperature. Units based on settings.
  actual: types.number,
  // How the temperature feels like. Units based on settings.
  feelsLike: types.number,
});

export type TemperatureType = Instance<typeof TemperatureModel>;

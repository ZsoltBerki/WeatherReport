import { types, applySnapshot, Instance } from 'mobx-state-tree';
import {
  ApplicationSettingsModel,
  ApplicationSettingsType,
} from './ApplicationSettings';
import { State } from './DataStatus';
import { LocationType } from './Location';
import {
  MainWeatherType,
  WeatherIcon,
  WeatherModel,
  WeatherModelType,
} from './Weather';
import { WeatherOfLocationModel } from './WeatherOfLocation';

const StoreModel = types
  .model({
    applicationSettings: ApplicationSettingsModel,
    locations: types.array(WeatherOfLocationModel),
  })
  .actions((self) => ({
    // setWeatherExample(weather: WeatherModelType) {
    //  applySnapshot(self.weatherExample, weather);
    //},
  }));

export type StoreType = Instance<typeof StoreModel>;

export const initStore: (
  settings: ApplicationSettingsType,
  initialLocations: Array<LocationType>
) => StoreType = (
  settings: ApplicationSettingsType,
  initialLocations: Array<LocationType>
) => {
  return StoreModel.create({
    applicationSettings: settings,
    locations: initialLocations.map((location) =>
      WeatherOfLocationModel.create({
        status: {
          state: State.initial,
        },
        location: location,
      })
    ),
  });
};

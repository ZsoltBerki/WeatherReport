import { types, Instance, flow, applySnapshot } from 'mobx-state-tree';
import { Services } from '../services/Services';
import {
  ApplicationSettingsModel,
  ApplicationSettingsType,
} from './ApplicationSettings';
import { CurrentWeather } from './CurrentWeather';
import { State } from './DataStatus';
import { LocationType } from './Location';
import { WeatherOfLocationModel } from './WeatherOfLocation';

const StoreModel = types
  .model({
    applicationSettings: ApplicationSettingsModel,
    locations: types.array(WeatherOfLocationModel),
  })
  .actions((self) => ({
    loadWeatherAtLocation: flow(function* (locationIndex: number) {
      self.locations[locationIndex].status.state = State.pending;
      self.locations[locationIndex].currentWeather = undefined;

      try {
        const currentWeatherAtLocation: CurrentWeather = yield Services.access().weather.getCurrentWeather(
          self.locations[locationIndex].location
        );
        self.locations[locationIndex].currentWeather = currentWeatherAtLocation;
        self.locations[locationIndex].status.state = State.success;
        self.locations[locationIndex].status.lastFetch = new Date();
      } catch (e) {
        self.locations[locationIndex].status.state = State.error;
        console.error(e);
      }
    }),
    initWeatherData() {
      self.locations.forEach((location, locationIndex) => {
        if (location.status.state == State.initial) {
          this.loadWeatherAtLocation(locationIndex);
        }
      });
    },
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

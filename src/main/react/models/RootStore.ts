import { types, Instance, flow, applySnapshot } from 'mobx-state-tree';
import { Services } from '../services/Services';
import {
  ApplicationSettingsModel,
  ApplicationSettingsType,
} from './ApplicationSettings';
import { State } from './DataStatus';
import { DragInfoModel } from './DragInfo';
import { ForecastForLocationModel } from './ForecastForLocation';
import { LocationType } from './Location';
import { ForecastType } from './weather/Forecast';

const StoreModel = types
  .model({
    applicationSettings: ApplicationSettingsModel,
    locations: types.array(ForecastForLocationModel),
    drag: DragInfoModel,
  })
  .actions((self) => ({
    loadWeatherAtLocation: flow(function* (locationIndex: number) {
      self.locations[locationIndex].status.state = State.pending;
      self.locations[locationIndex].forecast = undefined;

      try {
        const forecastForLocation: ForecastType = yield Services.access().forecast.getForecast(
          self.locations[locationIndex].location
        );
        self.locations[locationIndex].forecast = forecastForLocation;
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
    drag: DragInfoModel.create({
      initial_X: 0,
      initial_Y: 0,
      current_X: 0,
      current_Y: 0,
    }),
    locations: initialLocations.map((location) =>
      ForecastForLocationModel.create({
        status: {
          state: State.initial,
        },
        location: location,
      })
    ),
  });
};

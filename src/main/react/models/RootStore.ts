import { types, Instance, flow, applySnapshot } from 'mobx-state-tree';
import { Services } from '../services/Services';
import {
  ApplicationSettingsModel,
  ApplicationSettingsType,
} from './ApplicationSettings';
import { State } from './DataStatus';
import { DragableScaleModel } from './DragableScale';
import { DragInfoModel } from './DragInfo';
import { ForecastForLocationModel } from './ForecastForLocation';
import { LocationType } from './Location';
import { ForecastType } from './weather/Forecast';

const StoreModel = types
  .model({
    applicationSettings: ApplicationSettingsModel,
    forecastForLocation: ForecastForLocationModel,
    drag: DragInfoModel,
    hourlyScale: DragableScaleModel,
  })
  .actions((self) => ({
    loadWeather: flow(function* () {
      self.forecastForLocation.status.state = State.pending;
      self.forecastForLocation.forecast = undefined;

      try {
        const forecastForLocation: ForecastType = yield Services.access().forecast.getForecast(
          self.forecastForLocation.location
        );
        self.forecastForLocation.forecast = forecastForLocation;
        self.forecastForLocation.status.state = State.success;
        self.forecastForLocation.status.lastFetch = new Date();
      } catch (e) {
        self.forecastForLocation.status.state = State.error;
        console.error(e);
      }
    }),
    initWeatherData() {
      if (self.forecastForLocation.status.state == State.initial) {
        this.loadWeather();
      }
    },
  }));

export type StoreType = Instance<typeof StoreModel>;

export const initStore: (
  settings: ApplicationSettingsType,
  location: LocationType
) => StoreType = (
  settings: ApplicationSettingsType,
  location: LocationType
) => {
  return StoreModel.create({
    applicationSettings: settings,
    drag: DragInfoModel.create({
      initial_X: 0,
      initial_Y: 0,
      current_X: 0,
      current_Y: 0,
    }),
    forecastForLocation: ForecastForLocationModel.create({
      status: {
        state: State.initial,
      },
      location: location,
    }),
    hourlyScale: DragableScaleModel.create({
      totalItems: 19,
      displayedItemIndex: 0,
      draggingStartPosition: 0,
      draggingTreshold: 35,
    }),
  });
};

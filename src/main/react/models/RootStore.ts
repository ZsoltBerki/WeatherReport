import { types, applySnapshot, Instance } from 'mobx-state-tree';
import { IWeatherModel, WeatherModel } from './Weather';

const RootModel = types
  .model({
    weatherExample: WeatherModel,
  })
  .actions((self) => ({
    setWeatherExample(weather: IWeatherModel) {
      applySnapshot(self.weatherExample, weather);
    },
  }));

const initialState = RootModel.create({
  weatherExample: {
    id: 0,
    icon: '',
    main: 'rain',
    description: '',
  },
});

export const rootStore = initialState;

export type RootInstance = Instance<typeof RootModel>;

import { types, applySnapshot, Instance } from 'mobx-state-tree';
import {
  MainWeatherType,
  WeatherIcon,
  WeatherModel,
  WeatherModelType,
} from './Weather';

const RootModel = types
  .model({
    weatherExample: WeatherModel,
    
  })
  .actions((self) => ({
    setWeatherExample(weather: WeatherModelType) {
      applySnapshot(self.weatherExample, weather);
    },
  }));

const initialState = RootModel.create({
  weatherExample: {
    id: 0,
    icon: WeatherIcon['50d'],
    main: MainWeatherType.Tornado,
    description: '',
  },
});

export const rootStore = initialState;

export type RootInstance = Instance<typeof RootModel>;

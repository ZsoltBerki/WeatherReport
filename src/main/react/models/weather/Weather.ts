import { Instance, types } from 'mobx-state-tree';

export enum WeatherIcon {
  'StormShowers' = 'StormShowers',
  'Thunderstorm' = 'Thunderstorm',
  'Lightning' = 'Lightning',
  'Sprinkle' = 'Sprinkle',
  'Rain' = 'Rain',
  'Hail' = 'Hail',
  'RainWind' = 'RainWind',
  'Snow' = 'Snow',
  'Sleet' = 'Sleet',
  'RainMix' = 'RainMix',
  'Fog' = 'Fog',
  'Haze' = 'Haze',
  'Sunny' = 'Sunny',
  'Cloudy' = 'Cloudy',
  'Smoke' = 'Smoke',
  'Dust' = 'Dust',
  'Sandstorm' = 'Sandstorm',
  'Volcano' = 'Volcano',
  'StrongWind' = 'StrongWind',
  'Tornado' = 'Tornado',
  'Clouds' = 'Clouds',
  'Unknown' = 'Unknown',
}

export const WeatherModel = types.model('Weather', {
  main: types.string,
  description: types.string,
  icon: types.enumeration<WeatherIcon>(
    'WeatherIcon',
    Object.values(WeatherIcon)
  ),
});

export type WeatherModelType = Instance<typeof WeatherModel>;

/*
OpenWeatherMap - One Call API
{
  "id": 501,
  "main": "Rain",
  "description": "moderate rain",
  "icon": "10n"
}
*/

import { Instance, types } from 'mobx-state-tree';

export enum WeatherIcon {
  '01d' = '01d',
  '01n' = '01n',
  '02d' = '02d',
  '03d' = '03d',
  '04d' = '04d',
  '09d' = '09d',
  '10d' = '10d',
  '11d' = '11d',
  '13d' = '13d',
  '50d' = '50d',
  '02n' = '02n',
  '03n' = '03n',
  '04n' = '04n',
  '09n' = '09n',
  '10n' = '10n',
  '11n' = '11n',
  '13n' = '13n',
  '50n' = '50n',
}

export enum MainWeatherType {
  'Thunderstorm' = 'Thunderstorm',
  'Drizzle' = 'Drizzle',
  'Rain' = 'Rain',
  'Mist' = 'Mist',
  'Smoke' = 'Smoke',
  'Haze' = 'Haze',
  'Dust' = 'Dust',
  'Fog' = 'Fog',
  'Sand' = 'Sand',
  'Ash' = 'Ash',
  'Squall' = 'Squall',
  'Tornado' = 'Tornado',
  'Clear' = 'Clear',
  'Clouds' = 'Clouds',
}

export const WeatherModel = types.model('Weather', {
  id: types.number,
  main: types.enumeration<MainWeatherType>(
    'Color',
    Object.values(MainWeatherType)
  ),
  description: types.string,
  icon: types.enumeration<WeatherIcon>('Color', Object.values(WeatherIcon)),
});

export type WeatherModelType = Instance<typeof WeatherModel>;

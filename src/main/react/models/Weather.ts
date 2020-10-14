/*
OpenWeatherMap - One Call API
{
  "id": 501,
  "main": "Rain",
  "description": "moderate rain",
  "icon": "10n"
}
*/

import { types } from 'mobx-state-tree';

export interface IWeatherModel {
  id: number;
  main: string; //TODO change it to enum
  description: string;
  icon: string; //TODO change it to enum
}

export const WeatherModel = types.model('Weather', {
  id: types.number,
  main: types.string,
  description: types.string,
  icon: types.string,
});

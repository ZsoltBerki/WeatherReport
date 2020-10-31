/*
"current": {
  "dt": 1602927721, // Current time, Unix, UTC
  "sunrise": 1602910409, // Sunrise time, Unix, UTC
  "sunset": 1602945685, // Sunset time, Unix, UTC
  "temp": 4.88, // Temperature.Units based on the call parameters.
  "feels_like": 0.66, //Temperature
  "pressure": 1009, //Atmospheric pressure on the sea level, hPa
  "humidity": 93, //Humidity, %
  "dew_point": 3.85, // Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form
  "uvi": 0.64, // Midday UV index
  "clouds": 90, // Cloudiness, %
  "visibility": 10000, //Average visibility, metres
  "wind_speed": 4.1, // Wind speed. Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour
  "wind_deg": 230, // Wind direction, degrees (meteorological)
  "weather": [
    {
    "id": 500,
    "main": "Rain",
    "description": "light rain",
    "icon": "10d"
    }
  ],
  "rain": { //where available
    "1h": 0.22 //rain volume in the last hour, mm
  }
  "snow": { // where available
    "1h": 0.22 //snow volume in the last hour, mm
  }
}
*/

import { Instance, types } from 'mobx-state-tree';
import { number } from 'mobx-state-tree/dist/internal';
import { WeatherModel } from './Weather';

export const CurrentWeatherModel = types.model('Current Weather', {
  currentDate: types.Date,
  sunrise: types.Date,
  sunset: types.Date,
  temperature: types.number,
  temperatureFeelsLike: types.number,
  atmosphericPressure: types.number,
  humidity: types.number,
  dewPoint: types.number,
  uvi: types.number,
  clouds: types.number,
  visibility: types.number,
  windSpeed: types.number,
  windDirection: types.number,
  weather: types.array(WeatherModel),
  rainVolume: types.maybe(types.number),
  snowVolume: types.maybe(types.number),
});

export type CurrentWeatherType = Instance<typeof CurrentWeatherModel>;

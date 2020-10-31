import { CurrentWeatherType } from '../../models/CurrentWeather';
import { LocationType } from '../../models/Location';

export interface WeatherService {
  getCurrentWeather: (location: LocationType) => Promise<CurrentWeatherType>;
}

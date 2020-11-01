import { LocationType } from '../../models/Location';
import { ForecastType } from '../../models/weather/Forecast';

export interface ForecastService {
  getForecast: (location: LocationType) => Promise<ForecastType>;
}

import { ApplicationSettingsType } from '../models/ApplicationSettings';
import { ForecastService } from './Forecast/ForecastService';
import { ForecastServiceImpl } from './Forecast/ForecastWithOpenWeather';
import {
  OpenWeatherConnector,
  OpenWeatherConnectorImpl,
} from './OpenWeather/Connector';
import {
  OpenWeatherService,
  OpenWeatherServiceImpl,
} from './OpenWeather/Service';

export class Services {
  private static instance: Services;

  forecast: ForecastService;

  private constructor(settings: ApplicationSettingsType) {
    const openWeatherConnector: OpenWeatherConnector = new OpenWeatherConnectorImpl(
      settings.apiKey,
      settings.language,
      settings.units,
      settings.openApiUrl
    );
    const openWeatherService: OpenWeatherService = new OpenWeatherServiceImpl(
      openWeatherConnector
    );
    this.forecast = new ForecastServiceImpl(openWeatherService);
  }

  static init(settings: ApplicationSettingsType) {
    if (!Services.instance) {
      Services.instance = new Services(settings);
    }
  }

  static access(): Services {
    if (!Services.instance) {
      throw 'Services were not initialized.';
    }
    return Services.instance;
  }
}

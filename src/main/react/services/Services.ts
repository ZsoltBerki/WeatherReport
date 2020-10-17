import {
  OpenWeatherConnector,
  OpenWeatherConnectorImpl,
} from '../connectors/OpenWeatherConnector';
import { ApplicationSettingsType } from '../models/ApplicationSettings';
import { OpenWeatherService } from './weather/OpenWeatherImpl/OpenWeatherService';
import { WeatherService } from './weather/WeatherService';

export class Services {
  private static instance: Services;

  weather: WeatherService;

  private constructor(settings: ApplicationSettingsType) {
    const openWeatherConnector: OpenWeatherConnector = new OpenWeatherConnectorImpl(
      settings.apiKey,
      settings.language,
      settings.units,
      settings.openApiUrl
    );
    this.weather = new OpenWeatherService(openWeatherConnector);
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

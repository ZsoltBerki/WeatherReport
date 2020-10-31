import { OpenWeatherConnector } from '../../../connectors/OpenWeatherConnector';
import {
  CurrentWeatherType,
  CurrentWeatherModel,
} from '../../../models/CurrentWeather';
import { LocationType } from '../../../models/Location';
import { WeatherService } from '../WeatherService';
import { unixTimestampToDate } from '../../../models/utils';

export class OpenWeatherService implements WeatherService {
  static oneCallFields = {
    timeZoneOffset: 'timezone_offset',
    currentWeather: {
      name: 'current',
      fields: {
        currentDate: 'dt',
        sunrise: 'sunrise',
        sunset: 'sunset',
        temperature: 'temp',
        temperatureFeelsLike: 'feels_like',
        atmosphericPressure: 'pressure',
        humidity: 'humidity',
        dewPoint: 'dew_point',
        uvi: 'uvi',
        clouds: 'clouds',
        visibility: 'visibility',
        windSpeed: 'wind_speed',
        windDirection: 'wind_deg',
        weather: 'weather',
      },
    },
  };

  static validateField(result: any, fieldName: string): void {
    if (!result[fieldName]) {
      throw fieldName;
    }
  }

  static validateOneCallFields(result: any): void {
    const validate = OpenWeatherService.validateField;
    const fields = OpenWeatherService.oneCallFields;
    try {
      validate(result, fields.timeZoneOffset);
      validate(result, fields.currentWeather.name);
      try {
        const currentWeatherField = fields.currentWeather.fields;

        Object.values(currentWeatherField).forEach((value) => {
          validate(result[fields.currentWeather.name], value);
        });
      } catch (missingField) {
        throw `${fields.currentWeather.name}.${missingField}`;
      }
    } catch (missingField) {
      throw `OneCallAPI response is missing the \"${missingField}\" field.`;
    }
  }

  connector: OpenWeatherConnector;
  constructor(connector: OpenWeatherConnector) {
    this.connector = connector;
  }

  static getCurrentWeatherFromOneCall(result: any): CurrentWeatherType {
    OpenWeatherService.validateOneCallFields(result);

    const timeZoneOffset: number =
      result[OpenWeatherService.oneCallFields.timeZoneOffset];
    const currentWeatherResult =
      result[OpenWeatherService.oneCallFields.currentWeather.name];
    const currentWeatherFields =
      OpenWeatherService.oneCallFields.currentWeather.fields;

    return CurrentWeatherModel.create({
      currentDate: unixTimestampToDate(
        currentWeatherResult[currentWeatherFields.currentDate],
        timeZoneOffset
      ),
      sunrise: unixTimestampToDate(
        currentWeatherResult[currentWeatherFields.sunrise],
        timeZoneOffset
      ),
      sunset: unixTimestampToDate(
        currentWeatherResult[currentWeatherFields.sunset],
        timeZoneOffset
      ),
      temperature: currentWeatherResult[currentWeatherFields.temperature],
      temperatureFeelsLike:
        currentWeatherResult[currentWeatherFields.temperatureFeelsLike],
      atmosphericPressure:
        currentWeatherResult[currentWeatherFields.atmosphericPressure],
      humidity: currentWeatherResult[currentWeatherFields.humidity],
      dewPoint: currentWeatherResult[currentWeatherFields.dewPoint],
      uvi: currentWeatherResult[currentWeatherFields.uvi],
      clouds: currentWeatherResult[currentWeatherFields.clouds],
      visibility: currentWeatherResult[currentWeatherFields.visibility],
      windSpeed: currentWeatherResult[currentWeatherFields.windSpeed],
      windDirection: currentWeatherResult[currentWeatherFields.windDirection],
    });
  }

  getCurrentWeather(location: LocationType): Promise<CurrentWeatherType> {
    return this.connector
      .executeOneCallApi(location)
      .then(OpenWeatherService.getCurrentWeatherFromOneCall);
  }
}

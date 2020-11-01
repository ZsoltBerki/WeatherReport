import { LocationType } from '../../models/Location';
import { ForecastService } from './ForecastService';
import { unixTimestampToDate } from '../../models/utils';
import { OneCallType } from '../OpenWeather/types/OneCallApiType';
import { OpenWeatherConnector } from '../OpenWeather/Connector';
import {
  IStateTreeNode,
  IModelType,
  ISimpleType,
  _NotCustomized,
} from 'mobx-state-tree';
import { NonEmptyObject } from 'mobx-state-tree/dist/internal';
import { ForecastModel, ForecastType } from '../../models/weather/Forecast';
import { OpenWeatherService } from '../OpenWeather/Service';
import { DayInfoModel } from '../../models/weather/DayInfo';
import { TemperatureModel } from '../../models/weather/Temperature';
import { WeatherInfoModel } from '../../models/weather/WeatherInfo';
import { CurrentWeatherModel } from '../../models/weather/CurrentWeather';
import { MinutelyWeatherModel } from '../../models/weather/MinutelyWeather';
import { HourlyWeatherModel } from '../../models/weather/HourlyWeather';
import { DailyWeatherModel } from '../../models/weather/DailyWeather';
import { DayTemperatureModel } from '../../models/weather/DayTemperature';
import { AlertModel } from '../../models/weather/Alert';

export class ForecastServiceImpl implements ForecastService {
  service: OpenWeatherService;
  constructor(service: OpenWeatherService) {
    this.service = service;
  }

  getForecast(location: LocationType): Promise<ForecastType> {
    return this.service.executeOneCall(location).then((result) => {
      const timeZoneOffset = result.timezone_offset;
      return ForecastModel.create({
        current: CurrentWeatherModel.create({
          date: unixTimestampToDate(result.current.dt, timeZoneOffset),
          dayInfo: DayInfoModel.create({
            sunrise: unixTimestampToDate(
              result.current.sunrise,
              timeZoneOffset
            ),
            sunset: unixTimestampToDate(result.current.sunset, timeZoneOffset),
            uvi: result.current.uvi,
          }),
          temperature: TemperatureModel.create({
            actual: result.current.temp,
            feelsLike: result.current.feels_like,
          }),
          weatherInfo: WeatherInfoModel.create({
            atmosphericPressure: result.current.pressure,
            humidity: result.current.humidity,
            dewPoint: result.current.dew_point,
            clouds: result.current.clouds,
            visibility: result.current.visibility,
            windSpeed: result.current.wind_speed,
            windDirection: result.current.wind_deg,
            windGust: result.current.wind_gust,
            rainVolume: result.current.rain?.['1h'],
            snowVolume: result.current.snow?.['1h'],
          }),
        }),
        minutely: result.minutely.map((minutelyResult) => {
          return MinutelyWeatherModel.create({
            date: unixTimestampToDate(minutelyResult.dt, timeZoneOffset),
            precipitation: minutelyResult.precipitation,
          });
        }),
        hourly: result.hourly.map((hourlyResult) => {
          return HourlyWeatherModel.create({
            date: unixTimestampToDate(hourlyResult.dt, timeZoneOffset),
            precipitationProbability: hourlyResult.pop,
            temperature: TemperatureModel.create({
              actual: hourlyResult.temp,
              feelsLike: hourlyResult.feels_like,
            }),
            weatherInfo: WeatherInfoModel.create({
              atmosphericPressure: hourlyResult.pressure,
              humidity: hourlyResult.humidity,
              dewPoint: hourlyResult.dew_point,
              clouds: hourlyResult.clouds,
              visibility: hourlyResult.visibility,
              windSpeed: hourlyResult.wind_speed,
              windDirection: hourlyResult.wind_deg,
              windGust: hourlyResult.wind_gust,
              rainVolume: hourlyResult.rain?.['1h'],
              snowVolume: hourlyResult.snow?.['1h'],
            }),
          });
        }),
        daily: result.daily.map((dailyResult) => {
          return DailyWeatherModel.create({
            date: unixTimestampToDate(dailyResult.dt, timeZoneOffset),
            dayInfo: DayInfoModel.create({
              sunrise: unixTimestampToDate(dailyResult.sunrise, timeZoneOffset),
              sunset: unixTimestampToDate(dailyResult.sunset, timeZoneOffset),
              uvi: dailyResult.uvi,
            }),
            dailyTemperature: DayTemperatureModel.create({
              minimum: dailyResult.temp.min,
              maximum: dailyResult.temp.max,
              morning: TemperatureModel.create({
                actual: dailyResult.temp.morn,
                feelsLike: dailyResult.feels_like.morn,
              }),
              day: TemperatureModel.create({
                actual: dailyResult.temp.day,
                feelsLike: dailyResult.feels_like.day,
              }),
              evening: TemperatureModel.create({
                actual: dailyResult.temp.eve,
                feelsLike: dailyResult.feels_like.eve,
              }),
              night: TemperatureModel.create({
                actual: dailyResult.temp.night,
                feelsLike: dailyResult.feels_like.night,
              }),
            }),
            weatherInfo: WeatherInfoModel.create({
              atmosphericPressure: dailyResult.pressure,
              humidity: dailyResult.humidity,
              dewPoint: dailyResult.dew_point,
              clouds: dailyResult.clouds,
              visibility: dailyResult.visibility,
              windSpeed: dailyResult.wind_speed,
              windDirection: dailyResult.wind_deg,
              windGust: dailyResult.wind_gust,
              rainVolume: dailyResult.rain,
              snowVolume: dailyResult.snow,
            }),
          });
        }),
        alerts: result.alerts.map((alertResult) => {
          return AlertModel.create({
            sender: alertResult.sender_name,
            event: alertResult.event,
            description: alertResult.description,
            start: unixTimestampToDate(alertResult.start, timeZoneOffset),
            end: unixTimestampToDate(alertResult.end, timeZoneOffset),
          });
        }),
      });
    });
  }
}

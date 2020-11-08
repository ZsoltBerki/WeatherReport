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
import { WeatherIcon, WeatherModel } from '../../models/weather/Weather';

export class ForecastServiceImpl implements ForecastService {
  service: OpenWeatherService;
  constructor(service: OpenWeatherService) {
    this.service = service;
  }

  getWeatherIcon(id: number): WeatherIcon {
    switch (id) {
      case 200:
        return WeatherIcon.StormShowers;
      case 201:
        return WeatherIcon.StormShowers;
      case 202:
        return WeatherIcon.Thunderstorm;
      case 210:
        return WeatherIcon.Lightning;
      case 211:
        return WeatherIcon.Lightning;
      case 212:
        return WeatherIcon.Lightning;
      case 221:
        return WeatherIcon.Lightning;
      case 230:
        return WeatherIcon.StormShowers;
      case 231:
        return WeatherIcon.StormShowers;
      case 232:
        return WeatherIcon.Thunderstorm;
      case 300:
        return WeatherIcon.Sprinkle;
      case 301:
        return WeatherIcon.Rain;
      case 302:
        return WeatherIcon.Rain;
      case 310:
        return WeatherIcon.Sprinkle;
      case 311:
        return WeatherIcon.Rain;
      case 312:
        return WeatherIcon.Rain;
      case 313:
        return WeatherIcon.Rain;
      case 314:
        return WeatherIcon.Rain;
      case 321:
        return WeatherIcon.Rain;
      case 500:
        return WeatherIcon.Sprinkle;
      case 501:
        return WeatherIcon.Rain;
      case 502:
        return WeatherIcon.Rain;
      case 503:
        return WeatherIcon.Rain;
      case 504:
        return WeatherIcon.Rain;
      case 511:
        return WeatherIcon.Hail;
      case 520:
        return WeatherIcon.Rain;
      case 521:
        return WeatherIcon.Rain;
      case 522:
        return WeatherIcon.Rain;
      case 531:
        return WeatherIcon.RainWind;
      case 600:
        return WeatherIcon.Snow;
      case 601:
        return WeatherIcon.Snow;
      case 602:
        return WeatherIcon.Snow;
      case 611:
        return WeatherIcon.Sleet;
      case 612:
        return WeatherIcon.Sleet;
      case 613:
        return WeatherIcon.Sleet;
      case 615:
        return WeatherIcon.RainMix;
      case 616:
        return WeatherIcon.RainMix;
      case 620:
        return WeatherIcon.RainMix;
      case 621:
        return WeatherIcon.Snow;
      case 622:
        return WeatherIcon.Snow;
      case 701:
        return WeatherIcon.Fog;
      case 711:
        return WeatherIcon.Smoke;
      case 721:
        return WeatherIcon.Haze;
      case 731:
        return WeatherIcon.Dust;
      case 741:
        return WeatherIcon.Fog;
      case 751:
        return WeatherIcon.Sandstorm;
      case 761:
        return WeatherIcon.Dust;
      case 762:
        return WeatherIcon.Volcano;
      case 771:
        return WeatherIcon.StrongWind;
      case 781:
        return WeatherIcon.Tornado;
      case 800:
        return WeatherIcon.Sunny;
      case 801:
        return WeatherIcon.Cloudy;
      case 802:
        return WeatherIcon.Cloudy;
      case 803:
        return WeatherIcon.Cloudy;
      case 804:
        return WeatherIcon.Clouds;
      default:
        return WeatherIcon.Unknown;
    }
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
            weather: result.current.weather.map((weatherResult) => {
              return WeatherModel.create({
                main: weatherResult.main,
                description: weatherResult.description,
                icon: this.getWeatherIcon(weatherResult.id),
              });
            }),
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
              weather: hourlyResult.weather.map((weatherResult) => {
                return WeatherModel.create({
                  main: weatherResult.main,
                  description: weatherResult.description,
                  icon: this.getWeatherIcon(weatherResult.id),
                });
              }),
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
              weather: dailyResult.weather.map((weatherResult) => {
                return WeatherModel.create({
                  main: weatherResult.main,
                  description: weatherResult.description,
                  icon: this.getWeatherIcon(weatherResult.id),
                });
              }),
            }),
          });
        }),
        alerts: result.alerts
          ? result.alerts.map((alertResult) => {
              return AlertModel.create({
                sender: alertResult.sender_name,
                event: alertResult.event,
                description: alertResult.description,
                start: unixTimestampToDate(alertResult.start, timeZoneOffset),
                end: unixTimestampToDate(alertResult.end, timeZoneOffset),
              });
            })
          : [],
      });
    });
  }
}

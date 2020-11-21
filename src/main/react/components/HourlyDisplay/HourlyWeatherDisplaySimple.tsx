import { Units } from '../../models/ApplicationSettings';
import { HourlyWeatherType } from '../../models/weather/HourlyWeather';
import styled from 'styled-components';
import React from 'react';
import {
  renderCelsius,
  renderDifferences,
  renderPercentage,
  renderPressure,
  renderTime,
} from '../utils';
import { CurrentWeatherType } from '../../models/weather/CurrentWeather';
import WeatherIconDisplay from '../WeatherIconDisplay';
import { WeatherIcon } from '../../models/weather/Weather';
import {
  CloudRainSlot,
  HumidityDewPointSlot,
  PressureSlot,
  RainSlot,
  SnowSlot,
  TemperatureSlot,
  TimeSlot,
  VisibilitySlot,
  WeatherIconSlot,
} from './GridComponents';

interface Props {
  hourlyWeather: HourlyWeatherType;
  hourlyWeatherReference: CurrentWeatherType;
  onDaytime: (time: Date) => boolean;
  units: Units;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  margin-left: 5px;
  text-align: center;
  min-width: 25px;

  .weather-icon {
    margin-top: 2.5px;
  }

  .temperature {
    margin-top: 8px;
    font-size: 12px;
  }

  .humidity {
    margin-top: 6px;
    font-size: 12px;
  }

  .pressure {
    margin-top: 5px;
    font-size: 12px;
  }

  .clouds {
    font-size: 12px;
    margin-top: 5px;
  }

  .precipitation {
    font-size: 12px;
  }

  .rain {
    margin-top: 6.8px;
    font-size: 12px;
  }

  .snow {
    margin-top: 6.8px;
    font-size: 12px;
  }

  .visibility {
    margin-top: 5px;
    font-size: 12px;
  }

  scroll-snap-align: start;
`;

const HourlyWeatherDisplaySimple: React.FunctionComponent<Props> = ({
  hourlyWeather,
  hourlyWeatherReference,
  units,
  onDaytime,
}) => {
  const isDaytime = onDaytime(hourlyWeather.date);
  console.log('is day time', isDaytime);
  const temperature = hourlyWeather.temperature;
  const referenceTemperature = hourlyWeatherReference.temperature;
  const weather = hourlyWeather.weatherInfo;
  const referenceWeather = hourlyWeatherReference.weatherInfo;
  const precipitationPercentage = hourlyWeather.precipitationProbability * 100;
  const weatherIcon =
    weather.weather && weather.weather.length > 0 && weather.weather[0].icon;
  return (
    <Wrapper>
      <TimeSlot />
      <WeatherIconSlot>
        <div className={'weather-icon'}>
          <WeatherIconDisplay
            weatherIcon={weatherIcon || WeatherIcon.Unknown}
            isDay={isDaytime}
          />
        </div>
      </WeatherIconSlot>
      <TemperatureSlot>
        <div className={'temperature'}>
          {renderDifferences(temperature.actual, referenceTemperature.actual)}
        </div>
      </TemperatureSlot>
      <HumidityDewPointSlot>
        <div className={'humidity'}>
          {renderDifferences(weather.humidity, referenceWeather.humidity)}
        </div>
      </HumidityDewPointSlot>
      <PressureSlot>
        <div className={'pressure'}>
          {renderDifferences(
            weather.atmosphericPressure,
            referenceWeather.atmosphericPressure
          )}
        </div>
      </PressureSlot>
      <CloudRainSlot>
        <div className={'clouds'}>{renderPercentage(weather.clouds)}</div>
        <div className={'precipitation'}>
          {renderPercentage(precipitationPercentage)}
        </div>
      </CloudRainSlot>
      <RainSlot>
        <div className={'rain'}>
          {hourlyWeather.weatherInfo.rainVolume
            ? `${weather.rainVolume}mm`
            : '-'}
        </div>
      </RainSlot>
      <SnowSlot>
        <div className={'snow'}>
          {hourlyWeather.weatherInfo.snowVolume
            ? `${weather.snowVolume}mm`
            : '-'}
        </div>
      </SnowSlot>
      <VisibilitySlot>
        <div className={'visibility'}>
          {referenceWeather.visibility && weather.visibility
            ? renderDifferences(referenceWeather.visibility, weather.visibility)
            : '-'}
        </div>
      </VisibilitySlot>
    </Wrapper>
  );
};

export default HourlyWeatherDisplaySimple;

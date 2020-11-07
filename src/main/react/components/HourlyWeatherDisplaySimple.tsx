import { Units } from '../models/ApplicationSettings';
import { HourlyWeatherType } from '../models/weather/HourlyWeather';
import styled from 'styled-components';
import React from 'react';
import {
  renderCelsius,
  renderDifferences,
  renderPercentage,
  renderPressure,
  renderTime,
} from './utils';
import { CurrentWeatherType } from '../models/weather/CurrentWeather';

interface Props {
  hourlyWeather: HourlyWeatherType;
  hourlyWeatherReference: CurrentWeatherType;
  units: Units;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  margin-left: 5px;
  text-align: center;
  min-width: 25px;

  .temperature {
    font-size: 12px;
    margin-top: 16px;
  }

  .humidity {
    font-size: 12px;
    margin-top: 28px;
  }

  .pressure {
    margin-top: 22px;
    font-size: 12px;
  }

  .clouds {
    font-size: 12px;
    margin-top: 13px;
  }

  .precipitation {
    font-size: 12px;
    margin-top: 6px;
  }

  .rain {
    font-size: 12px;
    margin-top: 8px;
  }

  .snow {
    font-size: 12px;
    margin-top: 8px;
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
}) => {
  const temperature = hourlyWeather.temperature;
  const referenceTemperature = hourlyWeatherReference.temperature;
  const weather = hourlyWeather.weatherInfo;
  const referenceWeather = hourlyWeatherReference.weatherInfo;
  const precipitationPercentage = hourlyWeather.precipitationProbability * 100;
  return (
    <Wrapper>
      <div className={'temperature'}>
        {renderDifferences(temperature.actual, referenceTemperature.actual)}
      </div>
      <div className={'humidity'}>
        {renderDifferences(weather.humidity, referenceWeather.humidity)}
      </div>
      <div className={'pressure'}>
        {renderDifferences(
          weather.atmosphericPressure,
          referenceWeather.atmosphericPressure
        )}
      </div>
      <div className={'clouds'}>{renderPercentage(weather.clouds)}</div>
      <div className={'precipitation'}>
        {renderPercentage(precipitationPercentage)}
      </div>
      <div className={'rain'}>
        {hourlyWeather.weatherInfo.rainVolume ? `${weather.rainVolume}mm` : '-'}
      </div>
      <div className={'snow'}>
        {hourlyWeather.weatherInfo.snowVolume ? `${weather.snowVolume}mm` : '-'}
      </div>
      <div className={'visibility'}>
        {referenceWeather.visibility && weather.visibility
          ? renderDifferences(referenceWeather.visibility, weather.visibility)
          : '-'}
      </div>
    </Wrapper>
  );
};

export default HourlyWeatherDisplaySimple;

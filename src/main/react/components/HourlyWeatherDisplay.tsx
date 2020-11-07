import { Units } from '../models/ApplicationSettings';
import { HourlyWeatherType } from '../models/weather/HourlyWeather';
import styled from 'styled-components';
import React from 'react';
import {
  renderCelsius,
  renderPercentage,
  renderPressure,
  renderTime,
} from './utils';

interface Props {
  hourlyWeather: HourlyWeatherType;
  units: Units;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
  padding-right: 5px;
  padding-left: 5px;
  background: aliceblue;
  text-align: center;
  min-width: 50px;

  .time {
    font-size: 12px;
    border-bottom: 1px solid black;
  }

  .feels-like {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .humidity {
    font-size: 12px;
  }

  .dew-point {
    font-size: 12px;
  }

  .pressure {
    margin-top: 10px;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .visibility {
    margin-top: 5px;
    font-size: 12px;
  }

  .rain {
    margin-top: 5px;
  }

  .snow {
    margin-top: 5px;
  }

  scroll-snap-align: start;
`;

const HourlyWeatherDisplay: React.FunctionComponent<Props> = ({
  hourlyWeather,
  units,
  onMouseDown,
}) => {
  const temperature = hourlyWeather.temperature;
  const weather = hourlyWeather.weatherInfo;
  const precipitationPercentage = hourlyWeather.precipitationProbability * 100;
  return (
    <Wrapper onMouseDown={onMouseDown}>
      <div className={'time separator'}>{renderTime(hourlyWeather.date)}</div>
      <div className={'temperature'}>{renderCelsius(temperature.actual)}</div>
      <div className={'temperature feels-like'}>
        ({renderCelsius(temperature.feelsLike)})
      </div>
      <div className={'humidity'}>{renderPercentage(weather.humidity)}</div>
      <div className={'temperature dew-point'}>
        {renderCelsius(weather.dewPoint)}
      </div>
      <div className={'pressure'}>
        {renderPressure(weather.atmosphericPressure)}
      </div>
      <div className={'clouds'}>{renderPercentage(weather.clouds)}</div>
      <div className={'precipitation'}>
        {renderPercentage(precipitationPercentage)}
      </div>
      <div className={'rain'}>
        {weather.rainVolume ? `${weather.rainVolume}mm` : '-'}
      </div>
      <div className={'snow'}>
        {weather.snowVolume ? `${weather.snowVolume}mm` : '-'}
      </div>
      <div className={'visibility'}>
        {weather.visibility ? `${weather.visibility}m` : '-'}
      </div>
    </Wrapper>
  );
};

export default HourlyWeatherDisplay;

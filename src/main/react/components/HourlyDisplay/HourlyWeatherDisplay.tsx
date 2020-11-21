import { Units } from '../../models/ApplicationSettings';
import { HourlyWeatherType } from '../../models/weather/HourlyWeather';
import styled from 'styled-components';
import React from 'react';
import {
  renderCelsius,
  renderPercentage,
  renderPressure,
  renderTime,
} from '../utils';
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
  units: Units;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isDaytime: boolean;
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
  }

  .humidity {
    margin-top: 5px;
    font-size: 12px;
  }

  .dew-point {
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

  .visibility {
    margin-top: 5px;
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

  scroll-snap-align: start;
`;

const HourlyWeatherDisplay: React.FunctionComponent<Props> = ({
  hourlyWeather,
  units,
  onMouseDown,
  isDaytime,
}) => {
  const temperature = hourlyWeather.temperature;
  const weather = hourlyWeather.weatherInfo;
  const weatherIcon =
    weather.weather && weather.weather.length > 0 && weather.weather[0].icon;
  const precipitationPercentage = hourlyWeather.precipitationProbability * 100;
  return (
    <Wrapper onMouseDown={onMouseDown}>
      <TimeSlot>
        <div className={'time'}>{renderTime(hourlyWeather.date)}</div>
      </TimeSlot>
      <WeatherIconSlot>
        <WeatherIconDisplay
          weatherIcon={weatherIcon || WeatherIcon.Unknown}
          isDay={isDaytime}
        />
      </WeatherIconSlot>
      <TemperatureSlot>
        <div className={'temperature'}>{renderCelsius(temperature.actual)}</div>
        <div className={'temperature feels-like'}>
          ({renderCelsius(temperature.feelsLike)})
        </div>
      </TemperatureSlot>
      <HumidityDewPointSlot>
        <div className={'humidity'}>{renderPercentage(weather.humidity)}</div>
        <div className={'temperature dew-point'}>
          {renderCelsius(weather.dewPoint)}
        </div>
      </HumidityDewPointSlot>
      <PressureSlot>
        <div className={'pressure'}>
          {renderPressure(weather.atmosphericPressure)}
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
          {weather.rainVolume ? `${weather.rainVolume}mm` : '-'}
        </div>
      </RainSlot>
      <SnowSlot>
        <div className={'snow'}>
          {weather.snowVolume ? `${weather.snowVolume}mm` : '-'}
        </div>
      </SnowSlot>
      <VisibilitySlot>
        <div className={'visibility'}>
          {weather.visibility ? `${weather.visibility}m` : '-'}
        </div>
      </VisibilitySlot>
    </Wrapper>
  );
};

export default HourlyWeatherDisplay;

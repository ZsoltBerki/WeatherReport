import { Units } from '../models/ApplicationSettings';
import { HourlyWeatherType } from '../models/weather/HourlyWeather';
import styled from 'styled-components';
import React from 'react';
import {
  getCelsiusString,
  getPercentageString,
  getPressureString,
  getTimeString,
} from './utils';

interface Props {
  hourlyWeather: HourlyWeatherType;
  units: Units;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  text-align: center;

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
}) => {
  return (
    <Wrapper>
      <div className={'time separator'}>
        {getTimeString(hourlyWeather.date)}
      </div>
      <div className={'temperature'}>
        {getCelsiusString(hourlyWeather.temperature.actual)}
      </div>
      <div className={'temperature feels-like'}>
        ({getCelsiusString(hourlyWeather.temperature.feelsLike)})
      </div>
      <div className={'humidity'}>
        {getPercentageString(hourlyWeather.weatherInfo.humidity)}
      </div>
      <div className={'temperature dew-point'}>
        {getCelsiusString(hourlyWeather.weatherInfo.dewPoint)}
      </div>
      <div className={'pressure'}>
        {getPressureString(hourlyWeather.weatherInfo.atmosphericPressure)}
      </div>
      <div className={'clouds'}>
        {getPercentageString(hourlyWeather.weatherInfo.clouds)}
      </div>
      <div className={'precipitation'}>
        {getPercentageString(hourlyWeather.precipitationProbability)}
      </div>
      <div className={'rain'}>
        {hourlyWeather.weatherInfo.rainVolume || 0}mm
      </div>
      <div className={'snow'}>
        {hourlyWeather.weatherInfo.snowVolume || 0}mm
      </div>
      <div className={'visibility'}>
        {hourlyWeather.weatherInfo.visibility}m
      </div>
    </Wrapper>
  );
};

export default HourlyWeatherDisplay;

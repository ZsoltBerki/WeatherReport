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
import ThermometerSVG from '../../svg/wi-thermometer.svg';
import PressureSVG from '../../svg/wi-barometer.svg';
import HumiditySVG from '../../svg/wi-humidity.svg';
import PrecipitationSVG from '../../svg/wi-raindrops.svg';
import CloudRainSVG from '../../svg/wi-showers.svg';
import CloudSnowSVG from '../../svg/wi-snow.svg';
import CloudSVG from '../../svg/wi-cloud.svg';
import { CurrentWeatherType } from '../models/weather/CurrentWeather';
import WeatherIconDisplay from './WeatherIconDisplay';
import { WeatherIcon } from '../models/weather/Weather';

interface Props {
  currentWeather: CurrentWeatherType;
  units: Units;
}

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    align-self: center;
    height: 25px;
    width: 25px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .thermometer-icon {
    margin-top: 20px;
  }

  .humidity-icon {
    margin-top: 15px;
  }

  .pressure-icon {
    margin-top: 3px;
  }

  .precipitation-icon {
    margin-top: -5px;
  }

  .cloud-rain-icon {
    margin-top: -5px;
  }
`;

const ValuesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
  padding-right: 5px;
  padding-left: 5px;
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

const Wrapper = styled.div`
  display: flex;
  border-right: 2px solid gray;
`;

const HourlyWeatherDisplayCurrent: React.FunctionComponent<Props> = ({
  currentWeather,
  units,
}) => {
  const weather = currentWeather.weatherInfo.weather;
  const weatherIcon = weather && weather.length > 0 && weather[0].icon;
  return (
    <Wrapper>
      <IconsWrapper>
        <div className={'thermometer-icon'}>
          <ThermometerSVG />
        </div>
        <div className={'humidity-icon'}>
          <HumiditySVG />
        </div>
        <div className={'pressure-icon'}>
          <PressureSVG />
        </div>
        <div className={'cloud-icon'}>
          <CloudSVG />
        </div>
        <div className={'precipitation-icon'}>
          <PrecipitationSVG />
        </div>
        <div className={'cloud-rain-icon'}>
          <CloudRainSVG />
        </div>
        <div className={'cloud-snow-icon'}>
          <CloudSnowSVG />
        </div>
      </IconsWrapper>
      <ValuesWrapper>
        <div className={'time separator'}>
          {renderTime(currentWeather.date)}
        </div>
        <div className={'weather-icon'}>
          <WeatherIconDisplay
            weatherIcon={weatherIcon || WeatherIcon.Unknown}
            isDay={true}
          />
        </div>
        <div className={'temperature'}>
          {renderCelsius(currentWeather.temperature.actual)}
        </div>
        <div className={'temperature feels-like'}>
          ({renderCelsius(currentWeather.temperature.feelsLike)})
        </div>
        <div className={'humidity'}>
          {renderPercentage(currentWeather.weatherInfo.humidity)}
        </div>
        <div className={'temperature dew-point'}>
          {renderCelsius(currentWeather.weatherInfo.dewPoint)}
        </div>
        <div className={'pressure'}>
          {renderPressure(currentWeather.weatherInfo.atmosphericPressure)}
        </div>
        <div className={'clouds'}>
          {renderPercentage(currentWeather.weatherInfo.clouds)}
        </div>
        <div className={'precipitation'}>-</div>
        <div className={'rain'}>
          {currentWeather.weatherInfo.rainVolume
            ? `${currentWeather.weatherInfo.rainVolume}mm`
            : '-'}
        </div>
        <div className={'snow'}>
          {currentWeather.weatherInfo.snowVolume
            ? `${currentWeather.weatherInfo.snowVolume}mm`
            : '-'}
        </div>
        <div className={'visibility'}>
          {currentWeather.weatherInfo.visibility
            ? `${currentWeather.weatherInfo.visibility}m`
            : '-'}
        </div>
      </ValuesWrapper>
    </Wrapper>
  );
};

export default HourlyWeatherDisplayCurrent;

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
import ThermometerSVG from '../../../svg/wi-thermometer.svg';
import PressureSVG from '../../../svg/wi-barometer.svg';
import HumiditySVG from '../../../svg/wi-humidity.svg';
import PrecipitationSVG from '../../../svg/wi-raindrops.svg';
import CloudRainSVG from '../../../svg/wi-showers.svg';
import CloudSnowSVG from '../../../svg/wi-snow.svg';
import CloudSVG from '../../../svg/wi-cloud.svg';
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
    margin-top: 5px;
  }

  .humidity-icon {
    margin-top: 7px;
  }

  .pressure-icon {
  }

  .cloud-icon {
    margin-top: -2px;
  }

  .precipitation-icon {
    margin-top: -12.8px;
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
        <TimeSlot></TimeSlot>
        <WeatherIconSlot></WeatherIconSlot>
        <TemperatureSlot>
          <div className={'thermometer-icon'}>
            <ThermometerSVG />
          </div>
        </TemperatureSlot>
        <HumidityDewPointSlot>
          <div className={'humidity-icon'}>
            <HumiditySVG />
          </div>
        </HumidityDewPointSlot>
        <PressureSlot>
          <div className={'pressure-icon'}>
            <PressureSVG />
          </div>
        </PressureSlot>
        <CloudRainSlot>
          <div className={'cloud-icon'}>
            <CloudSVG />
          </div>
          <div className={'precipitation-icon'}>
            <PrecipitationSVG />
          </div>
        </CloudRainSlot>
        <RainSlot>
          <div className={'cloud-rain-icon'}>
            <CloudRainSVG />
          </div>
        </RainSlot>
        <SnowSlot>
          <div className={'cloud-snow-icon'}>
            <CloudSnowSVG />
          </div>
        </SnowSlot>
      </IconsWrapper>
      <ValuesWrapper>
        <TimeSlot>
          <div className={'time separator'}>
            {renderTime(currentWeather.date)}
          </div>
        </TimeSlot>
        <WeatherIconSlot>
          <div className={'weather-icon'}>
            <WeatherIconDisplay
              weatherIcon={weatherIcon || WeatherIcon.Unknown}
              isDay={true}
            />
          </div>
        </WeatherIconSlot>
        <TemperatureSlot>
          <div className={'temperature'}>
            {renderCelsius(currentWeather.temperature.actual)}
          </div>
          <div className={'temperature feels-like'}>
            ({renderCelsius(currentWeather.temperature.feelsLike)})
          </div>
        </TemperatureSlot>
        <HumidityDewPointSlot>
          <div className={'humidity'}>
            {renderPercentage(currentWeather.weatherInfo.humidity)}
          </div>
          <div className={'temperature dew-point'}>
            {renderCelsius(currentWeather.weatherInfo.dewPoint)}
          </div>
        </HumidityDewPointSlot>
        <PressureSlot>
          <div className={'pressure'}>
            {renderPressure(currentWeather.weatherInfo.atmosphericPressure)}
          </div>
        </PressureSlot>
        <CloudRainSlot>
          <div className={'clouds'}>
            {renderPercentage(currentWeather.weatherInfo.clouds)}
          </div>
          <div className={'precipitation'}>-</div>
        </CloudRainSlot>
        <RainSlot>
          <div className={'rain'}>
            {currentWeather.weatherInfo.rainVolume
              ? `${currentWeather.weatherInfo.rainVolume}mm`
              : '-'}
          </div>
        </RainSlot>
        <SnowSlot>
          <div className={'snow'}>
            {currentWeather.weatherInfo.snowVolume
              ? `${currentWeather.weatherInfo.snowVolume}mm`
              : '-'}
          </div>
        </SnowSlot>
        <VisibilitySlot>
          <div className={'visibility'}>
            {currentWeather.weatherInfo.visibility
              ? `${currentWeather.weatherInfo.visibility}m`
              : '-'}
          </div>
        </VisibilitySlot>
      </ValuesWrapper>
    </Wrapper>
  );
};

export default HourlyWeatherDisplayCurrent;

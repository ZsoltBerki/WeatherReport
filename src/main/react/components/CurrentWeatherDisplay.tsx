import { CurrentWeatherType } from '../models/CurrentWeather';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import SunriseSVG from '../../svg/wi-sunrise.svg';
import SunsetSVG from '../../svg/wi-sunset.svg';
import PressureSVG from '../../svg/wi-barometer.svg';
import HumiditySVG from '../../svg/wi-humidity.svg';
import DewSVG from '../../svg/wi-raindrops.svg';
import WindSVG from '../../svg/wi-wind-deg.svg';
import RightArrowSVG from '../../svg/wi-direction-right.svg';
import {
  renderCelsius,
  renderPercentage,
  renderPressure,
  renderSpeed,
  renderTime,
} from './utils';
import { Units } from '../models/ApplicationSettings';

interface Props {
  currentWeather: CurrentWeatherType;
  units: Units;
}

const Wrapper = styled.div``;

const IconValueWrapper = styled.div`
  display: flex;
  svg {
    align-self: center;
    height: 25px;
    width: 25px;
    padding-left: 5px;
    padding-right: 5px;
  }
  span {
    align-self: center;
    line-height: 20px;
    font-size: 18px;
  }
`;

const ValueRow = styled.div`
  display: flex;
  & > div {
    width: 120px;
  }
`;

const ValueColumn = styled.div`
  display: flex;
  flex-direction: column;
  & > div {
    align-self: center;
    margin-bottom: 10px;
  }
`;

const MainTemperatureWrapper = styled.div`
  line-height: 35px;
  font-size: 32px;
`;

const SubTemperatureWrapper = styled.div`
  line-height: 14px;
  font-size: 12px;
`;

const CurrentWeatherDisplay: React.FunctionComponent<Props> = ({
  currentWeather,
  units,
}) => {
  return (
    <Wrapper>
      <ValueColumn>
        <IconValueWrapper className={'section-sun-rise-and-set'}>
          <SunriseSVG />
          <span>{renderTime(currentWeather.sunrise)}</span>
          <RightArrowSVG />
          <span>{renderTime(currentWeather.sunset)}</span>
          <SunsetSVG />
        </IconValueWrapper>
        <MainTemperatureWrapper>
          {renderCelsius(currentWeather.temperature)}
        </MainTemperatureWrapper>
        <SubTemperatureWrapper className={'feels-like-temperature'}>
          feels like {renderCelsius(currentWeather.temperatureFeelsLike)}
        </SubTemperatureWrapper>
        <ValueRow>
          <IconValueWrapper>
            <PressureSVG />
            <span>{renderPressure(currentWeather.atmosphericPressure)}</span>
          </IconValueWrapper>
          <IconValueWrapper>
            <div
              style={{
                transform: `rotate(${currentWeather.windDirection}deg)`,
              }}
            >
              <WindSVG />
            </div>
            <span>{renderSpeed(currentWeather.windSpeed, units)}</span>
          </IconValueWrapper>
        </ValueRow>
        <ValueRow>
          <IconValueWrapper>
            <HumiditySVG />
            <span>{renderPercentage(currentWeather.humidity)}</span>
          </IconValueWrapper>
          <IconValueWrapper>
            <DewSVG />
            <span>{renderCelsius(currentWeather.dewPoint)}</span>
          </IconValueWrapper>
        </ValueRow>
      </ValueColumn>
    </Wrapper>
  );
};

export default CurrentWeatherDisplay;

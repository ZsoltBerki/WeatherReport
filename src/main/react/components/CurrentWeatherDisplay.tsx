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
  getCelsiusString,
  getPercentageString,
  getPressureString,
  getSpeedString,
  getTimeString,
} from '../utils';
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
          <span>{getTimeString(currentWeather.sunrise)}</span>
          <RightArrowSVG />
          <span>{getTimeString(currentWeather.sunset)}</span>
          <SunsetSVG />
        </IconValueWrapper>
        <MainTemperatureWrapper>
          {getCelsiusString(currentWeather.temperature)}
        </MainTemperatureWrapper>
        <SubTemperatureWrapper className={'feels-like-temperature'}>
          feels like {getCelsiusString(currentWeather.temperatureFeelsLike)}
        </SubTemperatureWrapper>
        <ValueRow>
          <IconValueWrapper>
            <PressureSVG />
            <span>{getPressureString(currentWeather.atmosphericPressure)}</span>
          </IconValueWrapper>
          <IconValueWrapper>
            <div
              style={{
                transform: `rotate(${currentWeather.windDirection}deg)`,
              }}
            >
              <WindSVG />
            </div>
            <span>{getSpeedString(currentWeather.windSpeed, units)}</span>
          </IconValueWrapper>
        </ValueRow>
        <ValueRow>
          <IconValueWrapper>
            <HumiditySVG />
            <span>{getPercentageString(currentWeather.humidity)}</span>
          </IconValueWrapper>
          <IconValueWrapper>
            <DewSVG />
            <span>{getCelsiusString(currentWeather.dewPoint)}</span>
          </IconValueWrapper>
        </ValueRow>
      </ValueColumn>
    </Wrapper>
  );
};

export default CurrentWeatherDisplay;

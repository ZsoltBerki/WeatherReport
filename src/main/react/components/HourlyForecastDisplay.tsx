import { Units } from '../models/ApplicationSettings';
import { HourlyWeatherType } from '../models/weather/HourlyWeather';
import styled from 'styled-components';
import React from 'react';
import HourlyWeatherDisplay from './HourlyWeatherDisplay';
import ThermometerSVG from '../../svg/wi-thermometer.svg';
import PressureSVG from '../../svg/wi-barometer.svg';
import HumiditySVG from '../../svg/wi-humidity.svg';
import PrecipitationSVG from '../../svg/wi-raindrops.svg';
import CloudRainSVG from '../../svg/wi-showers.svg';
import CloudSnowSVG from '../../svg/wi-snow.svg';
import CloudSVG from '../../svg/wi-cloud.svg';

interface Props {
  hourlyForecast: Array<HourlyWeatherType>;
  units: Units;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ValuesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    align-self: center;
    height: 25px;
    width: 25px;
    padding-left: 5px;
    padding-right: 5px;
  }
`;

const MarginTop20 = styled.div`
  margin-top: 20px;
`;

const MarginTop15 = styled.div`
  margin-top: 15px;
`;

const MarginTop3 = styled.div`
  margin-top: 3px;
`;

const MarginTopNeg5 = styled.div`
  margin-top: -5px;
`;

const HourlyForecastDisplay: React.FunctionComponent<Props> = ({
  hourlyForecast,
  units,
}) => {
  return (
    <Wrapper>
      <Icons>
        <MarginTop20>
          <ThermometerSVG />
        </MarginTop20>
        <MarginTop15>
          <HumiditySVG />
        </MarginTop15>
        <MarginTop3>
          <PressureSVG />
        </MarginTop3>
        <CloudSVG />
        <MarginTopNeg5>
          <PrecipitationSVG />
        </MarginTopNeg5>
        <MarginTopNeg5>
          <CloudRainSVG />
        </MarginTopNeg5>
        <CloudSnowSVG />
      </Icons>
      <ValuesWrapper>
        {hourlyForecast.map((hourlyWeather, index) => (
          <HourlyWeatherDisplay
            key={index}
            hourlyWeather={hourlyWeather}
            units={units}
          />
        ))}
      </ValuesWrapper>
    </Wrapper>
  );
};

export default HourlyForecastDisplay;

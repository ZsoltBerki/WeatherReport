import React from 'react';
import DayStormShowersSVG from '../../svg/wi-day-storm-showers.svg';
import DayThunderstormSVG from '../../svg/wi-day-thunderstorm.svg';
import DayLightningSVG from '../../svg/wi-day-lightning.svg';
import DaySprinkleSVG from '../../svg/wi-day-sprinkle.svg';
import DayRainSVG from '../../svg/wi-day-rain.svg';
import DayHailSVG from '../../svg/wi-day-hail.svg';
import DayRainWindSVG from '../../svg/wi-day-rain-wind.svg';
import DaySnowSVG from '../../svg/wi-day-snow.svg';
import DaySleetSVG from '../../svg/wi-day-sleet.svg';
import DayRainMixSVG from '../../svg/wi-day-rain-mix.svg';
import DayFogSVG from '../../svg/wi-day-fog.svg';
import DayHazeSVG from '../../svg/wi-day-haze.svg';
import DaySunnySVG from '../../svg/wi-day-sunny.svg';
import DayCloudySVG from '../../svg/wi-day-cloudy.svg';
import NightStormShowersSVG from '../../svg/wi-night-storm-showers.svg';
import NightThunderstormSVG from '../../svg/wi-night-thunderstorm.svg';
import NightLightningSVG from '../../svg/wi-night-lightning.svg';
import NightSprinkleSVG from '../../svg/wi-night-sprinkle.svg';
import NightRainSVG from '../../svg/wi-night-rain.svg';
import NightHailSVG from '../../svg/wi-night-hail.svg';
import NightRainWindSVG from '../../svg/wi-night-rain-wind.svg';
import NightSnowSVG from '../../svg/wi-night-snow.svg';
import NightSleetSVG from '../../svg/wi-night-sleet.svg';
import NightRainMixSVG from '../../svg/wi-night-rain-mix.svg';
import NightFogSVG from '../../svg/wi-night-fog.svg';
import NightClearSVG from '../../svg/wi-night-clear.svg';
import NightCloudySVG from '../../svg/wi-night-cloudy.svg';
import SmokeSVG from '../../svg/wi-smoke.svg';
import DustSVG from '../../svg/wi-dust.svg';
import SandstormSVG from '../../svg/wi-sandstorm.svg';
import VolcanoSVG from '../../svg/wi-volcano.svg';
import StrongWindSVG from '../../svg/wi-strong-wind.svg';
import TornadoSVG from '../../svg/wi-tornado.svg';
import CloudySVG from '../../svg/wi-cloudy.svg';
import UnknownSVG from '../../svg/wi-na.svg';
import { WeatherIcon } from '../models/weather/Weather';

interface Props {
  weatherIcon: WeatherIcon;
  isDay: boolean;
}

const WeatherIconDisplay: React.FunctionComponent<Props> = ({
  weatherIcon,
  isDay,
}) => {
  switch (weatherIcon) {
    case WeatherIcon.StormShowers:
      return isDay ? <DayStormShowersSVG /> : <NightStormShowersSVG />;
    case WeatherIcon.Thunderstorm:
      return isDay ? <DayThunderstormSVG /> : <NightThunderstormSVG />;
    case WeatherIcon.Lightning:
      return isDay ? <DayLightningSVG /> : <NightLightningSVG />;
    case WeatherIcon.Sprinkle:
      return isDay ? <DaySprinkleSVG /> : <NightSprinkleSVG />;
    case WeatherIcon.Rain:
      return isDay ? <DayRainSVG /> : <NightRainSVG />;
    case WeatherIcon.Hail:
      return isDay ? <DayHailSVG /> : <NightHailSVG />;
    case WeatherIcon.RainWind:
      return isDay ? <DayRainWindSVG /> : <NightRainWindSVG />;
    case WeatherIcon.Snow:
      return isDay ? <DaySnowSVG /> : <NightSnowSVG />;
    case WeatherIcon.Sleet:
      return isDay ? <DaySleetSVG /> : <NightSleetSVG />;
    case WeatherIcon.RainMix:
      return isDay ? <DayRainMixSVG /> : <NightRainMixSVG />;
    case WeatherIcon.Fog:
      return isDay ? <DayFogSVG /> : <NightFogSVG />;
    case WeatherIcon.Haze:
      return isDay ? <DayHazeSVG /> : <NightFogSVG />;
    case WeatherIcon.Sunny:
      return isDay ? <DaySunnySVG /> : <NightClearSVG />;
    case WeatherIcon.Cloudy:
      return isDay ? <DayCloudySVG /> : <NightCloudySVG />;
    case WeatherIcon.Smoke:
      return <SmokeSVG />;
    case WeatherIcon.Dust:
      return <DustSVG />;
    case WeatherIcon.Sandstorm:
      return <SandstormSVG />;
    case WeatherIcon.Volcano:
      return <VolcanoSVG />;
    case WeatherIcon.StrongWind:
      return <StrongWindSVG />;
    case WeatherIcon.Tornado:
      return <TornadoSVG />;
    case WeatherIcon.Clouds:
      return <CloudySVG />;
    case WeatherIcon.Unknown:
      return <UnknownSVG />;
    default:
      return <UnknownSVG />;
  }
};

export default WeatherIconDisplay;

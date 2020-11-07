import styled from 'styled-components';
import React, { useEffect } from 'react';
import { HourlyWeatherType } from '../models/weather/HourlyWeather';
import HourlyWeatherDisplaySimple from './HourlyWeatherDisplaySimple';
import { Units } from '../models/ApplicationSettings';
import HourlyWeatherDisplay from './HourlyWeatherDisplay';
import { CurrentWeatherType } from '../models/weather/CurrentWeather';
import HourlyWeatherDisplayCurrent from './HourlyWeatherDisplayCurrent';

interface Props {
  displayedItemIndex: number;
  starDragging: (startPosition: number) => void;
  stopDragging: () => void;
  drag: (newPosition: number) => void;
  hourlyForecast: Array<HourlyWeatherType>;
  currentWeather: CurrentWeatherType;
  units: Units;
}

const Wrapper = styled.div`
  display: flex;
`;

class HourlyScaleDisplay extends React.Component<Props> {
  onMouseUp: ((e: MouseEvent) => void) | undefined;
  onMouseMove: ((e: MouseEvent) => void) | undefined;

  startDragging(): void {
    document.addEventListener('mousemove', this.getMouseMove());
    document.addEventListener('mouseup', this.getMouseUp());
  }

  stopDragging(): void {
    this.onMouseMove &&
      document.removeEventListener('mousemove', this.onMouseMove);
    this.onMouseUp && document.removeEventListener('mouseup', this.onMouseUp);
  }

  getMouseDown(): (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      this.props.starDragging(e.pageX);
      this.startDragging();
      e.stopPropagation();
      e.preventDefault();
    };
  }

  getMouseUp(): (e: MouseEvent) => void {
    const onMouseUpEvent = (e: MouseEvent) => {
      this.stopDragging();
      this.props.stopDragging();
      e.stopPropagation();
      e.preventDefault();
    };
    this.onMouseUp = onMouseUpEvent;
    return onMouseUpEvent;
  }

  getMouseMove(): (e: MouseEvent) => void {
    const onMouseMoveEvent = (e: MouseEvent) => {
      this.props.drag(e.pageX);
      e.stopPropagation();
      e.preventDefault();
    };
    this.onMouseMove = onMouseMoveEvent;
    return onMouseMoveEvent;
  }

  render() {
    const {
      hourlyForecast,
      displayedItemIndex,
      currentWeather,
      units,
    } = this.props;
    const preDisplayList = hourlyForecast.slice(0, displayedItemIndex);
    const displayItem = hourlyForecast[displayedItemIndex];
    const postDisplayList = hourlyForecast.slice(displayedItemIndex + 1);
    return (
      <Wrapper>
        <HourlyWeatherDisplayCurrent
          currentWeather={currentWeather}
          units={units}
        />
        {preDisplayList.map((hourlyWeatherItem, index) => (
          <HourlyWeatherDisplaySimple
            key={index}
            hourlyWeather={hourlyWeatherItem}
            units={units}
            hourlyWeatherReference={currentWeather}
          />
        ))}
        <HourlyWeatherDisplay
          onMouseDown={this.getMouseDown()}
          hourlyWeather={displayItem}
          units={this.props.units}
        />
        {postDisplayList.map((hourlyWeatherItem, index) => (
          <HourlyWeatherDisplaySimple
            key={index}
            hourlyWeather={hourlyWeatherItem}
            units={units}
            hourlyWeatherReference={currentWeather}
          />
        ))}
      </Wrapper>
    );
  }
}

export default HourlyScaleDisplay;

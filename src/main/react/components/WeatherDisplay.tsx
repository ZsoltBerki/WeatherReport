import React from 'react';
import { WeatherModelType } from '../models/Weather';

interface WeatherDisplayProps {
  model: WeatherModelType;
}

export const getIconUrl = (iconCode: string) =>
  `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

const WeatherDisplay: React.FunctionComponent<WeatherDisplayProps> = ({
  model,
}) => {
  return (
    <React.Fragment>
      <img src={getIconUrl(model.icon)} alt={model.main} />
    </React.Fragment>
  );
};

export default WeatherDisplay

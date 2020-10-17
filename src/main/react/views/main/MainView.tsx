import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React, { useEffect } from 'react';
import WeatherDisplay from '../../components/WeatherDisplay';
import { State } from '../../models/DataStatus';
import { StoreType } from '../../models/RootStore';
import BarometerSVG from '../../../svg/wi-barometer.svg';

interface MainViewProps {
  store?: StoreType;
  className?: string;
}

const MainView: React.FunctionComponent<MainViewProps> = ({
  className,
  store,
}) => {
  useEffect(() => {
    store?.initWeatherData();
  }, []);

  return store ? (
    <div className={className}>
      <span>{store.applicationSettings.units}</span>
      {store.locations.map((location, index) => (
        <React.Fragment key={index}>
          <span>{location.status.state}</span>
          {location.status.state == State.success && (
            <div>
              <BarometerSVG />
              <p>Current temperature:{location.currentWeather?.temperature}</p>
              <p>Feels like:{location.currentWeather?.temperatureFeelsLike}</p>
              <p>Sunrise:{location.currentWeather?.sunrise.toTimeString()}</p>
              <p>Sunset:{location.currentWeather?.sunset.toTimeString()}</p>
              <p>
                Atmospheric pressure:
                {location.currentWeather?.atmosphericPressure}
              </p>
              <p>Humidity:{location.currentWeather?.humidity}</p>
              <p>Dew point:{location.currentWeather?.dewPoint}</p>
              <p>Clouds:{location.currentWeather?.clouds}</p>
              <p>UVI:{location.currentWeather?.uvi}</p>
              <p>Visibility:{location.currentWeather?.visibility}</p>
              <p>Wind speed:{location.currentWeather?.windSpeed}</p>
              <p>Wind direction:{location.currentWeather?.windDirection}</p>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  ) : (
    <span>Store cannot be null</span>
  );
};

export default inject('store')(observer(MainView));

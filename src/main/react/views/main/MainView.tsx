import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React, { useEffect } from 'react';
import WeatherDisplay from '../../components/WeatherDisplay';
import { State } from '../../models/DataStatus';
import { StoreType } from '../../models/RootStore';
import BarometerSVG from '../../../svg/wi-barometer.svg';
import CurrentWeatherDisplay from '../../components/CurrentWeatherDisplay';

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
      {store.locations.map((location, index) => (
        <React.Fragment key={index}>
          {location.status.state == State.success && (
            <div>
              {location.currentWeather && (
                <CurrentWeatherDisplay
                  units={store.applicationSettings.units}
                  currentWeather={location.currentWeather}
                />
              )}
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

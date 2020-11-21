import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React, { useEffect } from 'react';
import WeatherDisplay from '../../components/WeatherDisplay';
import { State } from '../../models/DataStatus';
import { StoreType } from '../../models/RootStore';
import BarometerSVG from '../../../svg/wi-barometer.svg';
import CurrentWeatherDisplay from '../../components/CurrentWeatherDisplay';
import HourlyForecastDisplay from '../../components/HourlyForecastDisplay';
import AlertsDisplay from '../../components/AlertsDisplay';
import Dragable from '../../components/Dragable';
import HourlyScaleDisplay from '../../components/HourlyDisplay/HourlyScaleDisplay';
import HourlyWeatherDisplayCurrent from '../../components/HourlyDisplay/HourlyWeatherDisplayCurrent';

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
      {store.forecastForLocation.status.state == State.success && (
        <React.Fragment>
          <div>
            {store.forecastForLocation.forecast && (
              <React.Fragment>
                <AlertsDisplay
                  alerts={store.forecastForLocation.forecast.alerts}
                />
                <HourlyScaleDisplay
                  currentWeather={store.forecastForLocation.forecast.current}
                  displayedItemIndex={store.hourlyScale.displayedItemIndex}
                  starDragging={store.hourlyScale.startDragging}
                  stopDragging={store.hourlyScale.stopDragging}
                  drag={store.hourlyScale.drag}
                  units={store.applicationSettings.units}
                  onDaytime={store.forecastForLocation.forecast.onDaytime}
                  hourlyForecast={store.forecastForLocation.forecast.hourly.slice(
                    1,
                    store.hourlyScale.totalItems + 1
                  )}
                />
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  ) : (
    <span>Store cannot be null</span>
  );
};

export default inject('store')(observer(MainView));

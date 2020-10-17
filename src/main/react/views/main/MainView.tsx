import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React from 'react';
import WeatherDisplay from '../../components/WeatherDisplay';
import { StoreType } from '../../models/RootStore';

interface MainViewProps {
  store?: StoreType;
  className?: string;
}

const MainView: React.FunctionComponent<MainViewProps> = ({
  className,
  store,
}) => {
  return store ? (
    <div className={className}>
      <h1>This is a React View with Typescript</h1>
      <span>{store.applicationSettings.units}</span>
    </div>
  ) : (
    <span>Store cannot be null</span>
  );
};



export default inject('store')(observer(MainView));

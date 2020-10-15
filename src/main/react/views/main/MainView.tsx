import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import React from 'react';
import WeatherDisplay from '../../components/WeatherDisplay';
import { RootInstance } from '../../models/RootStore';

interface MainViewProps {
  store?: RootInstance;
  className?: string;
}

const MainView: React.FunctionComponent<MainViewProps> = ({
  className,
  store,
}) => {
  return ( store ?
    <div className={className}>
      <h1>This is a React View with Typescript</h1>
      <span>{store?.weatherExample.main}</span>
      <WeatherDisplay model={getSnapshot(store?.weatherExample)}/>
    </div> : <span>Store cannot be null</span>
  );
};



export default inject('store')(observer(MainView));

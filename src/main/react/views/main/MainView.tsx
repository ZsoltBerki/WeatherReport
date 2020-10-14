import { inject, observer } from 'mobx-react';
import React from 'react';
import { RootInstance } from '../../models/RootStore';

interface MainViewProps {
  store?: RootInstance;
  className?: string;
}

const MainView: React.FunctionComponent<MainViewProps> = ({
  className,
  store,
}) => {
  return (
    <div className={className}>
      <h1>This is a React View with Typescript</h1>
      <span>{store?.weatherExample.main}</span>
    </div>
  );
};

export default inject('store')(observer(MainView));

import { Provider } from 'mobx-react';
import React from 'react';
import { rootStore } from './models/RootStore';
import MainView from './views/main/MainView';

const Application: React.FunctionComponent = () => {
  return (
    <Provider store={rootStore}>
      <MainView />
    </Provider>
  );
};

export default Application;

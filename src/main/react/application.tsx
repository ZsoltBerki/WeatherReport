import { Provider } from 'mobx-react';
import React from 'react';
import { ApplicationSettingsType } from './models/ApplicationSettings';
import { LocationType } from './models/Location';
import { initStore } from './models/RootStore';
import MainView from './views/main/MainView';

interface ApplicationProps {
  settings: ApplicationSettingsType;
  defaultLocation: LocationType;
}

const Application: React.FunctionComponent<ApplicationProps> = ({
  settings,
  defaultLocation,
}) => {
  const store = initStore(settings, [
    // { latitude: 62.36594, longitude: 29.42311 },
    defaultLocation,
  ]);
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
};

export default Application;

import { Provider } from 'mobx-react';
import React from 'react';
import { ApplicationSettingsType } from './models/ApplicationSettings';
import { LocationType } from './models/Location';
import { initStore } from './models/RootStore';
import { Services } from './services/Services';
import MainView from './views/main/MainView';
import styled from 'styled-components';

interface ApplicationProps {
  settings: ApplicationSettingsType;
  defaultLocation: LocationType;
}

const Screen = styled.div`
  min-width: 800px;
  max-width: 800px;
  min-height: 480px;
  max-height: 480px;
  border: 1px solid black;
  padding: 20px;
`;

const Application: React.FunctionComponent<ApplicationProps> = ({
  settings,
  defaultLocation,
}) => {
  const store = initStore(settings, [
    // { latitude: 62.36594, longitude: 29.42311 },
    defaultLocation,
  ]);

  Services.init(settings);

  return (
    <Provider store={store}>
      <Screen>
        <MainView />
      </Screen>
    </Provider>
  );
};

export default Application;

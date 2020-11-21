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
  min-height: 440px;
  max-height: 440px;
  border: 1px solid black;
  font-family: Arial;
}
`;

const Application: React.FunctionComponent<ApplicationProps> = ({
  settings,
  defaultLocation,
}) => {
  const store = initStore(settings, defaultLocation);

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

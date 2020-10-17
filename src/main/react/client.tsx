import React from 'react';
import ReactDOM from 'react-dom';
import Application from './Application';
import { ApplicationSettingsType } from './models/ApplicationSettings';
import { LocationType } from './models/Location';

export class WeatherReport {
  settings: ApplicationSettingsType;
  defaultLocation: LocationType;
  documentId: string;

  constructor(
    settings: ApplicationSettingsType,
    defaultLocation: LocationType,
    documentId: string
  ) {
    this.settings = settings;
    this.documentId = documentId;
    this.defaultLocation = defaultLocation;
  }

  render(): void {
    ReactDOM.render(
      <Application
        settings={this.settings}
        defaultLocation={this.defaultLocation}
      />,
      document.getElementById(this.documentId)
    );
  }
}

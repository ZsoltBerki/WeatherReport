import { Instance, types } from 'mobx-state-tree';

export enum Language {
  'fi' = 'fi',
  'hu' = 'hu',
  'en' = 'en',
}

export enum Units {
  'standard' = 'standard',
  'metric' = 'metric',
  'imperial' = 'imperial',
}

export const ApplicationSettingsModel = types.model('Application Settings', {
  apiKey: types.string,
  language: types.enumeration<Language>('Language', Object.values(Language)),
  units: types.enumeration<Units>('Units', Object.values(Units)),
  openApiUrl: types.string,
});

export type ApplicationSettingsType = Instance<typeof ApplicationSettingsModel>;

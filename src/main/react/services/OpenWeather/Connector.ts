import axios, { AxiosResponse } from 'axios';
import { _NotCustomized } from 'mobx-state-tree';
import { Language, Units } from '../../models/ApplicationSettings';
import { LocationType } from '../../models/Location';

export interface OpenWeatherConnector {
  get: (path: string, location: LocationType) => Promise<any>;
}

export class OpenWeatherConnectorImpl implements OpenWeatherConnector {
  apiKey: string;
  language: Language;
  unit: Units;
  baseUrl: string;

  constructor(
    apiKey: string,
    language: Language,
    unit: Units,
    baseUrl: string
  ) {
    this.apiKey = apiKey;
    this.language = language;
    this.unit = unit;
    this.baseUrl = baseUrl;
  }

  private getQueryParameters(location: LocationType): string {
    return `?lat=${location.latitude}&lon=${location.longitude}&appid=${this.apiKey}&units=${this.unit}&lang=${this.language}`;
  }

  onSuccess(response: AxiosResponse): any {
    if (response.status == 200) {
      return response.data;
    } else {
      throw `${response.status} - ${response.statusText}`;
    }
  }

  get(path: string, location: LocationType): Promise<any> {
    const apiUrl = this.baseUrl;
    const queryParameters = this.getQueryParameters(location);

    const url = `${apiUrl}${path}${queryParameters}`;
    return axios.get(url).then(this.onSuccess);
  }
}

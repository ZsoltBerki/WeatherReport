import axios from 'axios';
import {
  IStateTreeNode,
  IModelType,
  ISimpleType,
  _NotCustomized,
} from 'mobx-state-tree';
import { NonEmptyObject } from 'mobx-state-tree/dist/internal';
import { Language, Units } from '../models/ApplicationSettings';
import { LocationType } from '../models/Location';

export interface OpenWeatherConnector {
  executeOneCallApi: (location: LocationType) => Promise<any>;
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

  private static oneCallPath = '/onecall';

  executeOneCallApi(location: LocationType): Promise<any> {
    const apiUrl = this.baseUrl;
    const callUrl = OpenWeatherConnectorImpl.oneCallPath;
    const queryParameters = this.getQueryParameters(location);

    const url = `${apiUrl}${callUrl}${queryParameters}`;
    return axios.get(url);
  }
}

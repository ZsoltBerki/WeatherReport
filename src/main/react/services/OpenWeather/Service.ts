import {
  IStateTreeNode,
  IModelType,
  ISimpleType,
  _NotCustomized,
} from 'mobx-state-tree';
import { NonEmptyObject } from 'mobx-state-tree/dist/internal';
import { LocationType } from '../../models/Location';
import { OpenWeatherConnector, OpenWeatherConnectorImpl } from './Connector';
import { OneCallType, verifyOneCallType } from './types/OneCallApiType';

export interface OpenWeatherService {
  executeOneCall: (location: LocationType) => Promise<OneCallType>;
}

export class OpenWeatherServiceImpl implements OpenWeatherService {
  connector: OpenWeatherConnector;
  private static oneCallPath = '/onecall';

  constructor(connector: OpenWeatherConnector) {
    this.connector = connector;
  }

  executeOneCall(location: LocationType): Promise<OneCallType> {
    return this.connector
      .get(OpenWeatherServiceImpl.oneCallPath, location)
      .then((result) => {
        verifyOneCallType(result);
        return result as OneCallType;
      });
  }
}

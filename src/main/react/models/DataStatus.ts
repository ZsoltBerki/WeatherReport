import { Instance, types } from 'mobx-state-tree';

export enum State {
  'initial' = 'initial',
  'pending' = 'pending',
  'success' = 'success',
  'error' = 'error',
}

export const DataStatusModel = types.model('Data Status', {
  state: types.enumeration<State>('State', Object.values(State)),
  lastFetch: types.maybe(types.Date),
});

export type DataStatusType = Instance<typeof DataStatusModel>;

import { Instance, types } from 'mobx-state-tree';

export const LocationModel = types.model('Location', {
  latitude: types.number,
  longitude: types.number,
});

export type LocationType = Instance<typeof LocationModel>;

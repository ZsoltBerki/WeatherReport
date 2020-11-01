import { Instance, types } from 'mobx-state-tree';

export const AlertModel = types.model('Alert', {
  sender: types.string,
  event: types.string,
  description: types.string,
  start: types.Date,
  end: types.Date,
});

export type AlertType = Instance<typeof AlertModel>;

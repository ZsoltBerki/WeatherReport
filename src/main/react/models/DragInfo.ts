import { Instance, types } from 'mobx-state-tree';

export const DragInfoModel = types
  .model('Drag', {
    initial_X: types.number,
    initial_Y: types.number,
    current_X: types.number,
    current_Y: types.number,
  })
  .actions((self) => ({
    setInitial(x: number, y: number): void {
      self.initial_X = x;
      self.initial_Y = y;
    },
    setCurrent(x: number, y: number): void {
      console.log('set current', x, y);
      self.current_X = x;
      self.current_Y = y;
    },
    reset(): void {
      self.initial_X = 0;
      self.initial_Y = 0;

      self.current_X = 0;
      self.current_Y = 0;
    },
  }));

export type DragInfoType = Instance<typeof DragInfoModel>;

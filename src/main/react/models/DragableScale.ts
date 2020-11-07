import { types } from 'mobx-state-tree';
import { number } from 'mobx-state-tree/dist/internal';

export const DragableScaleModel = types
  .model('DragableScaleModel', {
    displayedItemIndex: types.number,
    totalItems: types.number,
    // The cursor position when the dragging started
    draggingStartPosition: types.number,
    // The treshold for changing item in the list
    draggingTreshold: types.number,
  })
  .views((self) => ({
    canDragUpwards(): boolean {
      return self.displayedItemIndex < self.totalItems - 1;
    },
    canDragDownwards(): boolean {
      return self.displayedItemIndex > 0;
    },
    isDraggingUpwards(draggingDistance: number): boolean {
      return draggingDistance > 0;
    },
    isDraggingDownwards(draggingDistance: number): boolean {
      return draggingDistance < 0;
    },
    goesAboveTreshold(draggingDistance: number): boolean {
      return Math.abs(draggingDistance) >= self.draggingTreshold;
    },
  }))
  .actions((self) => ({
    startDragging(startPosition: number): void {
      self.draggingStartPosition = startPosition;
    },
    stopDragging(): void {
      self.draggingStartPosition = 0;
    },
    drag(newPosition: number) {
      const draggingDistance = newPosition - self.draggingStartPosition;

      if (self.goesAboveTreshold(draggingDistance)) {
        if (self.isDraggingUpwards(draggingDistance) && self.canDragUpwards()) {
          self.displayedItemIndex = self.displayedItemIndex + 1;
          self.draggingStartPosition =
            self.draggingStartPosition + self.draggingTreshold;
        } else if (
          self.isDraggingDownwards(draggingDistance) &&
          self.canDragDownwards()
        ) {
          self.displayedItemIndex = self.displayedItemIndex - 1;
          self.draggingStartPosition =
            self.draggingStartPosition - self.draggingTreshold;
        }
      }
    },
  }));

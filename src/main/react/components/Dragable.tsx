import styled from 'styled-components';
import React, { useEffect } from 'react';
import { DragInfoType } from '../models/DragInfo';

interface DragableProps {
  initialX: number;
  initialY: number;
  currentX: number;
  currentY: number;
  setInitial: (x: number, y: number) => void;
  setCurrent: (x: number, y: number) => void;
  reset: () => void;
}

const DragableWrapper = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

class Dragable extends React.Component<DragableProps> {
  onMouseUp: ((e: MouseEvent) => void) | undefined;
  onMouseMove: ((e: MouseEvent) => void) | undefined;

  startDragging(): void {
    console.log('Start dragging');
    document.addEventListener('mousemove', this.getMouseMove());
    document.addEventListener('mouseup', this.getMouseUp());
  }

  stopDragging(): void {
    console.log('Stop dragging');
    this.onMouseMove &&
      document.removeEventListener('mousemove', this.onMouseMove);
    this.onMouseUp && document.removeEventListener('mouseup', this.onMouseUp);
  }

  getMouseDown(): (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void {
    const setInitial: (x: number, y: number) => void = this.props.setInitial;
    const setCurrent: (x: number, y: number) => void = this.props.setCurrent;

    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setInitial(e.pageX, e.pageY);
      setCurrent(e.pageX, e.pageY);
      this.startDragging();
      e.stopPropagation();
      e.preventDefault();
    };
  }

  getMouseUp(): (e: MouseEvent) => void {
    const onMouseUpEvent = (e: MouseEvent) => {
      this.stopDragging();
      this.props.reset();
      e.stopPropagation();
      e.preventDefault();
    };
    this.onMouseUp = onMouseUpEvent;
    return onMouseUpEvent;
  }

  getMouseMove(): (e: MouseEvent) => void {
    const onMouseMoveEvent = (e: MouseEvent) => {
      this.props.setCurrent(e.pageX, e.pageY);
      e.stopPropagation();
      e.preventDefault();
    };
    this.onMouseMove = onMouseMoveEvent;
    return onMouseMoveEvent;
  }

  render() {
    return (
      <DragableWrapper onMouseDown={this.getMouseDown()}>
        <span>{this.props.initialX - this.props.currentX} </span>
        <span>{this.props.initialY - this.props.currentY}</span>
      </DragableWrapper>
    );
  }
}

export default Dragable;

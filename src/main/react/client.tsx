import React from 'react';
import ReactDOM from 'react-dom';
import Application from './application';

export function render(id: string): void {
  ReactDOM.render(<Application />, document.getElementById(id));
}

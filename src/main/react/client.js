import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

export function render(id) {
  //console.log(id);
  ReactDOM.render(<App />, document.getElementById(id));
}

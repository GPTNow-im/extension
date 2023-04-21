import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import './../../styles/global.scss';
import Root from './Root';
import SelectText from './selectText';

const rootElement = document.createElement('div');
rootElement.id = 'chatgpt-anywhere-container';
document.body.appendChild(rootElement);

Object.assign(rootElement.style, {
  position: 'fixed',
  left: '0',
  top: '0',
  width: '100vw',
  height: '100vh',
  overflow: 'visible',
  zIndex: '999',
  pointerEvents: 'none',
});

ReactDOM.render(
  <React.StrictMode>
    <Toaster />
    <Root />
    <SelectText />
  </React.StrictMode>,
  rootElement,
);

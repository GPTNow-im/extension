import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import './../../styles/global.scss';
import Root from './Root';

const rootElement = document.createElement('div');
rootElement.id = 'chatgpt-anywhere-container';
document.body.appendChild(rootElement);

Object.assign(rootElement.style, {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '25px',
  height: '25px',
  overflow: 'visible',
  zIndex: '999',
});

ReactDOM.render(
  <React.StrictMode>
    <Toaster />
    <Root />
  </React.StrictMode>,
  rootElement,
);

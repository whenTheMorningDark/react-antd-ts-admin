import React from 'react';
import './styles/index.less';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Router from './router';
import store from './store/index';

const container = document.querySelector('#root');
const root = createRoot(container as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'layouts/index';
import './styles/index.less';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from 'modules/store';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  < Provider store={store} >

    <HashRouter basename='/'>
      <ConfigProvider theme={{
        token: {
          colorPrimary: 'red',
        },
      }}>
        <App />
      </ConfigProvider>

    </HashRouter>

  </Provider >
);

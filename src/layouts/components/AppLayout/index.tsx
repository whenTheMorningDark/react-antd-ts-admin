
import React from 'react';
import { Layout } from 'antd';
import AppRouter from '../AppRouter';
import Menu from '../Menu';
import AppHeader from '../AppHeader';
import AppTab from '../AppTab';

const SideLayout = React.memo(() => (
  <div className='layout-container'>
    <Menu />
    <Layout>
      <AppHeader />
      <AppTab />
      <AppRouter />
    </Layout>
  </div>


));

const FullPageLayout = React.memo(() => (
  <React.Fragment>
    <AppRouter />
  </React.Fragment>
));

export default {
  SideLayout,
  FullPageLayout
};
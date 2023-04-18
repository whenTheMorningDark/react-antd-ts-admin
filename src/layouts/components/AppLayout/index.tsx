
import React from 'react';
import { Layout } from 'antd';
import AppRouter from '../AppRouter';
import Menu from '../Menu';
import AppHeader from '../AppHeader';

const SideLayout = React.memo(() => (
  <div className='layout-sidebar'>
    <Menu />
    <Layout>
      <AppHeader />
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